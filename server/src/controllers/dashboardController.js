import { getDashboardSummary } from "../services/dashboardService.js";

export const getSummary = async (_req, res) => {
  const summary = await getDashboardSummary();

  return res.json({
    success: true,
    data: summary,
  });
};
