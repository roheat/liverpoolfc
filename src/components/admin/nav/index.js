import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';

import { firebase } from '../../../firebase';

const AdminNav = () => {
	
	const items = [
		{
			title: 'Matches',
			linkTo: '/admin/matches'
		},
		{
			title: 'Add Match',
			linkTo: '/admin/matches/add_edit'
		},
		{
			title: 'Players',
			linkTo: '/admin/players'
		},
		{
			title: 'Add Player',
			linkTo: '/admin/players/add_edit'
		}
	];
	
	const style = {
		color: '#ffffff',
    	fontWeight: '300',
    	borderBottom: '1px solid #353535'
	};

	const renderItems = () => (
		

		items.map((item) => (
			<Link to={item.linkTo} key={item.title}>
				<ListItem button style={style}>
					{item.title}
				</ListItem>
			</Link>
		))
	)

	const handleLogout = () => {
		firebase.auth()
		.signOut()
		.then(() => {
			console.log('logged out!')
		}).catch(e => console.log(e))
	}

	return (
		<div>
			{renderItems()}
			<ListItem button style={style} onClick={() => handleLogout()}>
				Log out
			</ListItem>
		</div>
	);
}

export default AdminNav;