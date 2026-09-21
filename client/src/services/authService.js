import { http } from "@/lib/http";

export const authService = {
  async login(payload) {
    const response = await http.post("/auth/login", payload);
    return response.data.data;
  },
  async getCurrentUser() {
    const response = await http.get("/auth/me");
    return response.data.data;
  },
  async logout() {
    const response = await http.post("/auth/logout");
    return response.data;
  },
};
