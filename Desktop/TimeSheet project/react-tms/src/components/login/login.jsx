import React, { Component } from 'react'
import './login.css';
import { UserLogin } from '../../models/login';
import loginservice from '../../services/loginservice';
import logo from '../../images/logo.png'
import { toast } from 'react-toastify';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: new UserLogin('', ''),
      submitted: false,
      loading: false,
      errorMessage: ''
    };
  }

  handleChange(e) {
    var { name, value } = e.target;
    var user = this.state.user;
    user[name] = value;
    this.setState({ user: user });
  }

  handleLogin(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { user } = this.state;

    if (!(user.username_email && user.password)) {
      return;
    }

    this.setState({ loading: true });
    loginservice.login(user).then(data => {
      this.props.history.push("/dashboard");
      toast.success("logged in!");
      console.log("Logged in successfully ", user);
    }, error => {
      this.setState({
        errorMessage: "username_email or password is not valid",
        loading: false
      });
    });
  }
  render() {
    const { user, submitted, loading, errorMessage } = this.state;
    return (
      <div className="col-md-12" id="content">
        <div className="card card-container">
          <img src={logo} alt="logo" style={{ width: "100px" }} />
          {errorMessage &&
            <div className="alert alert-danger" role="alert">
              <strong>Error! </strong> {errorMessage}
            </div>
          }
          <form name="form" onSubmit={(e) => this.handleLogin(e)}>
            <div className={'form-group' + (submitted && !user.username_email ? 'has-error' : '')}>
              <label htmlFor="username_email">username</label>
              <input type="text" className="form-control" name="username_email" value={user.username_email} onChange={(e) => this.handleChange(e)} />
              {submitted && !user.username_email &&
                <div className="help-block">username is required</div>
              }
            </div>
            <div className={'form-group' + (submitted && !user.password ? 'has-error' : '')}>
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" name="password" value={user.password} onChange={(e) => this.handleChange(e)} />
              {submitted && !user.password &&
                <div className="help-block">Password is required</div>
              }
            </div>
            <div className="form-group">
              <button className="btn btn-lg btn-primary btn-block btn-signin form-submit-button" disabled={loading}>Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

}
export default Login