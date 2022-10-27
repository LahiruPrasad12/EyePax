import api from "../../axios";
const baseURL = '/api/v1'

export default {
    getAllStocks: (status) => api.get(`${baseURL}/stock/getall${status ? `?Availability=${status}` : ''}`),
    createStock: (payload) => api.post(`${baseURL}/stock/addstock`, payload),
    updateStock: (id, payload) => api.put(`${baseURL}/stock/update/${id}`, payload),
    deleteStock: (id) => api.delete(`${baseURL}/stock/delete/${id}`),
    getAllRequests: (status) => api.get(`${baseURL}/stock/getallrequest${status ? `?status=${status}` : ''}`),
    makeRequest: (payload) => api.post(`${baseURL}/stock/makeRequest`, payload),
    getAllPurchaseOrders: () => api.get(`${baseURL}/stock/getPurchaseOrders`),
    updatePurchaseOrder: (payload) => api.post(`${baseURL}/stock/updatePurchaseOrder`, payload),
    deletePurchaseOrder: (payload) => api.post(`${baseURL}/stock/deletePurchaseOrder`, payload)
}