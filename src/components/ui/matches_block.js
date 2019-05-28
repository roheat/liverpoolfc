import React from 'react';

const MatchesBlock = ({ match }) => {
	return (
		<div className="match_block">
			<div className="match_date">
				{ match.final === 'Yes' ? match.date : `Match not played yet : ${match.date}` }
			</div>
			<div className="match_wrapper">
				<div className="match_top">
					<div className="left">
						<div className="icon" style={{ background: `url(/team_icons/${match.homeThmb}.png)` }}></div>
						<div className="team_name">{match.home}</div>
					</div>
					<div className="right">
						{ match.final ? match.resultHome : '-' }
					</div>
				</div>
				<div className="match_bottom">
					<div className="left">
						<div className="icon" style={{ background: `url(/team_icons/${match.awayThmb}.png)` }}></div>
						<div className="team_name">{match.away}</div>
					</div>
					<div className="right">
						{ match.final ? match.resultAway : '-' }
					</div>
				</div>
			</div>
		</div>
	);
	
};

export default MatchesBlock;