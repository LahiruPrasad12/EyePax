import api from "../../axios";
const baseURL = '/api/v1'

export default {
    getAllStaff: (role) => api.get(`${baseURL}/admin/staff${role?`?account_type=${role}`:''}`)
}
