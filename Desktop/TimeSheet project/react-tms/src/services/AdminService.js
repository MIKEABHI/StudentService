import axios from 'axios';


const HOLIDAY_API_BASE_URL = 'http://localhost:9094/timesheet/timesheet/v1/api/holiday'; //"http://localhost:8080/api/v1/employees";
const token = localStorage.getItem('token');
const authAxios = axios.create({
    baseURL: HOLIDAY_API_BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`,
    },
}
);



class AdminService {

    getHolidayCalendar() {
        return authAxios.get('/getByYear', '2022');
    }

    uploadHolidayCalendar(file) {
        const formData = new FormData();
        formData.append('file', file);
        return authAxios.post('/save', formData);
    }
}

export default new AdminService()