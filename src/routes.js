import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/hoc/Layout';
import Home from './components/home';
import SignIn from './components/signin';
import Dashboard from './components/admin/Dashboard';

const Routes = (props) => {
	return (
		<Layout>
			<Switch>
				<Route exact path="/dashboard" component={Dashboard}/>
				<Route exact path="/sign_in" component={SignIn}/>
				<Route exact path="/" component={Home}/>
			</Switch>
		</Layout>
	);
};

export default Routes;