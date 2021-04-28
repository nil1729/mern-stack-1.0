/**
 *
 * @access 	Public
 * @route  	/login
 * @desc  	Login page for users
 *
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	PageContainer,
	StyledTextArea,
	StyledInputErrorMessage,
	AvatarImage,
} from '../utils/styled-components/components';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import {
	fetchPosts,
	addPost,
	deletePostFromAccount,
	postReaction,
} from '../../store/actions/posts';
import moment from 'moment';

const styles = {
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

const Posts = ({
	fetchPosts,
	addPost,
	deletePostFromAccount,
	postReaction,
	postState,
	authState: { isAuthenticated, user },
}) => {
	const [posts, setPosts] = useState(null);
	const [newPostBody, setNewPostBody] = useState('');
	const [postError, setPostError] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	useEffect(() => {
		if (user && postState.posts === null) fetchPosts();
		if (user && postState.posts) setPosts(postState.posts);
		// eslint-disable-next-line
	}, [isAuthenticated, postState]);

	// Submit Handling
	const submitHandler = async (e) => {
		e.preventDefault();
		if (newPostBody.trim().length === 0) {
			setNewPostBody('');
			setPostError(true);
			return;
		}
		setSubmitted(true);
		const isSuccess = await addPost({ body: newPostBody.trim() });
		if (isSuccess) setNewPostBody('');
		setSubmitted(false);
	};

	const deletePost = (id) => async () => {
		setPosts(
			posts.map((it) => {
				if (it.id === id) return { ...it, deleting: true };
				return it;
			})
		);
		await deletePostFromAccount(id);
	};

	const reactOnPost = (id, like) => async () => {
		setPosts(
			posts.map((it) => {
				if (it.id === id) return { ...it, reacting: true };
				return it;
			})
		);
		await postReaction(id, like);
	};

	return (
		<PageContainer className='container py-3 auth__container'>
			<h2 className='text-info mb-1'>Posts</h2>
			<p className='lead mb-3 text-capitalize' style={{ fontSize: '15.5px', fontWeight: 500 }}>
				<i className='fas fa-users mr-2'></i>
				Welcome to the community
			</p>
			<p className='lead bg-info px-2 py-1 text-light'>Say Something ...</p>
			{user && !user.new_account ? (
				<>
					<form style={{ fontSize: '14px' }} onSubmit={submitHandler}>
						<StyledTextArea
							disabled={submitted}
							required
							rows='4'
							placeholder='Create a New Post ...'
							className='form-control mb-1'
							aria-label='With textarea'
							value={newPostBody}
							onChange={(e) => {
								setNewPostBody(e.target.value);
								setPostError(false);
							}}
						></StyledTextArea>
						{postError ? (
							<StyledInputErrorMessage className='d-block' style={{ fontSize: '0.85rem' }}>
								Please add some text to add new post
							</StyledInputErrorMessage>
						) : null}
						<button disabled={submitted} type='submit' className='btn btn-dark btn-sm mt-2'>
							{submitted ? (
								<>
									Posting... {'	'}
									<Spinner
										as='span'
										animation='border'
										size='sm'
										role='status'
										aria-hidden='true'
									/>
								</>
							) : (
								<>Create</>
							)}
						</button>
					</form>
				</>
			) : (
				<>
					<p className='bg-light px-2 py-1 text-primary text-center' style={{ fontSize: '17px' }}>
						Kindly create your developer profile first
					</p>
				</>
			)}
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
									<div className='text-center' style={{ flex: 0.25 }}>
										<AvatarImage
											size='sm'
											name={post.author_name}
											colorCode={post.author_avatar_color}
											imageURL={post.author_dp_url}
										/>
										<h6
											className='mt-2 text-primary text-capitalize'
											style={{ whiteSpace: 'nowrap' }}
										>
											{post.author_name.length > 10
												? post.author_name.substr(0, 10).concat('...')
												: post.author_name}
										</h6>
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
											<button
												onClick={reactOnPost(post.id, true)}
												disabled={(user && user.new_account) || post.deleting || post.reacting}
												style={{ fontSize: '16px' }}
												className='btn btn-sm btn-light'
											>
												<i className={`${post.reaction === 1 ? 'fas' : 'far'} fa-thumbs-up`}></i>
											</button>
											<button
												onClick={reactOnPost(post.id, false)}
												disabled={(user && user.new_account) || post.deleting || post.reacting}
												style={{ fontSize: '16px' }}
												className='btn btn-sm btn-light mx-2'
											>
												<i className={`${post.reaction === 0 ? 'fas' : 'far'} fa-thumbs-down`}></i>
											</button>
											<Link
												to={`/posts/${post.id}`}
												style={{ fontSize: '13.5px', position: 'relative' }}
												className={`btn btn-sm btn-info ml-2 mr-3 ${
													post.deleting ? 'disabled' : ''
												}`}
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
												<button
													disabled={post.deleting}
													style={{ fontSize: '13.5px' }}
													className='btn btn-sm btn-danger'
													onClick={deletePost(post.id)}
												>
													{post.deleting ? (
														<>
															Deleting... {'	'}
															<Spinner
																as='span'
																animation='border'
																size='sm'
																role='status'
																aria-hidden='true'
															/>
														</>
													) : (
														<>
															<i className='far fa-trash'></i>
														</>
													)}{' '}
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

export default connect(mapStateToProps, {
	fetchPosts,
	addPost,
	deletePostFromAccount,
	postReaction,
})(Posts);
