/**
 *
 * @access 	Public
 * @route  	/
 * @desc  	Landing page for the site
 *
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signInUser } from '../../store/actions/auth';

// Assets
import background from '../utils/assets/home-bg.jpg';

const styles = {
	homeContainer: {
		background: `linear-gradient(rgba(155, 155, 155, 0.7), rgba(0, 0, 0, 0.711), rgba(0, 0, 0, 0.9)),
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

const Home = ({ authState: { isAuthenticated, loading, user }, signInUser }) => {
	const [demoBtnDisable, setDemoBtnDisable] = useState(false);

	const demoLoginHandler = async () => {
		setDemoBtnDisable(true);
		await signInUser({
			email: 'nilanjan.deb@gmail.in',
			password: '3Mu#feBSBeV8HY6gY2Giiw@RXK@tt5',
		});
		setDemoBtnDisable(false);
	};

	return (
		<>
			<div
				style={styles.homeContainer}
				className='container-fluid d-flex justify-content-center align-items-center py-3'
			>
				<div className='text-center text-light'>
					<h1>Developers Connector</h1>
					<p className='lead'>
						Create a developer profile/portfolio, share posts and get help from other developers.
					</p>
					{!isAuthenticated && !loading ? (
						<div>
							<button
								disabled={demoBtnDisable}
								onClick={demoLoginHandler}
								className='btn btn-sm btn-secondary'
							>
								Demo Login
							</button>
							<Link to='/register' className='btn btn-sm btn-primary mx-3'>
								Sign Up
							</Link>
							<Link to='/login' className='btn btn-sm btn-light '>
								Login
							</Link>
						</div>
					) : null}
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state) => ({
	authState: state.AUTH_STATE,
});

export default connect(mapStateToProps, { signInUser })(Home);
