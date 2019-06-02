import React from 'react';

import AdminLayout from '../../hoc/AdminLayout';
import FormField from '../../ui/form_field';
import { validate } from '../../ui/misc';
import { firebase, firebaseDB, firebasePlayers } from '../../../firebase';
import UploadFile from '../../ui/upload_file';

class AddEditPlayer extends React.Component {
	
	state = {
		playerId: '',
		formError: false,
		formSuccess: '',
		formTitle: '',
		players: [],
		formdata: {
			name: {
				element: 'input',
				value: '',
				config: {
					label: 'First Name',
					name: 'name_input',
					type: 'text'
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			},
			lastname: {
				element: 'input',
				value: '',
				config: {
					label: 'Last Name',
					name: 'lastname_input',
					type: 'text'
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			},
			number: {
				element: 'input',
				value: '',
				config: {
					label: 'Player Number',
					name: 'number_input',
					type: 'number'
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			},
			position: {
				element: 'select',
				value: '',
				config: {
					label: 'Position',
					name: 'position_select',
					type: 'select',
					options: [
						{key: 'Keeper', value: 'Keeper'},
						{key: 'Defence', value: 'Defence'},
						{key: 'Midfield', value: 'Midfield'},
						{key: 'Striker', value: 'Striker'}
					]
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			},
			image: {
				element: 'image',
				value: '',
				validation: {
					required: true
				},
				valid: true
			}
		}
	}

	componentDidMount() {
		const playerId = this.props.match.params.id;

		if(!playerId) {
			this.setState({ formTitle: 'Add Player' });
		} else {
			firebaseDB
			.ref(`/players/${playerId}`)
			.once('value')
			.then((snapshot) => {
				let playerData = snapshot.val();

				firebase
				.storage()
				.ref('players')
				.child(playerData.image)
				.getDownloadURL()
				.then(url => {
					this.updateFields(playerData, playerId, url);
				}).catch(e => {
					this.updateFields({...playerData, image: ''}, playerId, '');
				})
			})
		}
	}

	updateFields = (playerData, playerId, image) => {
		let newFormdata = {...this.state.formdata};

		for(let key in newFormdata) {
			newFormdata[key].value = playerData[key];
			newFormdata[key].valid = true;
		}

		this.setState({
			formdata: newFormdata,
			defaultImg: image,
			playerId,
			formTitle: 'Edit Player'
		});

	}

	updateForm = (element, content = '') => {
		let newFormdata = {...this.state.formdata};
		let newElement = {...newFormdata[element.id]};

		if(content === '') {
			newElement.value = element.event.target.value;
		} else {
			newElement.value = content;
		}
		
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
			if(this.state.formTitle === 'Add Player') {
				firebasePlayers
				.push(dataToSubmit)
				.then(() => {
					this.props.history.push('/admin/players');
				}).catch(e => this.setState({ formError: true }));
			} else {
				firebaseDB
				.ref(`players/${this.state.playerId}`)
				.update(dataToSubmit)
				.then(() => {
					this.successForm('Updated Successfully');
				}).catch(e => this.setState({ formError: true }));
			}

		} else {
			this.setState({ formError: true });
		}
	}

	successForm(message) {
		this.setState({ formSuccess: message });

		setTimeout(() => {
			this.setState({ formSuccess: '' })
		}, 2000);
	}

	resetImage = () => {
		let newFormdata = {...this.state.formdata};

		newFormdata['image'].value = '';
		newFormdata['image'].valid = false;

		this.setState({
			defaultImg: '',
			formdata: newFormdata
		});
	}

	storeFilename = (filename) => {
		this.updateForm({id: 'image'}, filename);
	}

	render() {
		return (
			<AdminLayout>
				<div className="editplayers_dialog_wrapper">
					<h2>{this.state.formTitle}</h2>
					<div>
						<form onSubmit={(event) => this.submitForm(event)}>
							
							<UploadFile 
								dir="players"
								tag={"Player Image"}
								defaultImg={this.state.defaultImg}
								defaultImgName={this.state.formdata.image.value}
								resetImage={() => this.resetImage()}
								filename={(filename) => this.storeFilename(filename)}
							/>

							<FormField 
								id={'name'}
								formdata={this.state.formdata.name}
								change={(element) => this.updateForm(element)}
							/>
							<FormField 
								id={'lastname'}
								formdata={this.state.formdata.lastname}
								change={(element) => this.updateForm(element)}
							/>
							<FormField 
								id={'number'}
								formdata={this.state.formdata.number}
								change={(element) => this.updateForm(element)}
							/>
							<FormField 
								id={'position'}
								formdata={this.state.formdata.position}
								change={(element) => this.updateForm(element)}
							/>
							<div className="success_label">{this.state.formSuccess}</div>
							{
								this.state.formError ?
								<div className="error_label">Something is wrong. Try again!</div>
								: ''
							}
							<div className="admin_submit">
								<button onClick={(event) => this.submitForm(event)}>{this.state.formTitle}</button>
							</div>
						</form>
					</div>
				</div>
			</AdminLayout>
		);
	}
}

export default AddEditPlayer;