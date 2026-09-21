import { connectDatabase, disconnectDatabase } from "../src/config/db.js";
import { env } from "../src/config/env.js";
import { Admin } from "../src/models/Admin.js";
import { Customer } from "../src/models/Customer.js";
import { Lead } from "../src/models/Lead.js";
import { Product } from "../src/models/Product.js";

const seed = async () => {
  await connectDatabase(env.mongoUri);

  const adminCount = await Admin.countDocuments();

  if (!adminCount) {
    const password = await Admin.hashPassword(env.defaultAdminPassword);

    await Admin.create({
      email: env.defaultAdminEmail,
      password,
      firstName: env.defaultAdminFirstName,
      lastName: env.defaultAdminLastName,
      status: "active",
    });
  }

  const customerCount = await Customer.countDocuments();
  const leadCount = await Lead.countDocuments();
  const productCount = await Product.countDocuments();

  if (!customerCount) {
    await Customer.insertMany([
      {
        company: "Nova Retail",
        firstName: "Lena",
        lastName: "Wang",
        email: "lena@novaretail.com",
        phone: "+86 138 0000 0001",
        country: "China",
        address: "Shanghai Pudong",
        status: "active",
        notes: "Key account",
      },
      {
        company: "Blue Peak Studio",
        firstName: "Chris",
        lastName: "Lee",
        email: "chris@bluepeak.io",
        phone: "+86 138 0000 0002",
        country: "China",
        address: "Shenzhen Nanshan",
        status: "active",
      },
    ]);
  }

  if (!leadCount) {
    await Lead.insertMany([
      {
        customerName: "Nova Retail",
        email: "sales@novaretail.com",
        phone: "+86 138 1000 0001",
        date: new Date(),
        budget: 80000,
        request: "Build a multi-store admin dashboard with reporting.",
        source: "Referral",
        status: "qualified",
      },
      {
        customerName: "Blue Peak Studio",
        email: "hello@bluepeak.io",
        phone: "+86 138 1000 0002",
        date: new Date(),
        budget: 35000,
        request: "Upgrade the internal CRM to a modern stack.",
        source: "Website",
        status: "pending",
      },
    ]);
  }

  if (!productCount) {
    await Product.insertMany([
      {
        productName: "CRM License",
        sku: "CRM-001",
        description: "Annual CRM management license",
        price: 1299,
        status: "available",
      },
      {
        productName: "Analytics Module",
        sku: "ANL-002",
        description: "Advanced analytics and dashboard module",
        price: 899,
        status: "low-stock",
      },
    ]);
  }

  console.log("Seed completed successfully.");
  await disconnectDatabase();
};

seed().catch(async (error) => {
  console.error("Seed failed:", error);
  await disconnectDatabase();
  process.exit(1);
});
