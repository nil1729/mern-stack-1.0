/**
 *
 * @access 	Public
 * @route  	/login
 * @desc  	Login page for users
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
	PageContainer,
	StyledTextArea,
} from '../utils/styled-components/components';

const styles = {
	image: {
		borderRadius: '50%',
		height: '15vh',
	},
	discussionBadge: {
		position: 'absolute',
		height: '1.3rem',
		width: '1.3rem',
		borderRadius: '50%',
		top: '-13px',
		right: '-5px',
		fontSize: '13px',
	},
};

const Login = () => {
	return (
		<PageContainer className='container py-3 auth__container'>
			<h2 className='text-info mb-1'>Posts</h2>
			<p
				className='lead mb-3 text-capitalize'
				style={{ fontSize: '15.5px', fontWeight: 500 }}
			>
				<i className='fas fa-users mr-2'></i>
				Welcome to the community
			</p>
			<p className='lead bg-info px-2 py-1 text-light'>Say Something ...</p>

			<form style={{ fontSize: '14px' }}>
				<StyledTextArea
					rows='4'
					placeholder='Create a New Post ...'
					className='form-control'
					aria-label='With textarea'
				></StyledTextArea>
				<button type='submit' className='btn btn-dark btn-sm mt-3'>
					Create
				</button>
			</form>
			<div className='mt-4'>
				<div className='list-group'>
					<div className='py-3 list-group-item d-flex align-items-center justify-content-evenly'>
						<div className='text-center'>
							<img
								src='https://avatars3.githubusercontent.com/u/54589036?v=4'
								alt=''
								className='img-fluid'
								style={styles.image}
							/>
							<h6 className='mt-1 text-primary'>Nilanjan Deb</h6>
						</div>
						<div style={{ flex: 1.5 }} className='ml-5'>
							<p style={{ fontSize: '13px' }} className='mb-2 text-dark'>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit.
								Dignissimos quibusdam, voluptas nisi eius velit ab! Rerum in
								molestias nisi voluptatum eveniet similique! Reprehenderit
								architecto blanditiis quidem dolore rem incidunt, unde tempore
								inventore modi, accusantium veritatis quibusdam, ad suscipit
								vitae mollitia!
							</p>
							<small className='text-muted'>
								Posted on 26<sup>th</sup> September 2019
							</small>
							<div style={{ marginTop: '12px' }}>
								<button
									style={{ fontSize: '16px' }}
									className='btn btn-sm btn-light'
								>
									<i className='far fa-thumbs-up'></i>
								</button>
								<button
									style={{ fontSize: '16px' }}
									className='btn btn-sm btn-light mx-2'
								>
									<i className='far fa-thumbs-down'></i>
								</button>
								<Link
									to='/posts/5fe326784snb326B'
									style={{ fontSize: '13.5px', position: 'relative' }}
									className='btn btn-sm btn-info ml-2 mr-3'
								>
									Discussions
									<span
										style={styles.discussionBadge}
										className='bg-dark text-light text-center'
									>
										4
									</span>
								</Link>
								<button
									style={{ fontSize: '13.5px' }}
									className='btn btn-sm btn-danger'
								>
									<i className='far fa-trash'></i>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageContainer>
	);
};
export default Login;
