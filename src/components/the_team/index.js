import React from 'react';
import Fade from 'react-reveal/Fade';
import { Promise } from 'core-js';
import CircularProgress from '@material-ui/core/CircularProgress';

import PlayerCard from '../ui/player_card';
import { firebasePlayers, firebase } from '../../firebase';
import { firebaseLooper } from '../ui/misc';

class TheTeam extends React.Component {
	
	state = {
		isLoading: true,
		players: []
	};

	componentDidMount() {
		firebasePlayers
		.once('value')
		.then(snapshot => {
			const players = firebaseLooper(snapshot);
			let promises = [];

			for(let key in players) {
				promises.push(
					new Promise((resolve, reject) => {
						firebase
						.storage()
						.ref('players')
						.child(players[key].image)
						.getDownloadURL()
						.then(url => {
							players[key].url = url;
							resolve();
						})
					})
				);
			}

			Promise.all(promises).then(() => {
				this.setState({
					isLoading: false,
					players
				})
			})

		})
	}

	showPlayersByCategory = (category) => (
		this.state.players ?
		(
			this.state.players.map((player, i) => {
				return player.position === category ?
					<Fade left delay={20} key={i}>
						<div className="item">
							<PlayerCard
								name={player.name}
								lastname={player.lastname}
								number={player.number}
								bck={player.url}
							/>
						</div>
					</Fade>
					: null
				
			})
		)
		: null
	)

	render() {
		return (
			<div style={{
					background: 'repeating-linear-gradient(-55deg, #1F2823, #1F2823 10px, #333 10px, #333 20px)'
				}}
			>
				<div className="the_team_container">
				{
					!this.state.isLoading ?
					<div>
						<div className="team_category_wrapper">
							<div className="title">Keeper</div>
							<div className="team_cards">
								{this.showPlayersByCategory('Keeper')}
							</div>
						</div>
						<div className="team_category_wrapper">
							<div className="title">Defence</div>
							<div className="team_cards">
								{this.showPlayersByCategory('Defence')}
							</div>
						</div>
						<div className="team_category_wrapper">
							<div className="title">Midfield</div>
							<div className="team_cards">
								{this.showPlayersByCategory('Midfield')}
							</div>
						</div>
						<div className="team_category_wrapper">
							<div className="title">Striker</div>
							<div className="team_cards">
								{this.showPlayersByCategory('Striker')}
							</div>
						</div>
					</div>
					: 
					<div className="progress">
						<CircularProgress thickness={7} style={{ color: '#D10022' }} />
					</div>
				}
				</div>
			</div>
			
		);
	}
}

export default TheTeam;