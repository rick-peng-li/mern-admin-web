import { Admin } from "../models/Admin.js";
import { Customer } from "../models/Customer.js";
import { Lead } from "../models/Lead.js";
import { Product } from "../models/Product.js";

export const getDashboardSummary = async () => {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [
    totalAdmins,
    totalCustomers,
    totalLeads,
    totalProducts,
    activeCustomers,
    activeAdmins,
    recentCustomers,
    recentLeads,
    availableProducts,
    latestLeads,
    latestProducts,
    budgetResult,
  ] = await Promise.all([
    Admin.countDocuments(),
    Customer.countDocuments(),
    Lead.countDocuments(),
    Product.countDocuments(),
    Customer.countDocuments({ status: "active" }),
    Admin.countDocuments({ status: "active" }),
    Customer.countDocuments({ createdAt: { $gte: startOfMonth } }),
    Lead.countDocuments({ createdAt: { $gte: startOfMonth } }),
    Product.countDocuments({ status: "available" }),
    Lead.find().sort({ createdAt: -1 }).limit(5),
    Product.find().sort({ createdAt: -1 }).limit(5),
    Lead.aggregate([
      {
        $group: {
          _id: null,
          totalBudget: { $sum: "$budget" },
        },
      },
    ]),
  ]);

  const pendingLeads = await Lead.countDocuments({ status: "pending" });
  const convertedLeads = await Lead.countDocuments({ status: "won" });

  return {
    overview: {
      totalAdmins,
      totalCustomers,
      totalLeads,
      totalProducts,
      activeCustomers,
      activeAdmins,
      recentCustomers,
      recentLeads,
      totalBudget: budgetResult[0]?.totalBudget || 0,
    },
    health: {
      pendingLeads,
      convertedLeads,
      leadConversionRate: totalLeads
        ? Math.round((convertedLeads / totalLeads) * 100)
        : 0,
      availableProducts,
      availableRate: totalProducts
        ? Math.round((availableProducts / totalProducts) * 100)
        : 0,
    },
    latestLeads,
    latestProducts,
  };
};
