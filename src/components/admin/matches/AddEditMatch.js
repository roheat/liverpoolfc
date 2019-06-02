import React from 'react';

import AdminLayout from '../../hoc/AdminLayout';
import FormField from '../../ui/form_field';
import { validate, firebaseLooper } from '../../ui/misc';
import { firebaseTeams, firebaseDB, firebaseMatches } from '../../../firebase';
import ModalBox from '../../ui/modal';

class AddEditMatch extends React.Component {
	
	state = {
		matchId: '',
		formTitle: '',
		formError: false,
		formSuccess: '',
		teams: [],
		open: false,
		formdata: {
			date: {
				element: 'input',
				value: '',
				config: {
					label: 'Match Date',
					name: 'date_input',
					type: 'date'
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			},
			home: {
				element: 'select',
				value: '',
				config: {
					label: 'Select Home Team',
					name: 'select_home',
					type: 'select',
					options: []
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: false
			},
			resultHome: {
				element: 'input',
				value: '',
				config: {
					label: 'Home Score',
					name: 'result_home_input',
					type: 'text'
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: false
			},
			away: {
				element: 'select',
				value: '',
				config: {
					label: 'Select Away Team',
					name: 'select_away',
					type: 'select',
					options: []
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: false
			},
			resultAway: {
				element: 'input',
				value: '',
				config: {
					label: 'Away Score',
					name: 'result_away_input',
					type: 'text'
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: false
			},
			referee: {
				element: 'input',
				value: '',
				config: {
					label: 'Referee',
					name: 'referee_input',
					type: 'text'
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			},
			stadium: {
				element: 'input',
				value: '',
				config: {
					label: 'Stadium',
					name: 'stadium_input',
					type: 'text'
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			},
			result: {
				element: 'select',
				value: '',
				config: {
					label: 'Match Result',
					name: 'result_select',
					type: 'select',
					options: [
						{key: 'W', value: 'W'},
						{key: 'L', value: 'L'},
						{key: 'D', value: 'D'},
						{key: 'n/a', value: 'n/a'}
					]
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			},
			final: {
				element: 'select',
				value: '',
				config: {
					label: 'Match Played',
					name: 'final_select',
					type: 'select',
					options: [
						{key: 'Yes', value: 'Yes'},
						{key: 'No', value: 'No'}
					]
				},
				validation: {
					required: true
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			},
		}
	};

	updateFields(title, match, teamOptions, teams, matchId) {
		let newFormdata = {...this.state.formdata};

		for(let key in newFormdata) {
			if(match) {
				newFormdata[key].value = match[key];
				newFormdata[key].valid = true;
			}
			if(key === "home" || key === "away") {
				newFormdata[key].config.options = teamOptions;
			}
		}

		this.setState({
			formTitle: title,
			teams,
			matchId,
			formdata: newFormdata
		});
	}

	componentDidMount() {
		const matchId = this.props.match.params.id;
		const getTeams = (match, title) => {
			firebaseTeams
			.once('value')
			.then((snapshot) => {
				const teams = firebaseLooper(snapshot);
				const teamOptions = [];

				snapshot.forEach((childSnapshot) => {
					teamOptions.push({
						key: childSnapshot.val().shortName,
						value: childSnapshot.val().shortName
					});
				});
				this.updateFields(title, match, teamOptions, teams, matchId);
			});
		}

		if(!matchId) {
			getTeams(null, 'Add Match')
		} else {
			firebaseDB.ref(`matches/${matchId}`)
			.once('value')
			.then((snapshot) => {
				const match = snapshot.val();
				getTeams(match, 'Edit Match');
			})
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

	successForm(message) {
		this.setState({ formSuccess: message });

		setTimeout(() => {
			this.setState({ formSuccess: '' });
		}, 2000);
	}

	submitForm = (event) => {
		event.preventDefault();

		let dataToSubmit = {};
		let isValid = true;

		for(let key in this.state.formdata) {
			dataToSubmit[key] = this.state.formdata[key].value;
			isValid = this.state.formdata[key].valid && isValid;
		}

		this.state.teams.forEach((team) => {
			if(team.shortName === dataToSubmit.home) {
				dataToSubmit['homeThmb'] = team.thmb;
			}
			if(team.shortName === dataToSubmit.away) {
				dataToSubmit['awayThmb'] = team.thmb;
			}
		})

		if(isValid) {
			if(this.state.formTitle === 'Add Match') {
				firebaseMatches
				.push(dataToSubmit)
				.then(() => {
					this.props.history.push('/admin/matches');
				}).catch(e => console.log(e));
			} else {
				firebaseDB.ref(`matches/${this.state.matchId}`)
				.update(dataToSubmit)
				.then(() => {
					this.successForm('Updated Successfully!')
				}).catch(e => this.setState({ formError: true }));
			}
		} else {
			this.setState({ formError: true });
		}
	}

	deleteMatch = (matchId) => {
		firebaseDB
		.ref(`matches/${matchId}`)
		.remove()
		.then(() => {
			this.setState({ open: false });
			this.props.history.push('/admin/matches');
		})
	}

	render() {
		return (
			<AdminLayout>
				<div className="editmatch_dialog_wrapper">
					<h2>{this.state.formTitle}</h2>
					<div>
						<form onSubmit={(event) => this.submitForm(event)}>
							<FormField 
								id={'date'}
								formdata={this.state.formdata.date}
								change={(element) => this.updateForm(element)}
							/>
							<div className="select_team_layout">
								<div className="label_input">Home Team</div>
								<div className="wrapper">
									<div className="left">
										<FormField 
											id={'home'}
											formdata={this.state.formdata.home}
											change={(element) => this.updateForm(element)}
										/>
									</div>
									<div>
										<FormField 
											id={'resultHome'}
											formdata={this.state.formdata.resultHome}
											change={(element) => this.updateForm(element)}
										/>
									</div>
								</div>
							</div>

							<div className="select_team_layout">
								<div className="label_input">Away Team</div>
								<div className="wrapper">
									<div className="left">
										<FormField 
											id={'away'}
											formdata={this.state.formdata.away}
											change={(element) => this.updateForm(element)}
										/>
									</div>
									<div>
										<FormField 
											id={'resultAway'}
											formdata={this.state.formdata.resultAway}
											change={(element) => this.updateForm(element)}
										/>
									</div>
								</div>
							</div>
							
							<div className="split_fields">
								<FormField 
									id={'referee'}
									formdata={this.state.formdata.referee}
									change={(element) => this.updateForm(element)}
								/>
								<FormField 
									id={'stadium'}
									formdata={this.state.formdata.stadium}
									change={(element) => this.updateForm(element)}
								/>
							</div>

							<div className="split_fields last">
								<FormField 
									id={'result'}
									formdata={this.state.formdata.result}
									change={(element) => this.updateForm(element)}
								/>
								<FormField 
									id={'final'}
									formdata={this.state.formdata.final}
									change={(element) => this.updateForm(element)}
								/>
							</div>

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
						{
							this.state.formTitle === 'Edit Match' ?
							<button
								onClick={() => this.setState({ open: true})}
								className="admin_delete"
							>
								Delete Match
							</button>
							: null
						}
						<ModalBox
								open={this.state.open}
								handleClose={() => this.setState({ open: false })}
								handleDelete={() => this.deleteMatch(this.state.matchId)}
								title="Delete Match" 
	 							content={`Are you sure you want to delete the match with id: ${this.state.matchId}?`}
						/>
					</div>
				</div>
				
			</AdminLayout>
		);
	}
}

export default AddEditMatch;