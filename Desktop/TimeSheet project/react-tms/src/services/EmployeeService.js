import axios from 'axios';

const EMPLOYEE_API_BASE_URL = 'http://localhost:9094/employee/employee/v1/api/employee/get'; //"http://localhost:8080/api/v1/employees";
const token = localStorage.getItem('token');
const authAxios = axios.create({
    baseURL: EMPLOYEE_API_BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`,
    },
}
);


class EmployeeService {

    getEmployees() {
        return authAxios.get('');
    }

    createEmployee(employee) {
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    getEmployeeById(employeeId) {
        console.log("employeeId " + employeeId);
        return authAxios.get('/' + employeeId);
    }

    updateEmployee(employee, employeeId) {
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId) {
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }
}

export default new EmployeeService()