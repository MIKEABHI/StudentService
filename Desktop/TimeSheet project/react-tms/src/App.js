import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/sidebar/sidebar';
import FooterComponent from './components/FooterComponent';


function App() {
  return (
    <Router>
      <Sidebar />
      <Switch>

        {/* <Route exact path="/login" component={Login} /> */}

      </Switch>
      <ToastContainer position="bottom-right" autoClose={5000} pauseOnFocusLoss draggable pauseOnHover />
      <FooterComponent />
    </Router >
  );
}

export default App;
