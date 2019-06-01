import React from 'react';
import NodeGroup from 'react-move/NodeGroup';
import { easePolyOut } from 'd3-ease';

class MatchesList extends React.Component {
	
	state = {
		matches: []
	};

	static getDerivedStateFromProps(props, state) {
		return state = {
			matches: props.matches
		}
	}

	showMatches = () => (
		this.state.matches ?
		(
			<NodeGroup 
				data={this.state.matches}
				keyAccessor={d => d.id}
				start={() => ({
					opacity: 0,
					x: -200
				})}
				enter={(d, i) => ({
					opacity: [1],
					x: [0],
					timing: {duration: 500, delay: i*50, ease: easePolyOut}
				})}
				update={(d, i) => ({
					opacity: [1],
					x: [0],
					timing: {duration: 500, delay: i*50, ease: easePolyOut}
				})}
				leave={(d, i) => ({
					opacity: [0],
					x: [-200],
					timing: {duration: 500, delay: i*50, ease: easePolyOut}
				})}
			>
			{(nodes) => (
				<div>
					{
						nodes.map(({key, data, state:{x, opacity}}) =>(
							<div
								key={key}
								className="match_box_big"
								style={{
									opacity,
									transform: `translate(${x}px)`
								}}
							>
								<div className="block_wrapper">
									<div className="block">
										<div 
											className="icon"
											style={{ background: `url(/team_icons/${data.homeThmb}.png)` }}
										></div>
										<div className="team">{data.home}</div>
										<div className="result">{data.resultHome}</div>
									</div>
									<div className="block">
										<div 
											className="icon"
											style={{ background: `url(/team_icons/${data.awayThmb}.png)` }}
										></div>
										<div className="team">{data.away}</div>
										<div className="result">{data.resultAway}</div>
									</div>
								</div>
								<div className="block_wrapper info">
									<div><strong>Date:</strong> {data.date}</div>
									<div><strong>Referee:</strong> {data.referee}</div>
									<div><strong>Stadium:</strong> {data.stadium}</div>
								</div>
							</div>
						))
					}
				</div>
			)}
			</NodeGroup>
		)
		:null
	)

	render() {
		return (
			<div>
				{this.showMatches()}
			</div>
		);
	}
}

export default MatchesList;