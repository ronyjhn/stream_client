import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
class StreamForm extends Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}

	renderInpt = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off" />
				<div>{this.renderError(meta)}</div>
			</div>
		);
	};

	onSubmit = (formValues) => {
		this.props.onSubmit(formValues);
	};

	render() {
		return (
			<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
				<Field name="title" component={this.renderInpt} label="Enter title" />
				<Field name="description" component={this.renderInpt} label="Enter decription" />
				<button className="ui button primary">Submit</button>
			</form>
		);
	}
}
const validate = (formValues) => {
	const errors = {};
	if (!formValues.title) {
		errors.title = 'You must enter a title';
	}
	if (!formValues.description) {
		errors.description = 'You must enter description';
	}
	return errors;
};

export default reduxForm({ form: 'streamCreate', validate })(StreamForm);
