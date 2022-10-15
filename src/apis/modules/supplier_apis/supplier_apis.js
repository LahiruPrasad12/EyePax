import api from "../../axios";
const baseURL = '/api/v1'

export default {
  // getAllItems: () => api.get(`${baseURL}/supplier/getall`),
  getAllItems: (status) => api.get(`${baseURL}/supplier/getall${status?`?enabled=${status}`:''}`),
  getAll: () => api.get(`${baseURL}/supplier/getallitems`),
  createItem: (payload) => api.post(`${baseURL}/supplier/additem`, payload),
  updateItem: (id, payload) => api.put(`${baseURL}/supplier/update/${id}`, payload),
  deleteItem: (id) => api.delete(`${baseURL}/supplier/delete/${id}`),
  getAllRequests: (status) => api.get(`${baseURL}/request/getallrequest${status?`?status=${status}`:''}`),
  updateRequest: (id, payload) => api.put(`${baseURL}/request/updatereq/${id}`, payload),
  getRequest: (id,payload) => api.get(`${baseURL}/request/updatereq/${id}`,payload)

}