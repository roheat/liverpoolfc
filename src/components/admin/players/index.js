import React from 'react';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';

import AdminLayout from '../../hoc/AdminLayout';
import { firebasePlayers } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';

class AdminPlayers extends React.Component {
	
	state = {
		isLoading: true,
		players: []
	}

	componentDidMount() {
		firebasePlayers
		.once('value')
		.then(snapshot => {
			const players = firebaseLooper(snapshot);

			this.setState({
				players: reverseArray(players),
				isLoading: false
			})
		})
	}

	render() {
		return (
			<AdminLayout>
				<div>
					<Paper>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>First Name</TableCell>
									<TableCell>Last Name</TableCell>
									<TableCell>Number</TableCell>
									<TableCell>Position</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									this.state.players ?
									(
										this.state.players.map((player, i)=> (
											<TableRow key={i}>
												<TableCell>
													<Link to={`/admin/players/add_edit/${player.id}`}>
														{player.name}
													</Link>
												</TableCell>
												<TableCell>
													<Link to={`/admin/players/add_edit/${player.id}`}>
														{player.lastname}
													</Link>
												</TableCell>
												<TableCell>{player.number}</TableCell>
												<TableCell>{player.position}</TableCell>
											</TableRow>
										))
									)
									: null
								}
							</TableBody>
						</Table>
					</Paper>
					<div className="admin_progress">
						{
							this.state.isLoading ?
							<CircularProgress thickness={7} style={{ color: '#D10022' }} />
							: ''
						}
					</div>
				</div>
				
			</AdminLayout>
		);
	}
}

export default AdminPlayers;