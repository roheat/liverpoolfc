import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import ScrollToTop from '../ui/scroll_to_top';

const PublicRoute = ({
	user,
	component: Component,
	...rest
}) => {
	return (
		<ScrollToTop>
		<Route {...rest} component={(props) => (
				rest.restricted ?
				(
					user ?
					<Redirect to="/dashboard" />
					: <Component {...props} user={user} />
				)
				: <Component {...props} user={user} />
			)} 
		/>
		</ScrollToTop>
	);
};

export default PublicRoute;