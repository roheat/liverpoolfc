import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from '../routes';
import ScrollToTop from './ui/scroll_to_top';

const App = (props) => {
	return (
		<BrowserRouter>
			<ScrollToTop>
				<Routes {...props} />
			</ScrollToTop>
		</BrowserRouter>
		
	);
};

export default App;