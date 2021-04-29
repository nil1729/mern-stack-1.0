/**
 *
 * @access 	Public
 * @route  	/login
 * @desc  	Login page for users
 *
 */

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
	PageContainer,
	StyledTextArea,
	GreyLinkButton,
	TimestampComponent,
	StyledInputErrorMessage,
	AvatarImage,
} from '../utils/styled-components/components';
import { connect } from 'react-redux';
import {
	getSinglePostWithComments,
	addComment,
	deleteCommentFromAccount,
	postReaction,
	deletePostFromAccount,
} from '../../store/actions/posts';
import Spinner from 'react-bootstrap/Spinner';

function createMarkup(body) {
	return { __html: body };
}

const ViewPost = ({
	getSinglePostWithComments,
	addComment,
	deleteCommentFromAccount,
	postReaction,
	deletePostFromAccount,
	authState: { user, isAuthenticated },
	postState: { singlePost },
}) => {
	const history = useHistory();
	const { postID } = useParams();
	const [currentPost, setCurrentPost] = useState(null);
	const [comments, setComments] = useState(null);
	const [newCommentBody, setNewCommentBody] = useState('');
	const [commentError, setCommentError] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	useEffect(() => {
		if (user && !singlePost.postDetails) {
			getSinglePostWithComments(postID);
		} else if (
			user &&
			singlePost.postDetails &&
			String(singlePost.postDetails.post.id) !== postID
		) {
			getSinglePostWithComments(postID);
		} else if (
			user &&
			singlePost.postDetails.post &&
			String(singlePost.postDetails.post.id) === postID &&
			Object.keys(singlePost.postDetails.post).length > 1
		) {
			setCurrentPost(singlePost.postDetails.post);
			setComments(singlePost.postDetails.comments);
		}
		// eslint-disable-next-line
	}, [isAuthenticated, singlePost.postDetails]);

	// Submit Handling
	const submitHandler = async (e) => {
		e.preventDefault();

		if (newCommentBody.trim().length === 0) {
			setNewCommentBody('');
			setCommentError(true);
			return;
		}

		setSubmitted(true);
		const isSuccess = await addComment(currentPost.id, { body: newCommentBody.trim() });
		if (isSuccess) setNewCommentBody('');
		setSubmitted(false);
	};

	// Deleting Comment
	const deleteComment = (id) => async () => {
		setComments(
			comments &&
				comments.map((it) => {
					if (it.id === id) return { ...it, deleting: true };
					return it;
				})
		);
		await deleteCommentFromAccount(currentPost.id, id);
	};

	const reactOnPost = (like) => async () => {
		setCurrentPost({ ...currentPost, reacting: true });
		await postReaction(currentPost.id, like);
	};

	const deleteCurrentPost = async () => {
		setCurrentPost({ ...currentPost, deleting: true });
		await deletePostFromAccount(currentPost.id);
		history.push('/posts');
	};

	return (
		<PageContainer className='container py-3 auth__container mb-5'>
			<GreyLinkButton to='/posts' className='btn my-2 btn-sm'>
				<i className='far fa-arrow-left mr-2'></i>Back to Posts
			</GreyLinkButton>
			{singlePost.loading || !singlePost.postDetails ? (
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
			) : !currentPost ? (
				<p className='lead text-center mt-5'>
					We're sorry, the page you are requested could not be found.
					<br />
					Please go back to the Homepage.
				</p>
			) : (
				<>
					<div className='mt-2 mb-4'>
						<div className='list-group'>
							<div className='py-3 list-group-item d-flex align-items-center justify-content-evenly'>
								<div className='text-center'>
									<AvatarImage
										name={currentPost.author_name}
										colorCode={currentPost.author_avatar_color}
										imageURL={currentPost.author_dp_url}
									/>
									<h6
										className='mt-2 text-primary text-capitalize'
										style={{ whiteSpace: 'nowrap' }}
									>
										{currentPost.author_name.length > 12
											? currentPost.author_name.substr(0, 12).concat('...')
											: currentPost.author_name}
									</h6>
								</div>
								<div style={{ flex: 1.5 }} className='ml-5'>
									<p
										style={{ fontSize: '13px', whiteSpace: 'pre' }}
										className='mb-2 text-dark'
										dangerouslySetInnerHTML={createMarkup(currentPost.body)}
									></p>
									<small className='text-muted'>
										Posted on <TimestampComponent timestamp={currentPost.created_at} />
									</small>
									<div style={{ marginTop: '12px' }}>
										<button
											onClick={reactOnPost(true)}
											disabled={
												(user && user.new_account) || currentPost.deleting || currentPost.reacting
											}
											style={{ fontSize: '16px' }}
											className='btn btn-sm btn-light'
										>
											<i
												className={`${currentPost.reaction === 1 ? 'fas' : 'far'} fa-thumbs-up`}
											></i>
										</button>
										<button
											onClick={reactOnPost(false)}
											disabled={
												(user && user.new_account) || currentPost.deleting || currentPost.reacting
											}
											style={{ fontSize: '16px' }}
											className='btn btn-sm btn-light mx-2'
										>
											<i
												className={`${currentPost.reaction === 0 ? 'fas' : 'far'} fa-thumbs-down`}
											></i>
										</button>
										<button
											onClick={deleteCurrentPost}
											disabled={currentPost.deleting}
											style={{ fontSize: '13px' }}
											className='btn btn-sm btn-danger'
										>
											{currentPost.deleting ? (
												<>
													Removing... {'	'}
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
													<i className='fas fa-trash mr-2'></i> Remove
												</>
											)}{' '}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<p className='lead bg-info px-2 py-1 text-light'>Leave a Comment</p>
					{user && !user.new_account ? (
						<form style={{ fontSize: '14px' }} onSubmit={submitHandler}>
							<StyledTextArea
								disabled={submitted || currentPost.deleting}
								value={newCommentBody}
								onChange={(e) => {
									setNewCommentBody(e.target.value);
									setCommentError(false);
								}}
								rows='4'
								placeholder='Write a comment for this post'
								className='form-control mb-1'
								aria-label='With textarea'
							></StyledTextArea>
							{commentError ? (
								<StyledInputErrorMessage className='d-block' style={{ fontSize: '0.85rem' }}>
									Please write some text to add new comment
								</StyledInputErrorMessage>
							) : null}
							<button
								disabled={submitted || currentPost.deleting}
								type='submit'
								className='btn btn-dark btn-sm mt-1'
							>
								{submitted ? (
									<>
										Adding... {'	'}
										<Spinner
											as='span'
											animation='border'
											size='sm'
											role='status'
											aria-hidden='true'
										/>
									</>
								) : (
									<>Add Comment</>
								)}
							</button>
						</form>
					) : (
						<p className='bg-light px-2 py-1 text-primary text-center' style={{ fontSize: '17px' }}>
							Kindly create your developer profile first
						</p>
					)}
					<div className='mt-4'>
						<div className='list-group'>
							{!comments || (comments && comments.length === 0) ? (
								<p className='text-center lead'>
									This post didn't have any comments yet. You can add new comment here!
								</p>
							) : (
								comments &&
								comments.map((comment) => (
									<div
										key={comment.id}
										className='py-3 list-group-item d-flex align-items-center justify-content-evenly border-top mb-3'
									>
										<div className='text-center' style={{ flex: 0.25 }}>
											<AvatarImage
												name={comment.author_name}
												colorCode={comment.author_avatar_color}
												imageURL={comment.author_dp_url}
												size='sm'
											/>
											<p
												className='mt-1 text-secondary mb-0 text-capitalize'
												style={{ whiteSpace: 'nowrap' }}
											>
												{comment.author_name.length > 10
													? comment.author_name.substr(0, 10).concat('...')
													: comment.author_name}
											</p>
										</div>
										<div style={{ flex: 1.5 }} className='ml-5'>
											<p
												style={{ fontSize: '13px', whiteSpace: 'pre' }}
												className='mb-2 text-dark'
												dangerouslySetInnerHTML={createMarkup(comment.body)}
											></p>
											<small className='text-muted'>
												Posted on <TimestampComponent timestamp={comment.created_at} />{' '}
											</small>
											<>
												<style type='text/css'>
													{`
														.delete_btn_container {
															position: absolute;
															top: 5px;
															right: 5px;
														}
													`}
												</style>
												<div className='delete_btn_container'>
													{comment.author_id === user.id ? (
														<button
															onClick={deleteComment(comment.id)}
															disabled={comment.deleting || currentPost.deleting}
															style={{ fontSize: '13px' }}
															className='btn btn-sm btn-danger'
														>
															{comment.deleting ? (
																<Spinner
																	as='span'
																	animation='border'
																	size='sm'
																	role='status'
																	aria-hidden='true'
																/>
															) : (
																<i className='far fa-trash'></i>
															)}
														</button>
													) : null}
												</div>
											</>
										</div>
									</div>
								))
							)}
						</div>
					</div>
				</>
			)}
		</PageContainer>
	);
};

const mapStateToProps = (state) => ({
	postState: state.POSTS,
	authState: state.AUTH_STATE,
});

export default connect(mapStateToProps, {
	getSinglePostWithComments,
	addComment,
	deleteCommentFromAccount,
	postReaction,
	deletePostFromAccount,
})(ViewPost);
