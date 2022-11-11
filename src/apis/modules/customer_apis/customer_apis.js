import api from "../../axios";
const baseURL = '/api/v1'

export default {
    getAllOrders: (status) => api.get(`${baseURL}/order/getOrder${status ? `?status=${status}` : ''}`),
    getCanceledOrders: () => api.get(`${baseURL}/order/getCanceledOrders`),
    createOrder: (payload) => api.post(`${baseURL}/order/addOrder`, payload),
    updateOrder: (payload) => api.post(`${baseURL}/order/updateOrder`, payload),
    deleteOrder: (id) => api.delete(`${baseURL}/order/deleteOrder/${id}`)
}
