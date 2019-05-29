import React from 'react';
import Fade from 'react-reveal/Fade';

import FormField from '../../ui/form_field';
import { validate } from '../../ui/misc';

class Enroll extends React.Component {
	
	state = {
		formError: false,
		formSuccess:'',
		formdata: {
			email: {
				element: 'input',
				value: '',
				config: {
					name: 'email_input',
					type: 'email',
					placeholder: 'Enter your email'
				},
				validation: {
					required: true,
					email: true
				},
				valid: false,
				validationMessage: ''
			}
		}
	}

	updateForm = (element) => {
		let newFormdata = {...this.state.formdata};
		let newElement = {...newFormdata[element.id]};

		newElement.value = element.event.target.value;
		
		let validData = validate(newElement);
		newElement.valid = validData[0];
		newElement.validationMessage = validData[1];

		newFormdata[element.id] = newElement;

		this.setState({
			formError: false,
			formdata: newFormdata
		});
	}

	resetForm = () => {
		let newFormdata = {...this.state.formdata};

		for(let key in newFormdata) {
			newFormdata[key].value = '';
			newFormdata[key].valid = false;
			newFormdata[key].validationMessage = '';
		}

		this.setState({
			formError: false,
			formdata: newFormdata,
			formSuccess: 'Congratulations! You have enrolled successfully.'
		});

		this.displaySuccessMessage();
	}

	displaySuccessMessage = () => {
		setTimeout(() => {
			this.setState({ formSuccess: '' })
		}, 3000);
	}

	submitForm = (event) => {
		event.preventDefault();

		let dataToSubmit = {};
		let isValid = true;

		for(let key in this.state.formdata) {
			dataToSubmit[key] = this.state.formdata[key].value;
			isValid = this.state.formdata[key].valid && isValid;
		}

		if(isValid) {
			console.log(dataToSubmit);
			this.resetForm();
		} else {
			this.setState({ formError: true });
		}
	}

	render() {
		return (
			<Fade>
				<div className="enroll_wrapper">
					<form onSubmit={(event) => this.submitForm(event)}>
						<div className="enroll_title">
							Enter your email
						</div>
						<div className="enroll_input">
							<FormField 
								id={'email'}
								formdata={this.state.formdata.email}
								change={(element) => this.updateForm(element)}
							/>
							{
								this.state.formError ? 
								<div className="error_label">Something is wrong. Try again!</div>
								: null
							}
							<div className="success_label">{this.state.formSuccess}</div>
							<button onClick={(event) => this.submitForm(event)}>Enroll</button>

						</div>
					</form>
				</div>
			</Fade>
		);
	}
}

export default Enroll;