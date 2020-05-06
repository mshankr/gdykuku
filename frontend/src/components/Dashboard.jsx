import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import SurveyList from './surveys/SurveyList'
// const SurveysList = () => <div>SurveysList</div>

class Dashboard extends Component {
  render() {

      return (
        <div>
        <div>
          <SurveyList />
      </div>
          <div className="fixed-action-btn">
          <Link className="btn-floating btn-large waves-effect waves-light red lighten-2"
            to='/surveys/new'>
            <i className='material-icons'>add</i>
          </Link>
          </div>
        </div>
      )
  }

}

function mapStateToProps({ surveys }) {
  return { surveys }
}

export default Dashboard
