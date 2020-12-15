/**
 *
 * @access 	Public
 * @route  	/
 * @desc  	Landing page for the site
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';

// Assets
import background from '../utils/assets/home-bg.jpg';

const styles = {
	homeContainer: {
		background: `linear-gradient(rgba(0, 0, 0, 0.707), rgba(0, 0, 0, 0.611)),
		url(${background})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
	},
};

const Home = () => {
	return (
		<>
			<div
				style={styles.homeContainer}
				className='container-fluid d-flex justify-content-center align-items-center py-3'
			>
				<div className='text-center text-light'>
					<h1>Developers Connector</h1>
					<p className='lead'>
						Create a developer profile/portfolio, share posts and get help from
						other developers.
					</p>
					<div>
						<Link to='/register' className='btn btn-sm btn-primary mr-3'>
							Sign Up
						</Link>
						<Link to='/login' className='btn btn-sm btn-light'>
							Login
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
