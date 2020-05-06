import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import './SurveyList.css'

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  render() {
    // reverse so that latest survey is at top
    return (
      <div>
        {this.props.surveys.reverse().map(({ _id, title, subject, body, yes, no, dateSent }) =>
          <div className="card darken-1 waves-effect" key={_id}>
            <div className='card-content'>
            <span className='card-title'>{title}</span>
            <p>{subject}</p>
            <p>{body}</p>
            <p className='right'>Sent on: {new Date(dateSent).toLocaleDateString()}</p>
            <div className='card-action'>
              <a>Yes: {yes}</a>
              <a>No: {no}</a>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ surveys }){
  return { surveys }
}

export default connect(mapStateToProps, actions)(SurveyList)
