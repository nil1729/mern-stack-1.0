import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Layouts
import Navbar from './components/layouts/Navbar';

// Public Pages
import Home from './components/pages/Home';
import Developers from './components/pages/Developers';
import ViewProfile from './components/pages/ViewProfile';
import Register from './components/pages/Register';
import Login from './components/pages/Login';

// Private Pages
import Dashboard from './components/pages/Dashboard';
import Experience from './components/pages/Experience';
import EditProfile from './components/pages/EditProfile';
import Education from './components/pages/Education';
import Posts from './components/pages/Posts';
import ViewPost from './components/pages/ViewPost';

const App = () => {
	return (
		<Router>
			<Navbar />
			<Switch>
				{/* Public Routes */}
				<Route path='/' exact component={Home} />
				<Route path='/developers' exact component={Developers} />
				<Route path='/developers/:id' exact component={ViewProfile} />
				<Route path='/register' exact component={Register} />
				<Route path='/login' exact component={Login} />
				{/* Private Routes */}
				<Route path='/dashboard' exact component={Dashboard} />
				<Route path='/dashboard/experience' exact component={Experience} />
				<Route path='/dashboard/profile' exact component={EditProfile} />
				<Route path='/dashboard/education' exact component={Education} />
				<Route path='/posts' exact component={Posts} />
				<Route path='/posts/:id' exact component={ViewPost} />
			</Switch>
		</Router>
	);
};

export default App;
