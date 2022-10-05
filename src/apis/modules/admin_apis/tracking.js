import api from "../../axios";
const baseURL = '/api/v1'

export default {
    getAllShippingItems: (status) => api.get(`${baseURL}/shipping-item${status?`?status=${status}`:''}`),
    UpdateShippingItems: (id,payload) => api.put(`${baseURL}/shipping-item/${id}`,payload),
    getItem: (id,payload) => api.get(`${baseURL}/shipping-item/${id}`,payload),
    getStock: () => api.get(`${baseURL}/stock/getall`),
}
