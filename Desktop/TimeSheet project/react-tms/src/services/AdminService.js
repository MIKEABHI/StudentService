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

    getHolidayCalendar(year) {
        console.log("service year", year)
        return authAxios.get('/getByYear', { params: { calendaryr: year } });
    }

    uploadHolidayCalendar(file) {
        const formData = new FormData();
        formData.append('file', file);
        return authAxios.post('/save', formData);
    }

    getCalendarYears() {
        return authAxios.get('/getAllYears');
    }

    downloadCalendar(year) {
        return authAxios.get('/createExcel', { responseType: 'blob', params: { calendaryr: year } });
    }
}

export default new AdminService()