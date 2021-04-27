/**
 *
 * @access 	Public
 * @route  	/login
 * @desc  	Login page for users
 *
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer, StyledTextArea } from '../utils/styled-components/components';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import { fetchPosts, addPost } from '../../store/actions/posts';
import moment from 'moment';

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

const TimestampComponent = ({ timestamp }) => {
	let currDate = new Date(timestamp);
	const tDate = currDate.getDate();
	const tDateOrder = moment(currDate).format('Do').slice(-2);
	const tMonth = moment(currDate).format('MMMM');
	const tYear = currDate.getFullYear();

	return (
		<>
			{' '}
			{tDate}
			<sup>{tDateOrder}</sup> {tMonth} {tYear}, {moment(currDate).format('hh:mm a')}
		</>
	);
};

function createMarkup(body) {
	return { __html: body };
}

const Posts = ({ fetchPosts, addPost, postState, authState: { isAuthenticated, user } }) => {
	const [posts, setPosts] = useState(null);
	const [newPostBody, setNewPostBody] = useState('');
	const [submitted, setSubmitted] = useState(false);

	useEffect(() => {
		if (user && postState.posts === null) fetchPosts();
		if (user && postState.posts) setPosts(postState.posts);
		// eslint-disable-next-line
	}, [isAuthenticated, postState]);

	// Submit Handling
	const submitHandler = async (e) => {
		e.preventDefault();
		setSubmitted(true);
		const isSuccess = await addPost({ body: newPostBody });
		if (isSuccess) setNewPostBody('');
		setSubmitted(false);
	};

	return (
		<PageContainer className='container py-3 auth__container'>
			<h2 className='text-info mb-1'>Posts</h2>
			<p className='lead mb-3 text-capitalize' style={{ fontSize: '15.5px', fontWeight: 500 }}>
				<i className='fas fa-users mr-2'></i>
				Welcome to the community
			</p>
			<p className='lead bg-info px-2 py-1 text-light'>Say Something ...</p>

			<form style={{ fontSize: '14px' }} onSubmit={submitHandler}>
				<StyledTextArea
					disabled={submitted}
					required
					rows='4'
					placeholder='Create a New Post ...'
					className='form-control'
					aria-label='With textarea'
					value={newPostBody}
					onChange={(e) => setNewPostBody(e.target.value)}
				></StyledTextArea>
				<button disabled={submitted} type='submit' className='btn btn-dark btn-sm mt-3'>
					{submitted ? (
						<>
							Posting... {'	'}
							<Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
						</>
					) : (
						<>Create</>
					)}
				</button>
			</form>
			<div className='mt-4'>
				{postState.loading || postState.posts === null ? (
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
						<div className='text-center'>
							<Spinner animation='border' />
						</div>
					</>
				) : postState.posts.length === 0 ? (
					<p className='text-center lead'>
						Sorry!! Not found any posts at this moment. You can add new post here!
					</p>
				) : (
					<div className='list-group'>
						{posts &&
							posts.map((post, index) => (
								<div
									key={post.id}
									className='py-3 list-group-item d-flex align-items-center justify-content-evenly mb-3 border-top'
								>
									<div className='text-center'>
										<img
											src='https://avatars3.githubusercontent.com/u/54589036?v=4'
											alt=''
											className='img-fluid'
											style={styles.image}
										/>
										<h6 className='mt-1 text-primary'>{post.author_name}</h6>
									</div>
									<div style={{ flex: 1.5 }} className='ml-5'>
										<p
											style={{ fontSize: '13.5px' }}
											className='mb-2 text-dark'
											dangerouslySetInnerHTML={createMarkup(post.body)}
										></p>
										<small className='text-muted'>
											Posted on <TimestampComponent timestamp={post.created_at} />
										</small>
										<div style={{ marginTop: '12px' }}>
											<button style={{ fontSize: '16px' }} className='btn btn-sm btn-light'>
												<i className={`${post.reaction === 1 ? 'fas' : 'far'} fa-thumbs-up`}></i>
											</button>
											<button style={{ fontSize: '16px' }} className='btn btn-sm btn-light mx-2'>
												<i className={`${post.reaction === 0 ? 'fas' : 'far'} fa-thumbs-down`}></i>
											</button>
											<Link
												to='/posts/5fe326784snb326B'
												style={{ fontSize: '13.5px', position: 'relative' }}
												className='btn btn-sm btn-info ml-2 mr-3'
											>
												Discussions
												{post.comments > 0 ? (
													<span
														style={styles.discussionBadge}
														className='bg-dark text-light text-center'
													>
														{post.comments < 10 ? post.comments : '9+'}
													</span>
												) : null}
											</Link>
											{user && post.author_id === user.id ? (
												<button style={{ fontSize: '13.5px' }} className='btn btn-sm btn-danger'>
													<i className='far fa-trash'></i>
												</button>
											) : null}
										</div>
									</div>
								</div>
							))}
					</div>
				)}
			</div>
		</PageContainer>
	);
};

const mapStateToProps = (state) => ({
	postState: state.POSTS,
	authState: state.AUTH_STATE,
});

export default connect(mapStateToProps, { fetchPosts, addPost })(Posts);
