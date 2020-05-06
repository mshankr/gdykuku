// SurveyFormReview shows users their inputs for review
import React from 'react';
import { connect } from 'react-redux'
import formFields from './formFields'
import _ from 'lodash'
import * as actions from '../../actions'
import { withRouter } from 'react-router-dom'

    // formValues is pulled out from Redux app state der
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

  const reviewFields = _.map(formFields, ({ label, name }) => (
  <div key={name} style={{ marginBottom: "20px" }}>
    <label>{label}</label>
    <div>{formValues[name]}</div>
  </div>
  ));

  return (
    <div>
      <h5>Please confirm your entries</h5>
        {reviewFields}
      <button
        className='btn-flat yellow darken-3 white-text'
        onClick={onCancel}
        >
        Back
      </button>
    <button
      className='btn-flat green right white-text'
      onClick={() => submitSurvey(formValues, history)}
      >
      Send Survey
      <i className="material-icons right">email</i>
    </button>
    </div>
  )
}

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
// now surveyformreview knows the history object!!
