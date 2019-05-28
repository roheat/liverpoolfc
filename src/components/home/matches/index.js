import React from 'react';

import { Tag } from '../../ui/misc';

const MatchesHome = () => {
	return (
		<div className="home_matches_wrapper">
			<div className="container">
				<Tag
					link={false}
					background="#1F2823"
					fontSize="50px"
					color="#ffffff"
				>
					Matches
				</Tag>

				<Tag
					link={true}
					linkTo="/the_matches"
					background="#ffffff"
					fontSize="20px"
					color="#1F2823"
				>
					See more matches
				</Tag>
			</div>
		</div>
	);
}

export default MatchesHome;