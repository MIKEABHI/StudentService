import React, { Component } from 'react';
import EmployeeService from '../../services/EmployeeService';
import './employee.css';

class EmployeeList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: [],
            togglemode: "false",
        }
        this.employeeAdd = this.employeeAdd.bind(this);
        this.employeeEdit = this.employeeEdit.bind(this);
        this.employeeDelete = this.employeeDelete.bind(this);

        this.handletoggle = this.handletoggle.bind(this);
    }

    handletoggle(e) {
        console.log(this.state.togglemode)
        this.setState({ togglemode: !this.state.togglemode });
    }

    employeeDelete(id) {
        EmployeeService.deleteEmployee(id).then(res => {
            this.setState({ employees: this.state.employees.filter(employee => employee.id !== id) });
        });
    }
    employeeView(id) {
        this.props.history.push(`/view-employee/${id}`);
    }
    employeeEdit(id) {
        this.props.history.push(`/add-employee/${id}`);
    }
    employeeAdd() {
        this.props.history.push('/add-employee/_add');
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Employees</h2>
                <div className="row">
                    <button className="btn btn-primary" style={{ width: "auto" }} onClick={this.employeeAdd}>Create Employee</button>
                </div>
                <br></br>
                <div className="row scrollTable">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th> Id</th>
                                <th> First Name</th>
                                <th> Last Name</th>
                                <th> Email Id</th>
                                <th> <i className="fa fa-wrench fa-lg" aria-hidden="true"></i> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                        <tr key={employee.id}>
                                            <td> {employee.id} </td>
                                            <td> {employee.firstName} </td>
                                            <td> {employee.lastName}</td>
                                            <td> {employee.emailId}</td>
                                            <td id="tableCellSidebar" className={`${this.state.togglemode ? "active" : ""}`}>
                                                <div className="tableCellSidebar-header">
                                                <button type="button" id="sidebarCollapse" className="btn btn-info" onClick={this.handletoggle}>
                                                    <i id="sidebarCollapse" className={`${this.state.togglemode ? "fa fa-chevron-circle-left" : "fa fa-chevron-circle-right"}`} onClick={this.handletoggle} aria-hidden="true"></i>
                                                    <span></span>
                                                </button>
                                                <button style={{ marginLeft: "5px" }} onClick={() => this.employeeEdit(employee.id)} className="btn btn-info btn-sm view">Edit</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.employeeDelete(employee.id)} className="btn btn-danger btn-sm view">Delete</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.employeeView(employee.id)} className="btn btn-info btn-sm view">View</button>
                                                </div>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}

export default EmployeeList
