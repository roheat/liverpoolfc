import React from 'react';

import FormField from '../ui/form_field';
import { validate } from '../ui/misc';
import { firebase } from '../../firebase';

class SignIn extends React.Component {
	
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
			},
			password: {
				element: 'input',
				value: '',
				config: {
					name: 'password_input',
					type: 'password',
					placeholder: 'Enter password'
				},
				validation: {
					required: true,
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

	submitForm = (event) => {
		event.preventDefault();

		let dataToSubmit = {};
		let isValid = true;

		for(let key in this.state.formdata) {
			dataToSubmit[key] = this.state.formdata[key].value;
			isValid = this.state.formdata[key].valid && isValid;
		}

		if(isValid) {
			firebase.auth()
			.signInWithEmailAndPassword(
				dataToSubmit.email,
				dataToSubmit.password
			).then(() => {
				this.props.history.push('/dashboard')
			}).catch(e => this.setState({ formError: true }))

		} else {
			this.setState({ formError: true });
		}
	}

	render() {
		return (
			<div className="container">
				<div className="signin_wrapper" style={{ margin: '100px' }}>
					<form onSubmit={(event) => this.submitForm(event)}>
						<h2>Admin Login</h2>
						<FormField 
							id={'email'}
							formdata={this.state.formdata.email}
							change={(element) => this.updateForm(element)}
						/>
						<FormField 
							id={'password'}
							formdata={this.state.formdata.password}
							change={(element) => this.updateForm(element)}
						/>
						{
							this.state.formError ? 
							<div className="error_label">Something is wrong. Try again!</div>
							: null
						}
						<button onClick={(event) => this.submitForm(event)}>Log In</button>
					</form>
				</div>
			</div>
		);
	}
}

export default SignIn;