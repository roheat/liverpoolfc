import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { LiverpoolLogo } from '../ui/icons';
import { LiverBird } from '../ui/icons';

class Header extends React.Component {
	render() {
		return (
			<AppBar
				position="fixed"
				style={{
					backgroundColor: '#1F2823',
					boxShadow: 'none',
					padding: '10px 0',
					borderBottom: '2px solid #E31B23'
				}}
			>
				<Toolbar style={{ display: 'flex'}}>
					<div style={{ flexGrow: 1 }}>
						<div className="header_logo">
							<LiverpoolLogo 
								link={true}
								linkTo="/"
								width="55px"
								height="70px"
							/>
						</div>
					</div>
					
					<Link to="/the_team">
						<Button color="inherit">Team</Button>
					</Link>
					<Link to="/the_matches">
						<Button color="inherit">Matches</Button>
					</Link>
					<Link to="/dashboard">
						<Button color="inherit">Dashboard</Button>
					</Link>
					<LiverBird
						width="50px"
						height="70px"
					/>

				</Toolbar>
			</AppBar>
		);
	}
}

export default Header;