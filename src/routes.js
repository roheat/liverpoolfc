import React from 'react';
import { Switch } from 'react-router-dom';

import Layout from './components/hoc/Layout';
import Home from './components/home';
import SignIn from './components/signin';
import Dashboard from './components/admin/Dashboard';
import AdminMatches from './components/admin/matches';

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
			</Switch>
		</Layout>
	);
};

export default Routes;