import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
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
						<Nav.Item>
							<NavLink className='nav-link' to='/developers'>
								Developers
							</NavLink>
						</Nav.Item>
						{1 === 3 ? (
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
									<NavLink className='nav-link' to='/logout'>
										<i className='far fa-sign-out mr-1'></i>Logout
									</NavLink>
								</Nav.Item>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
};

export default Navigation;
