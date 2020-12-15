/**
 *
 * @access 	Public
 * @route  	/dashboard/profile
 * @desc  	Create or edit user profile
 *
 */

import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import {
	PageContainer,
	StyledInput,
	StyledSelect,
	StyledHelperText,
	StyledTextArea,
	StyledLabel,
	GreyLinkButton,
} from '../utils/styled-components/components';

function CustomToggle({ children, eventKey }) {
	const decoratedOnClick = useAccordionToggle(eventKey, () =>
		console.log('totally custom!')
	);

	return (
		<button
			type='button'
			className='btn btn-sm'
			style={{ backgroundColor: 'rgba(202, 197, 197, 0.671)' }}
			onClick={decoratedOnClick}
		>
			{children}
		</button>
	);
}

const Login = () => {
	return (
		<PageContainer className='container py-3 auth__container mb-5'>
			<h2 className='text-info mb-1'>Create Your Profile</h2>
			<p
				className='lead mb-4 text-capitalize'
				style={{ fontSize: '15.5px', fontWeight: 500 }}
			>
				<i className='fas fa-user-edit mr-2'></i>
				Let's get some information to make your profile stand out
			</p>

			<form style={{ fontSize: '14px' }}>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>
						Current Position<sup>*</sup>
					</StyledLabel>
					<StyledSelect
						className='form-select form-control'
						aria-label='Default select example'
					>
						<option defaultValue>Select Professional Status</option>
						<option value={1}>Frontend Developer</option>
						<option value={12}>Backend Developer</option>
						<option value={13}>Senior Developer</option>
						<option value={14}>Student</option>
						<option value={15}>Manager</option>
						<option value={16}>Intern</option>
						<option value={17}>Instructor or Teacher</option>
					</StyledSelect>
					<StyledHelperText>
						Give us an idea of where you are at in your career
					</StyledHelperText>
				</div>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>
						Company or University<sup>*</sup>
					</StyledLabel>
					<StyledInput
						type='text'
						className='form-control'
						aria-describedby='emailHelp'
						placeholder='XYZ Company'
					/>
					<StyledHelperText>
						Could be your own company or one you work for
					</StyledHelperText>
				</div>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>
						Website URL<sup>*</sup>
					</StyledLabel>
					<StyledInput
						type='text'
						className='form-control'
						aria-describedby='emailHelp'
						placeholder='www.nilanjandeb.me'
					/>
					<StyledHelperText>
						Could be your own or company website
					</StyledHelperText>
				</div>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>
						Website URL<sup>*</sup>
					</StyledLabel>
					<StyledInput
						type='text'
						className='form-control'
						aria-describedby='emailHelp'
						placeholder='www.nilanjandeb.me'
					/>
					<StyledHelperText>
						Could be your own or company website
					</StyledHelperText>
				</div>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>
						Location<sup>*</sup>
					</StyledLabel>
					<StyledInput
						type='text'
						className='form-control'
						aria-describedby='emailHelp'
						placeholder='Rajasthan, India'
					/>
					<StyledHelperText>
						City & state suggested (eg. Pilani, Rajasthan)
					</StyledHelperText>
				</div>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>
						Location<sup>*</sup>
					</StyledLabel>
					<StyledInput
						type='text'
						className='form-control'
						aria-describedby='emailHelp'
						placeholder='HTML, CSS, JS'
					/>
					<StyledHelperText>
						Please use comma separated values (eg. HTML,CSS,Javascript,Python)
					</StyledHelperText>
				</div>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>
						Github Username<sup>*</sup>
					</StyledLabel>
					<StyledInput
						type='text'
						className='form-control'
						aria-describedby='emailHelp'
						placeholder='nil1729'
					/>
					<StyledHelperText>
						If you want your latest repositories and a Github link, include your
						username.
					</StyledHelperText>
				</div>
				<div className='mb-4'>
					<StyledLabel className='form-label mb-1'>Job Description</StyledLabel>
					<StyledTextArea
						rows='4'
						placeholder='Tell us a little about yourself'
						className='form-control'
						aria-label='With textarea'
					></StyledTextArea>
				</div>
				<Accordion className='mb-4'>
					<CustomToggle eventKey='0'>
						<i className='fal fa-paperclip mr-2'></i>Add Social Network Links
					</CustomToggle>
					<Accordion.Collapse eventKey='0'>
						<div className='pt-4'>
							<div className='row align-items-center'>
								<div className='col-auto' style={{ flex: 0.1 }}>
									<label
										htmlFor='inputPassword6'
										className='col-form-label text-primary'
									>
										<i className='fab fa-twitter fa-2x'></i>
									</label>
								</div>
								<div className='col-auto' style={{ flex: 2 }}>
									<StyledInput
										type='url'
										className='form-control'
										aria-describedby='passwordHelpInline'
										placeholder='https://twitter.com/@nil1729'
									/>
								</div>
							</div>
							<div className='row align-items-center'>
								<div className='col-auto' style={{ flex: 0.1 }}>
									<label
										htmlFor='inputPassword6'
										className='col-form-label text-info'
									>
										<i className='fab fa-facebook-f fa-2x'></i>
									</label>
								</div>
								<div className='col-auto' style={{ flex: 2 }}>
									<StyledInput
										type='url'
										className='form-control'
										aria-describedby='passwordHelpInline'
										placeholder='https://facebook.com/nil1729'
									/>
								</div>
							</div>
							<div className='row align-items-center'>
								<div className='col-auto' style={{ flex: 0.1 }}>
									<label
										htmlFor='inputPassword6'
										className='col-form-label text-danger'
									>
										<i className='fab fa-youtube fa-2x'></i>
									</label>
								</div>
								<div className='col-auto' style={{ flex: 2 }}>
									<StyledInput
										type='url'
										className='form-control'
										aria-describedby='passwordHelpInline'
										placeholder='https://youtube.com/<channelname>'
									/>
								</div>
							</div>
							<div className='row align-items-center'>
								<div className='col-auto' style={{ flex: 0.1 }}>
									<label
										htmlFor='inputPassword6'
										className='col-form-label text-primary'
									>
										<i className='fab fa-linkedin-in fa-2x'></i>
									</label>
								</div>
								<div className='col-auto' style={{ flex: 2 }}>
									<StyledInput
										type='url'
										className='form-control'
										aria-describedby='passwordHelpInline'
										placeholder='https://linkedin.com/in/nil1729'
									/>
								</div>
							</div>
							<div className='row align-items-center'>
								<div className='col-auto' style={{ flex: 0.1 }}>
									<label
										htmlFor='inputPassword6'
										className='col-form-label text-danger'
									>
										<i className='fab fa-instagram fa-2x'></i>
									</label>
								</div>
								<div className='col-auto' style={{ flex: 2 }}>
									<StyledInput
										type='url'
										className='form-control'
										aria-describedby='passwordHelpInline'
										placeholder='https://instagram.com/nil1729'
									/>
								</div>
							</div>
						</div>
					</Accordion.Collapse>
				</Accordion>

				<div>
					<button type='submit' className='btn btn-info btn-sm'>
						Submit
					</button>
					<GreyLinkButton
						to='/dashboard'
						type='submit'
						className='btn btn-sm ml-3'
					>
						<i className='far fa-arrow-left mr-2'></i>Go Back
					</GreyLinkButton>
				</div>
			</form>
		</PageContainer>
	);
};
export default Login;
