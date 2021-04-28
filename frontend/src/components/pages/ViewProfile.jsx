/**
 *
 * @access 	Public
 * @route  	/developers/:id
 * @desc  	Show a specific developer account in details
 *
 */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { PageContainer, GreyLinkButton, AvatarImage } from '../utils/styled-components/components';
import { connect } from 'react-redux';
import { fetchDeveloperProfile } from '../../store/actions/developers';
import Spinner from 'react-bootstrap/Spinner';

const SocialLink = styled.a`
	color: white;
	margin: 0 8px;
	font-size: 25px;
	transition: ease-in-out 0.3s;
	&:hover {
		color: rgba(44, 43, 43, 0.808);
	}
`;

const BadgeLink = styled.p`
	display: block;
	padding: 0;
	margin: 5px auto !important;
	font-weight: 500;
	font-size: 13px !important;
	${(props) =>
		props.grey &&
		css`
			background-color: rgba(202, 197, 197, 0.795);
			&:hover {
				background-color: rgb(202, 197, 197);
			}
		`};
`;

const BasicInfo = styled.div`
	background-color: rgba(240, 240, 240, 0.774);
	border-color: rgba(206, 198, 198, 0.897) !important;
`;

const HeaderTitleSpan = styled.span`
	font-size: 14px;
	font-weight: 500;
	margin-right: 5px;
	color: black;
`;

const GridChildDiv = styled.div`
	border-color: rgba(206, 198, 198, 0.897) !important;
	height: 100%;
`;

const GridChildInfo = styled.div`
	border-bottom: 1px solid rgba(184, 181, 181, 0.767);
	padding-bottom: 8px;
	margin-bottom: 12px;
	${(props) =>
		props.last &&
		css`
			border: 0;
			margin-bottom: 0px;
		`};
`;

const GridPara = styled.div`
	font-size: 13.5px;
	margin-bottom: 4px;
	color: #535a60;
`;

const styles = {
	userAvatar: {
		borderRadius: '50%',
		height: '28vh',
	},
	introContainer: {
		borderRadius: '0',
	},
	eduExpContainer: {
		display: 'grid',
		alignItems: 'center',
		gridTemplateColumns: 'repeat(2, 1fr)',
		gridTemplateRows: '8fr',
		gap: '1.2rem',
		marginBottom: '2rem',
	},
	skillListItem: {
		fontSize: '14px',
		background: 'transparent',
		border: 0,
	},
};

function createMarkup(body) {
	return { __html: body };
}

const ViewProfile = ({
	fetchDeveloperProfile,
	devState: { singleDeveloper, profileLoading },
	authState: { loading: authLoading },
}) => {
	const { username } = useParams();

	useEffect(() => {
		if (!authLoading) fetchDeveloperProfile(username);
		// eslint-disable-next-line
	}, [authLoading]);

	return (
		<PageContainer className='container mb-4 profile__container'>
			<GreyLinkButton to='/developers' className='btn my-2 btn-sm'>
				<i className='far fa-arrow-left mr-2'></i>Back to Profiles
			</GreyLinkButton>

			{/* Introduction of User Profile*/}
			{profileLoading || !singleDeveloper ? (
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
			) : singleDeveloper && Object.keys(singleDeveloper).length === 0 ? (
				<>
					<p className='lead text-center mt-5 bg-light'>
						We're sorry, the page you are requested could not be found.
						<br />
						Please go back to the Homepage.
					</p>
				</>
			) : (
				<>
					<div
						style={styles.introContainer}
						className='jumbotron bg-info mb-4 text-center py-4 text-light intro__container'
					>
						<div className='mt-1'>
							<AvatarImage
								name={singleDeveloper.user_profile.name}
								colorCode={singleDeveloper.user_profile.avatar_colour_code}
								imageURL={singleDeveloper.user_profile.profile_image_url}
								size='lg'
							/>
						</div>
						<h2 className='mb-1 mt-2'>{singleDeveloper.user_profile.name}</h2>
						<p className='mb-1'>
							{singleDeveloper.user_profile.current_position.toLowerCase() === 'others'
								? 'Working'
								: singleDeveloper.user_profile.current_position}{' '}
							at {singleDeveloper.user_profile.current_working_place_name}
						</p>
						{singleDeveloper.user_profile.location ? (
							<p className='mb-2'>
								<i className='fal fa-map-marker-alt mr-1'></i>
								{singleDeveloper.user_profile.location}
							</p>
						) : null}
						<p className='social__links mb-0'>
							{singleDeveloper.user_profile.website_url ? (
								<SocialLink
									rel='noreferrer'
									target='_blank'
									href={singleDeveloper.user_profile.website_url}
								>
									<i className='fal fa-globe'></i>
								</SocialLink>
							) : null}
							{singleDeveloper.user_profile.twitter_url ? (
								<SocialLink
									rel='noreferrer'
									target='_blank'
									href={singleDeveloper.user_profile.twitter_url}
								>
									<i className='fab fa-twitter'></i>
								</SocialLink>
							) : null}
							{singleDeveloper.user_profile.facebook_url ? (
								<SocialLink
									rel='noreferrer'
									target='_blank'
									href={singleDeveloper.user_profile.facebook_url}
								>
									<i className='fab fa-facebook-f'></i>
								</SocialLink>
							) : null}
							{singleDeveloper.user_profile.linkedin_url ? (
								<SocialLink
									rel='noreferrer'
									target='_blank'
									href={singleDeveloper.user_profile.linkedin_url}
								>
									<i className='fab fa-linkedin-in'></i>
								</SocialLink>
							) : null}
							{singleDeveloper.user_profile.youtube_channel_url ? (
								<SocialLink
									rel='noreferrer'
									target='_blank'
									href={singleDeveloper.user_profile.youtube_channel_url}
								>
									<i className='fab fa-youtube'></i>
								</SocialLink>
							) : null}
							{singleDeveloper.user_profile.instagram_url ? (
								<SocialLink
									rel='noreferrer'
									target='_blank'
									href={singleDeveloper.user_profile.instagram_url}
								>
									<i className='fab fa-instagram'></i>
								</SocialLink>
							) : null}
						</p>
					</div>
					{/* Basic Information of User */}
					<BasicInfo className='container text-center basic__info p-3 border'>
						{singleDeveloper.user_profile.bio.trim().length > 0 ? (
							<>
								<h5 className='text-primary'>{`${
									singleDeveloper.user_profile.name.split(' ')[0]
								}'s Bio`}</h5>
								<p
									style={{ fontSize: '14px' }}
									dangerouslySetInnerHTML={createMarkup(singleDeveloper.user_profile.bio)}
								></p>
								<hr className='bg-secondary' />
							</>
						) : null}
						<h5 className='text-primary'>Skill Set</h5>
						<ul className='list-group text-dark d-flex flex-row flex-wrap justify-content-center'>
							{singleDeveloper.user_profile.skills.split(',').map((skill) => (
								<li
									style={styles.skillListItem}
									className='list-group-item mb-1 p-0 mx-2 text-uppercase'
									key={skill}
								>
									<i className='far fa-check mr-1'></i>
									{skill}
								</li>
							))}
						</ul>
					</BasicInfo>
					{/* Education and Experience */}
					<div style={styles.eduExpContainer} className='edu__exp__container mt-4'>
						<GridChildDiv className='exp__container border p-3'>
							<h5 className='text-primary mb-3'>Experience</h5>
							{[1, 2].map((id, index) => (
								<GridChildInfo key={id} last={index === [1, 2].length - 1 ? true : false}>
									<h6 style={{ color: 'black' }} className='mb-1'>
										Student Union Tech Team
									</h6>
									<GridPara>
										26<sup>th</sup> September 2019 - Now
									</GridPara>
									<GridPara>
										<HeaderTitleSpan>Position:</HeaderTitleSpan>
										Web Developer
									</GridPara>
									<GridPara className='d-flex'>
										<HeaderTitleSpan>Description:</HeaderTitleSpan>
										<span>Learning new Technologies and Working on College Project</span>
									</GridPara>
								</GridChildInfo>
							))}
						</GridChildDiv>
						<GridChildDiv className='edu__container border p-3'>
							<h5 className='text-primary mb-3'>Education</h5>
							{[1].map((id, index) => (
								<GridChildInfo key={id} last={index === [1].length - 1 ? true : false}>
									<h6 style={{ color: 'black' }} className='mb-1'>
										BITS Pilani, Pilani Campus
									</h6>
									<GridPara>
										26<sup>th</sup> September 2019 - Now
									</GridPara>
									<GridPara>
										<HeaderTitleSpan>Degree:</HeaderTitleSpan>
										Bachelor of Engineering
									</GridPara>
									<GridPara>
										<HeaderTitleSpan>Field of Study:</HeaderTitleSpan>
										Computer Science
									</GridPara>
									<GridPara className='d-flex'>
										<HeaderTitleSpan>Description:</HeaderTitleSpan>
										<span>
											Learn about theoretical Computer Science. eg: Object Oriented Programming,
											Discrete Mathematics etc.
										</span>
									</GridPara>
								</GridChildInfo>
							))}
						</GridChildDiv>
					</div>
					{/* Github Repositories */}
					<div className='git__repo__container'>
						<h5 className='text-primary'>Github Repositories</h5>
						{[1, 2, 3, 4, 5].map((id) => (
							<div className='list-group mt-3' key={id}>
								<div className='py-2 list-group-item list-group-item-action d-flex align-items-center'>
									<div className='repo__desc' style={{ flex: 2 }}>
										<h6 className='text-info text-capitalize'>
											<a href='https://github.com/' target='_blank' rel='noreferrer'>
												food-order-app
											</a>
										</h6>
										<p style={{ fontSize: '13.3px' }}>
											Simple Food Ordering Website (NodeJS, ExpressJS, MongoDB, Bootstrap)
										</p>
									</div>
									<div className='repo__stats' style={{ flex: 0.3 }}>
										<BadgeLink className='btn btn-info'>Stars: 1</BadgeLink>
										<BadgeLink className='btn btn-dark'>Watchers: 2</BadgeLink>
										<BadgeLink grey className='btn text-dark'>
											Forks: 1
										</BadgeLink>
									</div>
								</div>
							</div>
						))}
					</div>{' '}
				</>
			)}
		</PageContainer>
	);
};

const mapStateToProps = (state) => ({
	devState: state.DEVELOPER_STATE,
	authState: state.AUTH_STATE,
});

export default connect(mapStateToProps, { fetchDeveloperProfile })(ViewProfile);
