import React from 'react';
import { LiverpoolLogo } from '../ui/icons';

class Footer extends React.Component {
	render() {
		return (
			<footer className="bck_footer">
				<div className="footer_logo">
					<LiverpoolLogo 
						link={true}
						linkTo="/"
						width="70px"
						height="90px"
					/>
				</div>
				<div className="footer_disclaimer">
					Liverpool Football Club. All Rights Reserved.
				</div>
				<div className="footer_credits">
					Created with <div className="heart"></div> by <a target="_blank" rel="noopener noreferrer" href="https://github.com/roheat/liverpoolfc">roheat</a>.
				</div>
			</footer>
		);
	}
}

export default Footer;