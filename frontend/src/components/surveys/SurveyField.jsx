// SurveyField contains logic to render
// a single label n text input

import React from 'react'

export default ({ input, label, meta: { error, touched } }) => {
  // same as saying
  // onBlur = {input.onBlur},
  // onChange = {input.onChange}
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }} />
      <div className='red-text' style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  )
}
