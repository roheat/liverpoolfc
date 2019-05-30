import React from 'react';

import AdminLayout from '../hoc/AdminLayout';

const Dashboard = () => {
	return (
		<AdminLayout>
			<div className="user_dashboard">
				<div>
					Welcome to the dashboard.
				</div>
			</div>
		</AdminLayout>
	);
}

export default Dashboard;