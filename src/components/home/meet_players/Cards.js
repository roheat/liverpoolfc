import React from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';

import VanDijk from '../../../resources/images/virgil_van_dijk.png';
import Shaqiri from '../../../resources/images/xherdan_shaqiri.png';
import Firmino from '../../../resources/images/roberto_firmino.png';
import Sturridge from '../../../resources/images/daniel_sturridge.png';
import PlayerCard from '../../ui/player_card';

class HomeCards extends React.Component {
	
	state = {
		cards: [
			{
				bottom:90,
				left: 300	
			},
			{
				bottom:60,
				left: 200	
			},
			{
				bottom:30,
				left: 100	
			},
			{
				bottom:0,
				left: 0	
			}
		],
		players: [
			{
				number: "9",
				name: "Roberto",
				lastname: "Firmino",
				bck: Firmino
			},
			{
				number: "15",
				name: "Daniel",
				lastname: "Sturridge",
				bck: Sturridge
			},
			{
				number: "4",
				name: "Virgil",
				lastname: "van Dijk",
				bck: VanDijk
			},
			{
				number: "23",
				name: "Xherdan",
				lastname: "Shaqiri",
				bck: Shaqiri
			}
		]
	}

	showAnimatedCards = ({ cards, players }) => (
		cards.map((card, i) => {
			return (
				<Animate
					key={i}
					show={this.props.show}
					start={{
						bottom: 0,
						left: 0
					}}
					enter={{
						left: [card.left],
						bottom: [card.bottom],
						timing: {duration: 500, ease: easePolyOut}
					}}
				>
					{({ left, bottom }) => (
						<div
							style={{
								bottom,
								left,
								position: 'absolute'
							}}
						>
							<PlayerCard 
								number={players[i].number}
								name={players[i].name}
								lastname={players[i].lastname}
								bck={players[i].bck}
							/>
						</div>
					)}
				</Animate>
			)
		})
	)

	render() {
		return (
			<div>{this.showAnimatedCards(this.state)}</div>
		);
	}
}

export default HomeCards;