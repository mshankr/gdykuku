import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route ,} from 'react-router-dom';
import Header from './Header'
import Landing from './Landing'
import Dashboard from './Dashboard'
import SurveyNew from './surveys/SurveyNew'
import { connect } from 'react-redux'
import * as actions from '../actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
    );
  }
}

        // 1st argument: mapStateToProps object (not used here)
export default connect(null, actions)(App);
          // actions will be assigned to App as props
