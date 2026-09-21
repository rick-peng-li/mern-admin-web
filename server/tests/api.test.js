import assert from "node:assert/strict";
import test, { after, before } from "node:test";

import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;
let request;
let connectDatabase;
let disconnectDatabase;
let createApp;
let Admin;

before(async () => {
  const externalMongoUri = process.env.TEST_MONGO_URI;

  if (externalMongoUri) {
    process.env.MONGO_URI = externalMongoUri;
  } else {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGO_URI = mongoServer.getUri();
  }

  process.env.NODE_ENV = "test";
  process.env.JWT_SECRET = "test-secret";
  process.env.CLIENT_URL = "http://localhost:5173";

  ({ connectDatabase, disconnectDatabase } = await import("../src/config/db.js"));
  ({ createApp } = await import("../src/app.js"));
  ({ Admin } = await import("../src/models/Admin.js"));

  await connectDatabase(process.env.MONGO_URI);
  request = supertest(createApp());
});

after(async () => {
  if (disconnectDatabase) {
    await disconnectDatabase();
  }

  if (mongoServer) {
    await mongoServer.stop();
  }
});

test("认证与完整业务流可用", async () => {
  const password = await Admin.hashPassword("Admin123456!");

  await Admin.create({
    email: "admin@demo.com",
    password,
    firstName: "System",
    lastName: "Admin",
    status: "active",
  });

  const loginResponse = await request.post("/api/auth/login").send({
    email: "admin@demo.com",
    password: "Admin123456!",
  });

  assert.equal(loginResponse.statusCode, 200);
  assert.equal(loginResponse.body.success, true);

  const token = loginResponse.body.data.token;

  const meResponse = await request
    .get("/api/auth/me")
    .set("Authorization", `Bearer ${token}`);

  assert.equal(meResponse.statusCode, 200);
  assert.equal(meResponse.body.data.email, "admin@demo.com");

  const customerResponse = await request
    .post("/api/customers")
    .set("Authorization", `Bearer ${token}`)
    .send({
      company: "Acme Corp",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@acme.com",
      phone: "13800000000",
      country: "China",
      address: "Shanghai",
      notes: "VIP",
      status: "active",
    });

  assert.equal(customerResponse.statusCode, 201);

  const leadResponse = await request
    .post("/api/leads")
    .set("Authorization", `Bearer ${token}`)
    .send({
      customerName: "Acme Corp",
      email: "biz@acme.com",
      phone: "13800000001",
      date: new Date().toISOString(),
      budget: 50000,
      request: "Need a new admin dashboard",
      source: "Referral",
      status: "pending",
    });

  assert.equal(leadResponse.statusCode, 201);

  const productResponse = await request
    .post("/api/products")
    .set("Authorization", `Bearer ${token}`)
    .send({
      productName: "ERP Seat",
      sku: "ERP-001",
      description: "Enterprise admin seat",
      price: 1999,
      status: "available",
    });

  assert.equal(productResponse.statusCode, 201);

  const adminResponse = await request
    .post("/api/admins")
    .set("Authorization", `Bearer ${token}`)
    .send({
      email: "ops@demo.com",
      password: "Admin123456!",
      firstName: "Ops",
      lastName: "Manager",
      status: "active",
    });

  assert.equal(adminResponse.statusCode, 201);

  const dashboardResponse = await request
    .get("/api/dashboard/summary")
    .set("Authorization", `Bearer ${token}`);

  assert.equal(dashboardResponse.statusCode, 200);
  assert.equal(dashboardResponse.body.data.overview.totalCustomers, 1);
  assert.equal(dashboardResponse.body.data.overview.totalProducts, 1);

  const listResponse = await request
    .get("/api/customers?search=Acme")
    .set("Authorization", `Bearer ${token}`);

  assert.equal(listResponse.statusCode, 200);
  assert.equal(listResponse.body.data.length, 1);

  const customerId = customerResponse.body.data._id;

  const updateResponse = await request
    .patch(`/api/customers/${customerId}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      notes: "VIP upgraded",
    });

  assert.equal(updateResponse.statusCode, 200);
  assert.equal(updateResponse.body.data.notes, "VIP upgraded");

  const productId = productResponse.body.data._id;
  const deleteProductResponse = await request
    .delete(`/api/products/${productId}`)
    .set("Authorization", `Bearer ${token}`);

  assert.equal(deleteProductResponse.statusCode, 200);

  const passwordUpdateResponse = await request
    .patch(`/api/admins/${adminResponse.body.data.id}/password`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      password: "NewAdmin123!",
    });

  assert.equal(passwordUpdateResponse.statusCode, 200);

  const logoutResponse = await request
    .post("/api/auth/logout")
    .set("Authorization", `Bearer ${token}`);

  assert.equal(logoutResponse.statusCode, 200);
});
