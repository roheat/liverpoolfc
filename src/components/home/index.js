import React from 'react';

import Featured from './featured';
import MatchesHome from './matches';

const Home = () => {
	return (
		<div className="bck_home">
			<Featured />
			<MatchesHome />
		</div>
	);
};

export default Home;