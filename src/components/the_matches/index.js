import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { firebaseLooper, reverseArray } from '../ui/misc';
import { firebaseMatches } from '../../firebase';
import LeagueTable from './LeagueTable';
import MatchesList from './MatchesList';

class TheMatches extends React.Component {
	
	state = {
		isLoading: true,
		matches: [],
		filterMatches: [],
		statusFilter: 'All',
		resultFilter: 'All'
	};

	componentDidMount() {
		firebaseMatches
		.once('value')
		.then(snapshot => {
			const matches = firebaseLooper(snapshot);

			this.setState({
				isLoading: false,
				matches: reverseArray(matches),
				filterMatches: reverseArray(matches)
			});
		})
	}

	showStatus = (status) => {
		const list = this.state.matches.filter(match => {
			return match.final === status;
		});

		this.setState({
			filterMatches: status === 'All' ? this.state.matches : list,
			statusFilter: status,
			resultFilter: 'All'
		});
	}

	showResult = (result) => {
		const list = this.state.matches.filter(match => {
			return match.result === result;
		});

		this.setState({
			filterMatches: result === 'All' ? this.state.matches : list,
			statusFilter: 'All',
			resultFilter: result
		});
	}

	render() {
		const {
			isLoading,
			filterMatches,
			statusFilter,
			resultFilter
		} = this.state;

		return (
			<div className="the_matches_container">
				<div className="the_matches_wrapper">
					<div className="left">
						<div className="match_filters">
							<div className="match_filters_box">
									<div className="tag">
										Match Status
									</div>
									<div className="options_container">
										<div 
											className={`option ${statusFilter === 'All' ? 'active' : ''}`} 
											onClick={() => this.showStatus('All')}
										>
											All
										</div>
										<div 
											className={`option ${statusFilter === 'Yes' ? 'active' : ''}`}
											onClick={() => this.showStatus('Yes')}
										>
											Played
										</div>
										<div 
											className={`option ${statusFilter === 'No' ? 'active' : ''}`}
											onClick={() => this.showStatus('No')}
										>
											Not Played
										</div>
									</div>
							</div>
							<div className="match_filters_box">
									<div className="tag">
										Game Result
									</div>
									<div className="options_container">
										<div 
											className={`option ${resultFilter === 'All' ? 'active' : ''}`} 
											onClick={() => this.showResult('All')}
										>
											All
										</div>
										<div 
											className={`option ${resultFilter === 'W' ? 'active' : ''}`}
											onClick={() => this.showResult('W')}
										>
											Win
										</div>
										<div 
											className={`option ${resultFilter === 'L' ? 'active' : ''}`}
											onClick={() => this.showResult('L')}
										>
											Loss
										</div>
										<div 
											className={`option ${resultFilter === 'D' ? 'active' : ''}`}
											onClick={() => this.showResult('D')}
										>
											Draw
										</div>
									</div>
							</div>
						</div>
						{
							isLoading ?
							<div className="progress">
								<CircularProgress thickness={7} style={{ color: '#D10022' }} />
							</div>
							: <MatchesList matches={filterMatches} />
						}
					</div>
					<div className="right">
						<LeagueTable />
					</div>
				</div>
			</div>
		);
	}
}

export default TheMatches;