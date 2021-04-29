/**
 *
 * @access 	Public
 * @route  	/developers
 * @desc  	show the list of developers account on the site
 *
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer, AvatarImage } from '../utils/styled-components/components';
import { connect } from 'react-redux';
import { fetchDevelopers } from '../../store/actions/developers';
import Spinner from 'react-bootstrap/Spinner';

const Developers = ({ fetchDevelopers, devState: { developers, loading } }) => {
	useEffect(() => {
		fetchDevelopers();
		// eslint-disable-next-line
	}, []);

	return (
		<PageContainer className='py-3 container'>
			<h1 className='mb-1 text-info'>Developers</h1>
			<p className='lead'>
				<i className='fab fa-react mr-2'></i>
				Browse and connect with Developers
			</p>
			{loading || !developers ? (
				<>
					<style type='text/css'>
						{`
								.spinner-border {
									height: 4rem;
									width: 4rem;
									color: rgb(20, 20, 20, 0.9);
								}
							`}
					</style>
					<div className='text-center mt-5'>
						<Spinner animation='border' />
					</div>
				</>
			) : developers && developers.length === 0 ? (
				<>
					<p className='lead text-center mt-5 bg-light'>
						Sorry!! Not found any developers at this moment!
						<br />
						You can register yourself here as a developer
					</p>
				</>
			) : (
				<div className='list-group'>
					{developers &&
						developers.map((dev) => (
							<div
								key={dev.user_id}
								className='py-3 list-group-item d-flex align-items-center justify-content-evenly border-top mb-3'
							>
								<AvatarImage
									name={dev.name}
									colorCode={dev.avatar_colour_code}
									imageURL={dev.profile_image_url}
								/>
								<div style={{ flex: 1.5 }} className='mx-4'>
									<h5>{dev.name.length > 25 ? dev.name.substr(0, 25).concat('...') : dev.name}</h5>
									<p style={{ fontSize: '14px' }}>
										{dev.current_position.toLowerCase() === 'others'
											? 'Working'
											: dev.current_position}{' '}
										at {dev.current_working_place_name}
									</p>
									{dev.location ? (
										<p style={{ fontSize: '15px' }}>
											<i className='fal fa-map-marker-alt mr-1'></i>
											{dev.location}
										</p>
									) : null}
									<Link className='btn btn-primary btn-sm' to={`/developers/${dev.username}`}>
										View Profile
									</Link>
								</div>
								<div style={{ flex: 0.8 }} className='d-flex justify-content-center'>
									<ul className='list-group text-primary'>
										{dev.skills
											.split(',')
											.slice(0, 4)
											.map((skill) => (
												<li
													style={{
														border: 0,
														fontSize: '14px',
														background: 'transparent',
													}}
													className='list-group-item mb-1 p-0 text-left text-uppercase'
													key={skill}
												>
													<i className='far fa-check mr-1'></i>
													{skill}
												</li>
											))}
									</ul>
								</div>
							</div>
						))}
				</div>
			)}{' '}
		</PageContainer>
	);
};

const mapStateToProps = (state) => ({
	devState: state.DEVELOPER_STATE,
});

export default connect(mapStateToProps, { fetchDevelopers })(Developers);
