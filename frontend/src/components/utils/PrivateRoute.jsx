import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, authState, ...rest }) => {
	const { isAuthenticated, loading } = authState;
	return (
		<Route
			{...rest}
			render={(props) =>
				!isAuthenticated && !loading ? (
					<Redirect to={`/login?redirect=${rest.path}`} />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

const mapStateToProps = (state) => ({
	authState: state.AUTH_STATE,
});

export default connect(mapStateToProps)(PrivateRoute);
