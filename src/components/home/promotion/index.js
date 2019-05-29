import React from 'react';

import PromotionJersey from './Jersey';
import Enroll from './Enroll';

const Promotion = () => {
	return (
		<div className="promotion_wrapper" style={{ background: '#ffffff' }}>
			<div className="container">
				<PromotionJersey />
				<Enroll />
			</div>
		</div>
	);
};

export default Promotion;