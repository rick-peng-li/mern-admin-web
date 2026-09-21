import { http } from "@/lib/http";

export const dashboardService = {
  async getSummary() {
    const response = await http.get("/dashboard/summary");
    return response.data.data;
  },
};
