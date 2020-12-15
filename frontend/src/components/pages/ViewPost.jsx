/**
 *
 * @access 	Public
 * @route  	/login
 * @desc  	Login page for users
 *
 */

import React from 'react';
import {
	PageContainer,
	StyledTextArea,
	GreyLinkButton,
} from '../utils/styled-components/components';

const styles = {
	postAvatar: {
		borderRadius: '50%',
		height: '15vh',
	},
	commentAvatar: {
		borderRadius: '50%',
		height: '10vh',
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
		<PageContainer className='container py-3 auth__container mb-5'>
			<GreyLinkButton to='/posts' className='btn my-2 btn-sm'>
				<i className='far fa-arrow-left mr-2'></i>Back to Posts
			</GreyLinkButton>
			<div className='mt-2 mb-4'>
				<div className='list-group'>
					<div className='py-3 list-group-item d-flex align-items-center justify-content-evenly'>
						<div className='text-center'>
							<img
								src='https://avatars3.githubusercontent.com/u/54589036?v=4'
								alt=''
								className='img-fluid'
								style={styles.postAvatar}
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
								<button
									style={{ fontSize: '13px' }}
									className='btn btn-sm btn-danger'
								>
									<i className='fas fa-trash mr-2'></i> Remove
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<p className='lead bg-info px-2 py-1 text-light'>Leave a Comment</p>
			<form style={{ fontSize: '14px' }}>
				<StyledTextArea
					rows='4'
					placeholder='Write a comment for this post'
					className='form-control'
					aria-label='With textarea'
				></StyledTextArea>
				<button type='submit' className='btn btn-dark btn-sm mt-3'>
					Submit
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
								style={styles.commentAvatar}
							/>
							<p className='mt-2 text-secondary mb-0'>Nilanjan Deb</p>
						</div>
						<div style={{ flex: 1.5 }} className='ml-5'>
							<p style={{ fontSize: '13px' }} className='mb-2 text-dark'>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit.
								Dignissimos quibusdam, voluptas nisi eius velit ab! Rerum in
								molestias nisi
							</p>
							<small className='text-muted'>
								Posted on 26<sup>th</sup> September 2019
							</small>
							<div style={{ marginTop: '12px' }}>
								<button
									style={{ fontSize: '13px' }}
									className='btn btn-sm btn-danger'
								>
									<i className='fas fa-trash mr-2'></i> Delete
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
