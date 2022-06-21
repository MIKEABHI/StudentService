import React, { Component } from 'react'
import EmployeeService from '../../services/EmployeeService';
import {EmployeeAddEdit} from '../../models/employee';
import {toast } from 'react-toastify';

class EmployeeCreateUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employee: new EmployeeAddEdit(),
            loading: false,
            // step 2
            id: this.props.match.params.id,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }
    handleChange(e) {
        var {name, value} = e.target;
        var employee = this.state.employee;
        employee[name] = value;
        this.setState({employee: employee});
      }
      handleCreate(e) {
        e.preventDefault();
        const {employee} = this.state;
    
        if(!(employee.firstName && employee.lastName)){
          return;
        }
    
        this.setState({loading: true});
        
        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/employees');
                toast.success("Employee Created!");
                console.log("Employee Created successfully ",employee);
            });
        }else{
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.history.push('/employees');
                toast.success("Employee Updated!");
                console.log("Employee Created successfully ",employee);
            });
        }
      }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
               // let employee = res.data;
                this.setState({employee: res.data});
            });
        }        
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};
        console.log('employee => ' + JSON.stringify(employee));

        // step 5
        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/employees');
            });
        }else{
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.history.push('/employees');
            });
        }
    }
    
    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    cancel(){
        this.props.history.push('/employees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Create Employee</h3>
        }else{
            return <h3 className="text-center">Edit Employee</h3>
        }
    }
    render() {
        const {employee, loading} = this.state;
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form name="form" onSubmit={(e) => this.handleCreate(e)}>
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={employee.firstName} onChange={(e)=>this.handleChange(e)}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" 
                                                value={employee.lastName} onChange={(e)=>this.handleChange(e)}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={employee.emailId} onChange={(e)=>this.handleChange(e)}/>
                                        </div>

                                        <button className="btn btn-success" disabled={loading}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default EmployeeCreateUpdate
