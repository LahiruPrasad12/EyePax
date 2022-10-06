import api from "../../axios";
const baseURL = '/api/v1'

export default {
    getAllShippingItems: (status) => api.get(`${baseURL}/shipping-item${status?`?status=${status}`:''}`),
    UpdateShippingItems: (id,payload) => api.put(`${baseURL}/shipping-item/${id}`,payload),
    getItem: (id) => api.get(`${baseURL}/shipping-item/${id}`),
    getStock: () => api.get(`${baseURL}/stock/getall`),
}
