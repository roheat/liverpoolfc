import React from 'react';
import Reveal from 'react-reveal/Reveal';

import { Tag } from '../../ui/misc';
import HomeCards from './Cards';

class MeetPlayers extends React.Component {
	
	state = {
		show: false
	};

	render() {
		return (
			<Reveal
				fraction={0.7}
				onReveal={() => this.setState({ show: true })}
			>
				<div
					className="home_meetplayers"
					style={{
						background: 'repeating-linear-gradient(-55deg, #1F2823, #1F2823 10px, #333 10px, #333 20px)'
					}}
				>
					<div className="container">
						<div className="home_meetplayers_wrapper">
							<div className="home_card_wrapper">
								<HomeCards show={this.state.show} />
							</div>
							<div className="home_text_wrapper">
								<div>
									<Tag
										background='#ffffff'
										fontSize='100px'
										color='#1F2823'
										add={{
											display: 'inline-block',
											marginBottom: '20px'
										}}
									>
										Meet
									</Tag>
								</div>
								<div>
									<Tag
										background='#ffffff'
										fontSize='100px'
										color='#1F2823'
										add={{
											display: 'inline-block',
											marginBottom: '20px'
										}}
									>
										The
									</Tag>
								</div>
								<div>
									<Tag
										background='#ffffff'
										fontSize='100px'
										color='#1F2823'
										add={{
											display: 'inline-block',
											marginBottom: '20px'
										}}
									>
										Players
									</Tag>
								</div>
								<div>
									<Tag
										background='#1F2823'
										fontSize='25px'
										color='#ffffff'
										link={true}
										linkTo='/the_team'
										add={{
											display: 'inline-block',
											marginBottom: '20px',
											border: '1px solid #ffffff'
										}}
									>
										View all players
									</Tag>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Reveal>
			
		);
	}
}

export default MeetPlayers;