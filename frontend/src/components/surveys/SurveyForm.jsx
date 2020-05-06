// SurveyForm shows a form for user to add input
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'
import SurveyField from './SurveyField'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import validateEmails from '../../utils/validateEmails'
import formFields from './formFields'

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => (
            <Field
              key = {name}
              type = 'text'
              name = {name}
              component = {SurveyField}
              label = {label} />
          ))
  }

  render() {
    // handleSubmit is prop injected by redux-form!
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className='btn-flat red white-text'>
            Cancel
          </Link>
        <button className='btn-flat teal white-text right' type='submit'>
          Next
          <i className="material-icons right">done</i>
        </button>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}

  errors.recipients = validateEmails(values.recipients || "")

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = "You must provide a value"
    }
  })


  return errors
}

        // takes 1 arg: customization options
export default reduxForm({
  validate, // short for validate: validate
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm)
