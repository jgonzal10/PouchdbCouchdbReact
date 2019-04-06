import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateFemme from './components/create-femme.component';
import EditFemme from './components/edit-femme.component';
import FemmeList from './components/femme-list.component';


class App extends Component {
  render() {
    return (

        <Router>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to="/" className="navbar-brand">FEMMEIT CRUD DEMO</Link>
              <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/" className="nav-link">Femmes</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/create" className="nav-link">Create Femme</Link>
                  </li>
                </ul>
              </div>
            </nav>
            <br />
            <Route path="/" exact component={FemmeList} />
            <Route path="/edit/:id" component={EditFemme} />
            <Route path="/create" component={CreateFemme} />
          </div>
        </Router>

    );
  }
}

export default App;
