import React from 'react';
import { Switch } from 'react-router-dom';

import Layout from './components/hoc/Layout';
import Home from './components/home';
import SignIn from './components/signin';
import Dashboard from './components/admin/Dashboard';
import AdminMatches from './components/admin/matches';
import AddEditMatch from './components/admin/matches/AddEditMatch';
import AdminPlayers from './components/admin/players';
import AddEditPlayer from './components/admin/players/AddEditPlayer';
import TheTeam from './components/the_team';
import TheMatches from './components/the_matches';

import PrivateRoute from './components/auth_routes/PrivateRoute';
import PublicRoute from './components/auth_routes/PublicRoute';

const Routes = (props) => {
	return (
		<Layout>
			<Switch>
				<PrivateRoute 
					{...props} 
					exact 
					path="/dashboard" 
					component={Dashboard} 
				/>
				<PrivateRoute 
					{...props} 
					exact 
					path="/admin/players/add_edit/" 
					component={AddEditPlayer}
				/>
				<PrivateRoute 
					{...props} 
					exact 
					path="/admin/players/add_edit/:id" 
					component={AddEditPlayer}
				/>
				<PrivateRoute 
					{...props} 
					exact 
					path="/admin/players" 
					component={AdminPlayers}
				/>
				<PrivateRoute 
					{...props} 
					exact 
					path="/admin/matches/add_edit/" 
					component={AddEditMatch}
				/>
				<PrivateRoute 
					{...props} 
					exact 
					path="/admin/matches/add_edit/:id" 
					component={AddEditMatch} 
				/>
				<PrivateRoute 
					{...props} 
					exact 
					path="/admin/matches" 
					component={AdminMatches} 
				/>
				<PublicRoute
					{...props}
					exact 
					path="/sign_in" 
					component={SignIn}
					restricted={true}
				/>
				<PublicRoute
					{...props}
					exact 
					path="/" 
					component={Home}
					restricted={false}
				/>
				<PublicRoute
					{...props}
					exact 
					path="/the_team" 
					component={TheTeam}
					restricted={false}
				/>
				<PublicRoute
					{...props}
					exact 
					path="/the_matches" 
					component={TheMatches}
					restricted={false}
				/>
			</Switch>
		</Layout>
	);
};

export default Routes;