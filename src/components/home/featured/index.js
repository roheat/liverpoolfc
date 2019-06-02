import React from 'react';

import Text from './Text';
import Background from '../../../resources/images/background.jpg';

const Featured = () => {
	return (
		<div 
			className="featured_wrapper" 
			style={{ 
				background: `url(${Background}) no-repeat`, 
				backgroundSize: 'cover' 
			}}
		>
			<Text />
		</div>
	);
};

export default Featured;