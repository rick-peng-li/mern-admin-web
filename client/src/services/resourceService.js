import { http } from "@/lib/http";

const buildListParams = ({ page, limit, search }) => ({
  page,
  limit,
  search: search || undefined,
});

export const createResourceService = (resource) => ({
  async list(params) {
    const response = await http.get(`/${resource}`, {
      params: buildListParams(params),
    });

    return response.data;
  },
  async detail(id) {
    const response = await http.get(`/${resource}/${id}`);
    return response.data.data;
  },
  async create(payload) {
    const response = await http.post(`/${resource}`, payload);
    return response.data.data;
  },
  async update({ id, payload }) {
    const response = await http.patch(`/${resource}/${id}`, payload);
    return response.data.data;
  },
  async remove(id) {
    const response = await http.delete(`/${resource}/${id}`);
    return response.data;
  },
});

export const adminService = {
  ...createResourceService("admins"),
  async updatePassword({ id, password }) {
    const response = await http.patch(`/admins/${id}/password`, { password });
    return response.data.data;
  },
};

export const customerService = createResourceService("customers");
export const leadService = createResourceService("leads");
export const productService = createResourceService("products");
