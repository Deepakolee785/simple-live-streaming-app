import React from 'react'
import { Field, reduxForm } from 'redux-form'


const StreamForm = (props) => {

	const renderError = ({ error, touched }) => {
		if (touched && error) {
	 		return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			)
		}
	}

	const renderInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`
		return (
			< div className={className} >
				<label>{label}</label>
				<input {...input} />
				{renderError(meta)}
			</div >
		)
	}


	const onSubmit = (fromValues) => {
		props.onSubmit(fromValues)
	}



	return (
		<div>
			<form className="ui form error" onSubmit={props.handleSubmit(onSubmit)}>
				<Field name='title' label="Enter Title" component={renderInput} />
				<Field name='description' label="Enter description" component={renderInput} />
				<button className="ui button primary">Submit</button>
			</form>
		</div>
	)
}

const validate = (fromValues) => {
	const errors = {}

	if (!fromValues.title) {
		errors.title = 'You must enter a title'
	}
	if (!fromValues.description) {
		errors.description = 'You must enter a description'
	}

	return errors
}


export default reduxForm({
	form: 'streamForm',
	validate
})(StreamForm)
