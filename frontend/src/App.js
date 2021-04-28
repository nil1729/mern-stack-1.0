import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Layouts
import Navbar from './components/layouts/Navbar';
import Alerts from './components/layouts/Alerts';
import Backdrop from './components/layouts/Backdrop';

// Public Pages
import Home from './components/pages/Home';
import Developers from './components/pages/Developers';
import ViewProfile from './components/pages/ViewProfile';
import Register from './components/pages/Register';
import Login from './components/pages/Login';

// Private Pages
import PrivateRoute from './components/utils/PrivateRoute';
import Dashboard from './components/pages/Dashboard';
import Experience from './components/pages/Experience';
import EditProfile from './components/pages/EditProfile';
import Education from './components/pages/Education';
import Posts from './components/pages/Posts';
import ViewPost from './components/pages/ViewPost';

// Auth Actions
import { loadUser } from './store/actions/auth';

const App = ({ loadUser }) => {
	// Call load user on first load
	useEffect(() => {
		loadUser();
		//eslint-disable-next-line
	}, []);

	return (
		<Router>
			<Backdrop />
			<Navbar />
			<Alerts />
			<Switch>
				{/* Public Routes */}
				<Route path='/' exact component={Home} />
				<Route path='/developers' exact component={Developers} />
				<Route path='/developers/:username' exact component={ViewProfile} />
				<Route path='/register' exact component={Register} />
				<Route path='/login' exact component={Login} />
				{/* Private Routes */}
				<PrivateRoute path='/dashboard' exact component={Dashboard} />
				<PrivateRoute path='/dashboard/experience' exact component={Experience} />
				<PrivateRoute path='/dashboard/profile' exact component={EditProfile} />
				<PrivateRoute path='/dashboard/education' exact component={Education} />
				<PrivateRoute path='/posts' exact component={Posts} />
				<PrivateRoute path='/posts/:postID' exact component={ViewPost} />
				<Redirect from='/logout' to='/' />
			</Switch>
		</Router>
	);
};

export default connect(null, { loadUser })(App);
