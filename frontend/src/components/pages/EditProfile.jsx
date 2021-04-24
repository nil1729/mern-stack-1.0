/**
 *
 * @access 	Private
 * @route  	/dashboard/profile
 * @desc  	Create or edit user profile
 *
 */

import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import {
	fetchDevProfile,
	createDevProfile,
	updateDevProfile,
} from '../../store/actions/user_profile';
import Accordion from 'react-bootstrap/Accordion';
import {
	PageContainer,
	StyledInput,
	StyledSelect,
	StyledHelperText,
	StyledTextArea,
	StyledLabel,
	GreyLinkButton,
	StyledInputGroupText,
} from '../utils/styled-components/components';
import checker from '../utils/checkFields';

function CustomToggle({ children, customOpen }) {
	return (
		<button
			type='button'
			className='btn btn-sm'
			style={{ backgroundColor: 'rgba(202, 197, 197, 0.671)' }}
			onClick={customOpen}
		>
			{children}
		</button>
	);
}

const DevProfileForm = ({
	authState: { user, isAuthenticated },
	userProfileState,
	fetchDevProfile,
	createDevProfile,
	updateDevProfile,
}) => {
	// Current State for this Component
	const [formDisable, setFormDisable] = useState(false);
	const [userInput, setUserInput] = useState({
		current_position: '',
		current_working_place_name: '',
		skills: '',
		github_username: '',
		bio: '',
		website_url: '',
		location: '',
		twitter_id: '',
		linkedin_id: '',
		instagram_id: '',
		facebook_id: '',
		youtube_channel_id: '',
	});
	const [socialLinkOpen, setSocialLinkOpen] = useState(false);

	// Initialize with values
	useEffect(() => {
		if (user && !user.new_account && userProfileState.profile === null) {
			fetchDevProfile(user.id);
			setFormDisable(true);
		}

		if (userProfileState.profile) {
			setFormDisable(false);
			let populatedFields = {};
			Object.keys(userProfileState.profile).forEach((key) => {
				if (key.endsWith('_url') && key !== 'website_url') {
					let inputKey = key.split('_url')[0].concat('_id');
					populatedFields[inputKey] =
						(userProfileState.profile[key] || '').split(socialURLs[key])[1] || '';
					if (populatedFields[inputKey].trim().length > 0) setSocialLinkOpen(true);
				} else populatedFields[key] = userProfileState.profile[key] || '';
			});
			setUserInput(populatedFields);
		}
		// eslint-disable-next-line
	}, [isAuthenticated, userProfileState.profile]);

	// Toggle Action for Social Links Accordion
	const toggleAccordion = () => setSocialLinkOpen(!socialLinkOpen);

	// Wrong User Input State
	const [wrongUserInput, setWrongUserInput] = useState({ website_url: false });

	// On change handler
	const onChange = (e) => {
		setUserInput({
			...userInput,
			[e.target.name]: e.target.value,
		});

		setWrongUserInput({
			...wrongUserInput,
			[e.target.name]: false,
		});
	};

	// Submission State
	const [submitted, setSubmitted] = useState(false);

	// Social valid URLs
	const socialURLs = {
		twitter_url: 'https://twitter.com/@',
		linkedin_url: 'https://linkedin.com/in/',
		instagram_url: 'https://instagram.com/',
		facebook_url: 'https://facebook.com/',
		youtube_channel_url: 'https://youtube.com/channel/',
	};

	// Roles for Dev Profile
	const currentRoles = [
		'Frontend Developer',
		'Backend Developer',
		'Senior Developer',
		'Student',
		'Manager',
		'Intern',
		'Instructor or Teacher',
		'Others',
	];

	// on submit handler
	const submitHandler = async (e) => {
		// prevent the default behavior of form submission
		e.preventDefault();

		let devProfileInputs = {};

		// Validate website URL
		if (userInput.website_url.trim().length !== 0 && !checker.siteURL(userInput.website_url))
			return setWrongUserInput({ ...wrongUserInput, website_url: true });

		// Take only necessary and non empty fields
		for (let key in userInput) {
			if (key.endsWith('_id')) {
				let inputKey = key.split('_id')[0].concat('_url');
				if (userInput[key].trim().length > 0)
					devProfileInputs[inputKey] = socialURLs[inputKey].concat(userInput[key].trim());
				else devProfileInputs[inputKey] = '';
			} else devProfileInputs[key] = userInput[key].trim();
		}

		setSubmitted(true);

		// call redux action with data
		if (user.new_account) await createDevProfile(user.id, devProfileInputs);
		else await updateDevProfile(user.id, devProfileInputs);

		setSubmitted(false);
	};

	return (
		<PageContainer className='container py-3 auth__container mb-5'>
			<h2 className='text-info mb-1'>
				{user && !user.new_account ? 'Edit' : 'Create'} Your Profile
			</h2>
			<p className='lead mb-4 text-capitalize' style={{ fontSize: '15.5px', fontWeight: 500 }}>
				<i className='fas fa-user-edit mr-2'></i>
				Let's get some information to make your profile stand out
			</p>

			<form style={{ fontSize: '14px' }} onSubmit={submitHandler}>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>
						Current Position<sup>*</sup>
					</StyledLabel>
					<StyledSelect
						required
						disabled={formDisable || submitted}
						onChange={onChange}
						name='current_position'
						className='form-select form-control'
						aria-label='Default select example'
						value={userInput.current_position}
					>
						{' '}
						<option disabled value=''>
							Select Professional Status
						</option>
						{currentRoles.map((role) => (
							<option key={role} value={role}>
								{role}
							</option>
						))}
					</StyledSelect>
					<StyledHelperText>Give us an idea of where you are at in your career</StyledHelperText>
				</div>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>
						Company or University<sup>*</sup>
					</StyledLabel>
					<StyledInput
						required
						onChange={onChange}
						disabled={formDisable || submitted}
						type='text'
						className='form-control'
						name='current_working_place_name'
						value={userInput.current_working_place_name}
						placeholder={formDisable ? 'Loading ...' : 'XYZ Company'}
					/>
					<StyledHelperText>Could be your own company or one you work for</StyledHelperText>
				</div>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>Website URL</StyledLabel>
					<StyledInput
						onChange={onChange}
						disabled={formDisable || submitted}
						type='url'
						pattern='https://.*'
						className={`form-control ${wrongUserInput.website_url ? 'wrong_input' : ''}`}
						name='website_url'
						value={userInput.website_url}
						placeholder={formDisable ? 'Loading ...' : 'https://nilanjandeb.me'}
					/>
					<StyledHelperText>
						Could be your own or company website (Starts with https://)
					</StyledHelperText>
				</div>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>Location</StyledLabel>
					<StyledInput
						onChange={onChange}
						disabled={formDisable || submitted}
						type='text'
						className='form-control'
						name='location'
						value={userInput.location}
						placeholder={formDisable ? 'Loading ...' : 'Rajasthan, India'}
					/>
					<StyledHelperText>City & state suggested (eg. Pilani, Rajasthan)</StyledHelperText>
				</div>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>
						Skills or Programming Languages<sup>*</sup>
					</StyledLabel>
					<StyledInput
						required
						onChange={onChange}
						disabled={formDisable || submitted}
						type='text'
						className='form-control'
						name='skills'
						value={userInput.skills}
						placeholder={formDisable ? 'Loading ...' : 'HTML, CSS, JS'}
					/>
					<StyledHelperText>
						Please use comma separated values (eg. HTML,CSS,Javascript,Python)
					</StyledHelperText>
				</div>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>Github Username</StyledLabel>
					<StyledInput
						onChange={onChange}
						disabled={formDisable || submitted}
						type='text'
						className='form-control'
						name='github_username'
						value={userInput.github_username}
						placeholder={formDisable ? 'Loading ...' : 'nil1729'}
					/>
					<StyledHelperText>
						If you want your latest repositories and a Github link, include your username.
					</StyledHelperText>
				</div>
				<div className='mb-4'>
					<StyledLabel className='form-label mb-1'>Job Description or Bio</StyledLabel>
					<StyledTextArea
						disabled={formDisable || submitted}
						rows='4'
						name='bio'
						onChange={onChange}
						value={userInput.bio}
						placeholder={formDisable ? 'Loading ...' : 'Tell us a little about yourself'}
						className='form-control'
						aria-label='With textarea'
					></StyledTextArea>
				</div>
				<Accordion className='mb-4' activeKey={socialLinkOpen ? '0' : 'NA'}>
					<CustomToggle customOpen={toggleAccordion}>
						<i className='fal fa-paperclip mr-2'></i>Add Social Network Links
					</CustomToggle>
					<Accordion.Collapse eventKey='0'>
						<div className='pt-4'>
							<div className='row align-items-center'>
								<div className='col-auto' style={{ flex: 0.1 }}>
									<label htmlFor='inputPassword6' className='col-form-label text-primary'>
										<i className='fab fa-twitter fa-2x'></i>
									</label>
								</div>
								<div className='col-auto' style={{ flex: 2 }}>
									<div className='input-group'>
										<StyledInputGroupText className='input-group-text' id='basic-addon2'>
											{socialURLs.twitter_url}
										</StyledInputGroupText>
										<StyledInput
											name='twitter_id'
											value={userInput.twitter_id}
											onChange={onChange}
											disabled={formDisable || submitted}
											type='text'
											className='form-control'
											placeholder='_nilanjandeb'
										/>
									</div>
								</div>
							</div>
							<div className='row align-items-center'>
								<div className='col-auto' style={{ flex: 0.1 }}>
									<label htmlFor='inputPassword6' className='col-form-label text-info'>
										<i className='fab fa-facebook-f fa-2x'></i>
									</label>
								</div>
								<div className='col-auto' style={{ flex: 2 }}>
									<div className='input-group'>
										<StyledInputGroupText className='input-group-text' id='basic-addon2'>
											{socialURLs.facebook_url}
										</StyledInputGroupText>
										<StyledInput
											name='facebook_id'
											value={userInput.facebook_id}
											onChange={onChange}
											disabled={formDisable || submitted}
											type='text'
											className='form-control'
											placeholder='nilanjan.deb.91'
										/>
									</div>
								</div>
							</div>
							<div className='row align-items-center'>
								<div className='col-auto' style={{ flex: 0.1 }}>
									<label htmlFor='inputPassword6' className='col-form-label text-danger'>
										<i className='fab fa-youtube fa-2x'></i>
									</label>
								</div>
								<div className='col-auto' style={{ flex: 2 }}>
									<div className='input-group'>
										<StyledInputGroupText className='input-group-text' id='basic-addon2'>
											{socialURLs.youtube_channel_url}
										</StyledInputGroupText>
										<StyledInput
											name='youtube_channel_id'
											value={userInput.youtube_channel_id}
											onChange={onChange}
											disabled={formDisable || submitted}
											type='text'
											className='form-control'
											placeholder='UC4JX40jDee_tINbkjycV4Sg'
										/>
									</div>
								</div>
							</div>
							<div className='row align-items-center'>
								<div className='col-auto' style={{ flex: 0.1 }}>
									<label htmlFor='inputPassword6' className='col-form-label text-primary'>
										<i className='fab fa-linkedin-in fa-2x'></i>
									</label>
								</div>
								<div className='col-auto' style={{ flex: 2 }}>
									<div className='input-group'>
										<StyledInputGroupText className='input-group-text' id='basic-addon2'>
											{socialURLs.linkedin_url}
										</StyledInputGroupText>
										<StyledInput
											name='linkedin_id'
											value={userInput.linkedin_id}
											onChange={onChange}
											disabled={formDisable || submitted}
											type='text'
											className='form-control'
											placeholder='nilanjan-deb'
										/>
									</div>
								</div>
							</div>
							<div className='row align-items-center'>
								<div className='col-auto' style={{ flex: 0.1 }}>
									<label htmlFor='inputPassword6' className='col-form-label text-danger'>
										<i className='fab fa-instagram fa-2x'></i>
									</label>
								</div>
								<div className='col-auto' style={{ flex: 2 }}>
									<div className='input-group'>
										<StyledInputGroupText className='input-group-text' id='basic-addon2'>
											{socialURLs.instagram_url}
										</StyledInputGroupText>
										<StyledInput
											name='instagram_id'
											value={userInput.instagram_id}
											onChange={onChange}
											disabled={formDisable || submitted}
											type='text'
											className='form-control'
											placeholder='_nil_deb'
										/>
									</div>
								</div>
							</div>
						</div>
					</Accordion.Collapse>
				</Accordion>

				<div>
					<button disabled={formDisable || submitted} type='submit' className='btn btn-info btn-sm'>
						{submitted ? (
							<>
								Loading... {'	'}
								<Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
							</>
						) : (
							<>Save</>
						)}
					</button>
					<GreyLinkButton to='/dashboard' type='submit' className='btn btn-sm ml-3'>
						<i className='far fa-arrow-left mr-2'></i>Go Back
					</GreyLinkButton>
				</div>
			</form>
		</PageContainer>
	);
};

const mapStateToProps = (state) => ({
	authState: state.AUTH_STATE,
	userProfileState: state.USER_PROFILE,
});

export default connect(mapStateToProps, { fetchDevProfile, createDevProfile, updateDevProfile })(
	DevProfileForm
);
