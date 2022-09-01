import api from "../../axios";
const baseURL = '/api/v1'

export default {
    getAllStaff: (role) => api.get(`${baseURL}/admin/staff${role?`?account_type=${role}`:''}`),
    saveStaff: (payload) => api.post(`${baseURL}/admin/staff`,payload),
    updateStaff: (payload) => api.put(`${baseURL}/admin/staff/${payload._id}`,payload),
    deleteStaff: (id) => api.delete(`${baseURL}/admin/staff/${id}`)
}
