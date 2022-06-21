import React, { Component } from 'react'
import './sidebar.css';
import { Link } from "react-router-dom";
import Login from '../login/login';
import { Route, Switch } from 'react-router-dom';
import Timesheet from '../timesheets/timesheets';
import Admin from '../admin/admin';
import Dashboard from '../dashboard/dashboard';
import Project from '../projects/project';
import Task from '../tasks/tasks';
import Client from '../clients/client';
import logo from '../../images/logo.png'
import EmployeeList from '../employee/employeeList';
import EmployeeView from '../employee/employeeView';
import EmployeeCreateUpdate from '../employee/employeeCreateUpdate';

class Sidebar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            togglemode: "false",
        };
        this.handletoggle = this.handletoggle.bind(this);
    }

    handletoggle(e) {
        console.log(this.state.togglemode)
        this.setState({ togglemode: !this.state.togglemode });
    }


    render() {
        return (
            <div className="wrapper divColor">
                <nav id="sidebar" className={`${this.state.togglemode ? "active" : ""}`}>
                    <div className="sidebar-header">
                        <h3>Timesheet App <i className="fas fa-home "></i></h3>
                        <strong>TMS  <i className="fas fa-home "></i></strong>
                    </div>

                    <ul className="list-unstyled components">
                        <li className="active">
                            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                                Projects
                            </a>
                            <ul className="collapse list-unstyled" id="homeSubmenu">
                                <li>
                                    <Link to="/project"><i className="fa fa-folder-open fa-sm" aria-hidden="true"></i> Projects</Link>
                                </li>
                                <li>
                                    <Link to="/task"><i className="fa fa-list-ul fa-sm" aria-hidden="true"></i> Tasks</Link>
                                </li>
                                <li>
                                    <Link to="/dashboard">Invoice</Link>
                                </li>
                                <li>
                                    <Link to="/dashboard">SoW</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/employees">
                                <i className="fa fa-users " aria-hidden="true"></i> Employee
                            </Link>
                        </li>
                        <li>
                            <Link to="/timesheet">
                                <i className="fas fa-paper-plane "></i> Timesheets
                            </Link>
                        </li>
                        <li>
                            <Link to="/client">
                                <i className="fa fa-handshake" aria-hidden="true"></i> Clients
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin">
                                <i className="fa fa-th-large" aria-hidden="true"></i> Admin
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard">
                                <i className="fa fa-desktop" aria-hidden="true"></i> Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard">
                                <i className="fas fa-paper-plane"></i> Rate cards
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard">
                                <i className="fa fa-cogs" aria-hidden="true"></i> Preferences
                            </Link>
                        </li>
                        <ul className="list-unstyled components">
                            <li>
                                <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                                    <i className="fa fa-wrench fa-lg" aria-hidden="true"></i> Setting
                                </a>
                                <ul className="collapse list-unstyled" id="pageSubmenu">
                                    <li>
                                        <Link to="/login">Logout</Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard">Change password</Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard">Themes</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </ul>

                    <ul className="list-unstyled CTAs">
                        <li>
                            <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                                <i className="fa fa-wrench fa-lg" aria-hidden="true"></i> Setting
                            </a>
                            <ul className="collapse list-unstyled" id="pageSubmenu">
                                <li>
                                    <Link to="/login">Logout</Link>
                                </li>
                                <li>
                                    <Link to="/dashboard">Change password</Link>
                                </li>
                                <li>
                                    <Link to="/dashboard">Themes</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>


                <div id="content">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">

                            <button type="button" id="sidebarCollapse" className="btn btn-info" onClick={this.handletoggle}>
                                <i className={`${this.state.togglemode ? "fa fa-chevron-circle-left" : "fa fa-chevron-circle-right"}`} aria-hidden="true"></i>
                                <span></span>
                            </button>
                            <img src={logo} alt="logo" style={{ width: "100px", padding: "10px" }} />
                            <div><h4 className="header-text">Professional Services Portal</h4></div>

                            <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <i className="fas fa-align-justify"></i>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">

                                <ul className="nav navbar-nav ml-auto list-unstyled CTAs">
                                    <li>
                                        <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="">
                                            <i className="fa fa-wrench fa-lg" aria-hidden="true"></i> Setting
                                        </a>
                                        <ul className="collapse list-unstyled" id="pageSubmenu">
                                            <li>
                                                <Link to="/login">Logout</Link>
                                            </li>
                                            <li>
                                                <Link to="/dashboard">Change password</Link>
                                            </li>
                                            <li>
                                                <Link to="/dashboard">Themes</Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div className="container">

                        <Switch>
                            <Route path="/" exact component={Login}></Route>
                            <Route path="/employees" component={EmployeeList}></Route>
                            <Route path="/add-employee/:id" component={EmployeeCreateUpdate}></Route>
                            <Route path="/view-employee/:id" component={EmployeeView}></Route>
                            {/* <Route path = "/update-employee/:id" component = {UpdateEmployeeComponent}></Route> */}
                            {/* <Route exact path="/about" component = {About}></Route> 
                          <Route exact path="/test" component = {Test}></Route>  */}
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/timesheet" component={Timesheet} />
                            <Route exact path="/admin" component={Admin} />
                            <Route exact path="/dashboard" component={Dashboard} />
                            <Route exact path="/project" component={Project} />
                            <Route exact path="/task" component={Task} />
                            <Route exact path="/client" component={Client} />
                        </Switch>
                    </div>

                </div>
            </div>

        )
    }
}

export default Sidebar
