import React from 'react';
import Fade from 'react-reveal/Fade';

import FormField from '../../ui/form_field';
import { validate } from '../../ui/misc';
import { firebasePromotions } from '../../../firebase';

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

	resetForm = (reset) => {
		let newFormdata = {...this.state.formdata};

		for(let key in newFormdata) {
			newFormdata[key].value = '';
			newFormdata[key].valid = false;
			newFormdata[key].validationMessage = '';
		}

		this.setState({
			formError: false,
			formdata: newFormdata,
			formSuccess: reset ? 'Congratulations! Enrolled successfully.' : 'You have already enrolled!'
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
			firebasePromotions
			.orderByChild('email')
			.equalTo(dataToSubmit.email)
			.once('value')
			.then((snapshot) => {
				if(snapshot.val() === null) {
					firebasePromotions.push(dataToSubmit);
					this.resetForm(true);
				} else {
					this.resetForm(false);
				}
			});

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
							<div className="enroll_disclaimer">
								We will notify the winner via email. Stay tuned!
							</div>
						</div>
					</form>
				</div>
			</Fade>
		);
	}
}

export default Enroll;