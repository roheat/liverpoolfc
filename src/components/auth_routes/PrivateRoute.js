import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import ScrollToTop from '../ui/scroll_to_top';

const PrivateRoute = ({
	user,
	component: Component,
	...rest
}) => {
	return (
		<ScrollToTop>
		<Route {...rest} component={(props) => (
				user ?
				<Component user={user} {...props} />
				: <Redirect to="/sign_in" />
			)}
		/>
		</ScrollToTop>
	);
}

export default PrivateRoute;