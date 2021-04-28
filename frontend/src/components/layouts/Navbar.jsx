import React from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { logOut } from '../../store/actions/auth';

const Navigation = ({ authState, logOut }) => {
	return (
		<>
			<Navbar sticky='top' bg='dark' variant='dark' className='py-2 px-5'>
				<NavLink to='/'>
					<Navbar.Brand>
						<i className='fas fa-laptop-code mr-2'></i>
						DevConnector
					</Navbar.Brand>
				</NavLink>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav className='ml-auto'>
						{authState.loading ? null : (
							<>
								<Nav.Item>
									<NavLink className='nav-link' to='/developers'>
										Developers
									</NavLink>
								</Nav.Item>
								{!authState.isAuthenticated && !authState.loading ? (
									<>
										<Nav.Item>
											<NavLink className='nav-link' to='/register'>
												Register
											</NavLink>
										</Nav.Item>
										<Nav.Item>
											<NavLink className='nav-link' to='/login'>
												Login
											</NavLink>
										</Nav.Item>
									</>
								) : (
									<>
										<Nav.Item>
											<NavLink className='nav-link' to='/posts'>
												Posts
											</NavLink>
										</Nav.Item>
										<Nav.Item>
											<NavLink className='nav-link' to='/dashboard'>
												<i className='fas fa-user mr-1'></i>Dashboard
											</NavLink>
										</Nav.Item>
										<Nav.Item>
											<NavLink className='nav-link log_out_link' to='/logout' onClick={logOut}>
												<i className='far fa-sign-out mr-1'></i>Logout
											</NavLink>
										</Nav.Item>
									</>
								)}
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
};

const mapStateToProps = (state) => ({
	authState: state.AUTH_STATE,
});

export default connect(mapStateToProps, { logOut })(Navigation);
