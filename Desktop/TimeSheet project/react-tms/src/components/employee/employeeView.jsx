import React, { Component } from 'react'
import EmployeeService from '../../services/EmployeeService'

class EmployeeView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then( res => {
            this.setState({employee: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3 ">
                    <h3 className = "text-center">Employee Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label>First Name: </label>
                            <label class="value-style ml-md-3">{ this.state.employee.firstName }</label>
                        </div>
                        <div className = "row">
                            <label>Last Name: </label>
                            <label class="value-style ml-md-3">{ this.state.employee.lastName }</label>
                        </div>
                        <div className = "row">
                            <label>Email ID: </label>
                            <label class="value-style ml-md-3">{ this.state.employee.emailId }</label>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default EmployeeView
