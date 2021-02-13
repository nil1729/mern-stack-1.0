/**
 *
 * @access 	Public
 * @route  	/developers/:id
 * @desc  	Show a specific developer account in details
 *
 */

import React from 'react';
import styled, { css } from 'styled-components';
import {
	PageContainer,
	GreyLinkButton,
} from '../utils/styled-components/components';

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

const ViewProfile = () => {
	return (
		<PageContainer className='container mb-4 profile__container'>
			<GreyLinkButton to='/developers' className='btn my-2 btn-sm'>
				<i className='far fa-arrow-left mr-2'></i>Back to Profiles
			</GreyLinkButton>

			{/* Introduction of User Profile*/}
			<div
				style={styles.introContainer}
				className='jumbotron bg-info mb-4 text-center py-4 text-light intro__container'
			>
				<div className='mt-1'>
					<img
						style={styles.userAvatar}
						src='https://avatars3.githubusercontent.com/u/54589036?v=4'
						alt=''
					/>
				</div>
				<h2 className='mb-1 mt-2'>Nilanjan Deb</h2>
				<p className='mb-1'>
					Frontend Web Developer at Student Union Tech Team
				</p>
				<p className='mb-2'>
					<i className='fal fa-map-marker-alt mr-1'></i>
					Pilani, Rajasthan
				</p>
				<p className='social__links mb-0'>
					<SocialLink
						rel='noreferrer'
						target='_blank'
						href='https://nilanjandeb.me'
					>
						<i className='fal fa-globe'></i>
					</SocialLink>
					<SocialLink
						rel='noreferrer'
						target='_blank'
						href='https://twitter.com'
					>
						<i className='fab fa-twitter'></i>
					</SocialLink>
					<SocialLink
						rel='noreferrer'
						target='_blank'
						href='https://facebook.com'
					>
						<i className='fab fa-facebook-f'></i>
					</SocialLink>
					<SocialLink
						rel='noreferrer'
						target='_blank'
						href='https://linkedin.com'
					>
						<i className='fab fa-linkedin-in'></i>
					</SocialLink>
					<SocialLink
						rel='noreferrer'
						target='_blank'
						href='https://youtube.com'
					>
						<i className='fab fa-youtube'></i>
					</SocialLink>
					<SocialLink
						rel='noreferrer'
						target='_blank'
						href='https://github.com'
					>
						<i className='fab fa-github'></i>
					</SocialLink>
				</p>
			</div>

			{/* Basic Information of User */}
			<BasicInfo className='container text-center basic__info p-3 border'>
				<h5 className='text-primary'>Nil's Bio</h5>
				<p style={{ fontSize: '14px' }}>
					B.E.(Hons.) Computer Science | BITS Pilani, Pilani Campus | Frontend
					Web Developer at @BITS-SU-Tech-Team.
				</p>
				<hr className='bg-secondary' />
				<h5 className='text-primary'>Skill Set</h5>
				<ul className='list-group text-dark d-flex flex-row flex-wrap justify-content-center'>
					{[
						'ReactJS',
						'VueJS',
						'NodeJS',
						'MongoDB',
						'HTML',
						'CSS',
						'Python',
					].map((skill) => (
						<li
							style={styles.skillListItem}
							className='list-group-item mb-1 p-0 mx-2'
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
						<GridChildInfo
							key={id}
							last={index === [1, 2].length - 1 ? true : false}
						>
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
								<span>
									Learning new Technologies and Working on College Project
								</span>
							</GridPara>
						</GridChildInfo>
					))}
				</GridChildDiv>
				<GridChildDiv className='edu__container border p-3'>
					<h5 className='text-primary mb-3'>Education</h5>
					{[1].map((id, index) => (
						<GridChildInfo
							key={id}
							last={index === [1].length - 1 ? true : false}
						>
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
									Learn about theoretical Computer Science. eg: Object Oriented
									Programming, Discrete Mathematics etc.
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
									<a
										href='https://github.com/'
										target='_blank'
										rel='noreferrer'
									>
										food-order-app
									</a>
								</h6>
								<p style={{ fontSize: '13.3px' }}>
									Simple Food Ordering Website (NodeJS, ExpressJS, MongoDB,
									Bootstrap)
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
			</div>
		</PageContainer>
	);
};

export default ViewProfile;
