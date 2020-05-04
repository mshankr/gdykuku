import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route ,} from 'react-router-dom';
import Header from './Header'
import Landing from './Landing'
import { connect } from 'react-redux'
import * as actions from '../actions';

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

        // 1st argument: mapStateToProps object (not used here)
export default connect(null, actions)(App);
          // actions will be assigned to App as props
