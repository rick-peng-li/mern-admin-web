const mongoose = require("mongoose");

const Admin = mongoose.model("Admin");
const Client = mongoose.model("Client");
const Lead = mongoose.model("Lead");
const Product = mongoose.model("Product");

exports.summary = async (req, res) => {
  try {
    const [
      totalAdmins,
      totalCustomers,
      totalLeads,
      totalProducts,
      availableProducts,
      pendingLeads,
      wonLeads,
      recentCustomers,
    ] = await Promise.all([
      Admin.countDocuments({ removed: false }),
      Client.countDocuments({ enabled: true }),
      Lead.countDocuments(),
      Product.countDocuments({ enabled: true }),
      Product.countDocuments({ status: "available" }),
      Lead.countDocuments({ status: "pending" }),
      Lead.countDocuments({ status: { $ne: "pending" } }),
      Client.countDocuments({
        created: { $gte: new Date(new Date().setDate(1)) },
      }),
    ]);

    const [budgetAggregation, latestLeads, latestProducts] = await Promise.all([
      Lead.aggregate([
        {
          $group: {
            _id: null,
            totalBudget: { $sum: { $ifNull: ["$budget", 0] } },
          },
        },
      ]),
      Lead.find().sort({ created: -1 }).limit(5),
      Product.find().sort({ _id: -1 }).limit(5),
    ]);

    const totalBudget = budgetAggregation[0]?.totalBudget || 0;
    const leadConversionRate = totalLeads
      ? Math.round((wonLeads / totalLeads) * 100)
      : 0;
    const availableRate = totalProducts
      ? Math.round((availableProducts / totalProducts) * 100)
      : 0;

    return res.status(200).json({
      success: true,
      result: {
        overview: {
          totalLeads,
          totalCustomers,
          totalProducts,
          totalAdmins,
          totalBudget,
          recentCustomers,
        },
        health: {
          pendingLeads,
          wonLeads,
          leadConversionRate,
          availableProducts,
          availableRate,
        },
        latestLeads,
        latestProducts,
      },
      message: "Dashboard summary fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: "Failed to fetch dashboard summary",
    });
  }
};
