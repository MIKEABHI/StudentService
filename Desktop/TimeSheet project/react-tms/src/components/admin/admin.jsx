import React, { Component } from 'react'
import template from '../../images/HolidayCalendar.xlsx'
import AdminService from '../../services/AdminService';
import { toast } from 'react-toastify';

class Admin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            holidayCalendar: [],
        }
    }


    uploadTemplate(e) {
        const target = e.target;
        if (target.files && target.files.length > 0) {
            console.log(target.files[0].name);
        }
        AdminService.uploadHolidayCalendar(target.files[0]).then((res) => {
            toast.success("Uploaded Succesfully!");
        });

    }

    downloadCalendar() {

    }

    componentDidMount() {
        AdminService.getHolidayCalendar().then((res) => {
            this.setState({ holidayCalendar: res.data });
        });
    }



    render() {
        const { holidayCalendar } = this.state;
        return (
            <div>
                <h2 className="text-center">Red-Shift Holiday Calendar</h2>
                <br></br>
                <div className="row scrollTable">
                    <table className="table table-striped table-bordered">
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
                </div>
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

            </div>
        )
    }
}

export default Admin
