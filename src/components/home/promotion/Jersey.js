import React from 'react';
import Zoom from 'react-reveal/Zoom';

import Jersey from '../../../resources/images/jersey.jpg';

const PromotionJersey = () => {
	return (
		<div className="promotion_jersey">
			<div className="left">
				<Zoom>
					<div>
						<span>Win a</span>
						<span>Jersey</span>
					</div>
				</Zoom>
			</div>
			<div className="right">
				<div style={{ background: `url(${Jersey})` }}></div>
			</div>
		</div>
	);
};

export default PromotionJersey;