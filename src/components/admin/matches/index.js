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
import { firebaseMatches } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';

class AdminMatches extends React.Component {
	
	state = {
		isLoading: true,
		matches: []
	};

	componentDidMount() {
		firebaseMatches
		.once('value')
		.then((snapshot) => {
			const matches = firebaseLooper(snapshot);

			this.setState({ 
				matches: reverseArray(matches),
				isLoading: false
			});
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
									<TableCell>Date</TableCell>
									<TableCell>Match</TableCell>
									<TableCell>Result</TableCell>
									<TableCell>Status</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									this.state.matches ?
									(
										this.state.matches.map((match, i)=> (
											<TableRow key={i}>
												<TableCell>{match.date}</TableCell>
												<TableCell>
													<Link to={`/admin/matches/add_edit/${match.id}`}>
														{match.home} vs {match.away}
													</Link>
												</TableCell>
												<TableCell>{match.resultHome} <strong>-</strong> {match.resultAway}</TableCell>
												<TableCell>
													{
														match.final === 'Yes' ?
														<span className="matches_tag_red">Played</span>
														: <span className="matches_tag_green">Not Played</span>
													}
												</TableCell>
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

export default AdminMatches;