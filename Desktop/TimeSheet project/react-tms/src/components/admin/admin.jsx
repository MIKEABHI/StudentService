import React, { Component } from 'react'
import template from '../../images/HolidayCalendar.xlsx'
import AdminService from '../../services/AdminService';
import { toast } from 'react-toastify';
import TableScrollbar from 'react-table-scrollbar';

class Admin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            holidayCalendar: [],
            calendarYears: [],
            selectedYear: '',
        };
        this.getHolidayCalendar = this.getHolidayCalendar.bind(this);
        this.uploadTemplate = this.uploadTemplate.bind(this);
        this.downloadCalendar = this.downloadCalendar.bind(this);
    }


    uploadTemplate(e) {
        const target = e.target;
        if (target.files && target.files.length > 0) {
        }
        AdminService.uploadHolidayCalendar(target.files[0]).then((res) => {
            toast.success("Uploaded Succesfully!");
        });

    }

    downloadCalendar() {
        AdminService.downloadCalendar(this.state.selectedYear).then((res) => {
            const blob = new Blob([res], { type: 'application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const nav = (window.navigator);
            if (window.navigator && nav.msSaveOrOpenBlob) {
                nav.msSaveOrOpenBlob(blob);
                return;
            }
            const data = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = data;
            link.download = 'HolidayData.xlsx';
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

            setTimeout(function () {
                window.URL.revokeObjectURL(data);
                link.remove();
            }, 1000);
        });

    }

    getHolidayCalendar(year) {
        AdminService.getHolidayCalendar(year).then((res) => {
            this.setState({ holidayCalendar: res.data, selectedYear: year });
        });
    }

    componentDidMount() {

        AdminService.getCalendarYears().then((res) => {
            this.setState({ calendarYears: res.data });
        });

        this.getHolidayCalendar(new Date().getFullYear());

    }



    render() {
        const { holidayCalendar, calendarYears } = this.state;
        return (
            <div>
                <br></br>
                <div className="row">
                    <h2 className="text-center">Red-Shift Holiday Calendar</h2>
                    <label htmlFor="year">Year: </label>
                    <select className="form-control input-length dropdown" name="cName" style={{ width: "10%" }} onChange={(e) => this.getHolidayCalendar(e.target.value)}>
                        {calendarYears.map((year) => (
                            <option key={year.c_id} value={year.calendarName}>{year.calendarName}</option>
                        ))};
                    </select>
                    <TableScrollbar rows={5}>
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Date (DD-MM-YYY)</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    holidayCalendar.map(
                                        (holiday) => {
                                            return (
                                                <tr key={holiday.id}>
                                                    <td> {holiday.id} </td>
                                                    <td> {holiday.date | 'dd-MM-yyyy'} </td>
                                                    <td> {holiday.description} </td>
                                                </tr>
                                            )
                                        }
                                    )
                                }
                            </tbody>
                        </table>
                    </TableScrollbar>
                </div >
                <br />
                <div className="row">
                    <a href={template} className="column ml-md-2 btn btn-primary btn-sm"
                        download="HolidayCalendar.xlsx">Download Template</a>
                    <button style={{ marginLeft: "10px" }} className="btn btn-info btn-sm" data-toggle="modal" href="#holidayCalendar" aria-expanded="false"
                        aria-controls="holidayCalendar" >Upload Holiday Calendar</button>
                    <button style={{ marginLeft: "10px" }} onClick={() => this.downloadCalendar()} className="btn btn-info btn-sm">Download Holiday Calendar</button>
                </div>
                <div className="modal fade my-2" id="holidayCalendar" role="dialog">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header" id="modalHeader">
                                <h4 className="modal-title">Upload Holiday Calendar</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="file"> Select Holidays .XLS File</label>
                                    <input type="file" id="file" style={{ paddingTop: "5px" }} onChange={(e) => this.uploadTemplate(e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        )
    }
}

export default Admin
