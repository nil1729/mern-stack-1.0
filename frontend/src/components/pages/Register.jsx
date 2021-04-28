/**
 *
 * @access 	Public
 * @route  	/register
 * @desc  	Register page for users
 *
 */

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import {
	PageContainer,
	StyledInput,
	StyledLabel,
	StyledInputErrorMessage,
} from '../utils/styled-components/components';
import { connect } from 'react-redux';
import { signUpUser } from '../../store/actions/auth';
import checker from '../utils/checkFields';

const Register = ({ signUpUser, authState: { isAuthenticated } }) => {
	const history = useHistory();

	useEffect(() => {
		if (isAuthenticated) history.push('/dashboard');
		// eslint-disable-next-line
	}, [isAuthenticated]);

	// Set Login initials Form state
	const [submitted, setSubmitted] = useState(false);
	const [userInput, setUserInput] = useState({
		email: '',
		password: '',
		confirm_password: '',
		first_name: '',
		last_name: '',
	});
	const [wrongUserInput, setWrongUserInput] = useState({
		email: false,
		password: false,
		first_name: false,
		last_name: false,
		confirm_password: false,
	});

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

	// on submit handler
	const submitHandler = async (e) => {
		// prevent the default behavior of form submission
		e.preventDefault();

		// Validate email and password strength
		if (
			!validateInput(
				userInput.first_name.trim(),
				userInput.last_name.trim(),
				userInput.email,
				userInput.password
			)
		)
			return;

		// Password Confirmation
		if (userInput.password !== userInput.confirm_password)
			return setWrongUserInput({ ...wrongUserInput, confirm_password: true });

		// create user registration data
		let userRegistrationData = {
			name: `${userInput.first_name.trim()} ${userInput.last_name.trim()}`,
			email: userInput.email,
			password: userInput.password,
		};

		setSubmitted(true);

		// call redux action with data
		const isSuccess = await signUpUser(userRegistrationData);

		if (!isSuccess) setSubmitted(false);
	};

	// validate input
	const validateInput = (first_name, last_name, email, password) => {
		// check first_name
		if (!checker.alphabetic(first_name)) {
			setWrongUserInput({
				...wrongUserInput,
				first_name: true,
			});
			return false;
		}

		// check last_name
		if (!checker.alphabetic(last_name)) {
			setWrongUserInput({
				...wrongUserInput,
				last_name: true,
			});
			return false;
		}

		// check email
		if (!checker.email(email)) {
			setWrongUserInput({
				...wrongUserInput,
				email: true,
			});
			return false;
		}

		// check password strength
		if (!checker.password(password)) {
			setWrongUserInput({
				...wrongUserInput,
				password: true,
			});
			return false;
		}

		return true;
	};

	return (
		<PageContainer className='container py-3 auth__container'>
			<h2 className='text-info mb-1'>Sign Up</h2>
			<p className='lead mb-4 text-capitalize' style={{ fontSize: '15.5px', fontWeight: 500 }}>
				<i className='fal fa-user-plus mr-2'></i>
				create your account
			</p>

			<form style={{ fontSize: '14px' }} onSubmit={submitHandler}>
				<div className='mb-3'>
					<div className='row'>
						<div className='col'>
							<StyledLabel className='form-label mb-1'>
								First Name<sup>*</sup>
							</StyledLabel>
							<StyledInput
								required
								disabled={submitted}
								name='first_name'
								type='text'
								value={userInput.first_name}
								onChange={onChange}
								className={`form-control ${wrongUserInput.first_name ? 'wrong_input' : ''}`}
								placeholder='Nilanjan'
							/>{' '}
							{wrongUserInput.first_name ? (
								<StyledInputErrorMessage>
									Please use only english alphabetic characters
								</StyledInputErrorMessage>
							) : (
								<></>
							)}
						</div>
						<div className='col'>
							<StyledLabel className='form-label mb-1'>
								Last Name<sup>*</sup>
							</StyledLabel>
							<StyledInput
								required
								disabled={submitted}
								name='last_name'
								type='text'
								value={userInput.last_name}
								onChange={onChange}
								className={`form-control ${wrongUserInput.last_name ? 'wrong_input' : ''}`}
								placeholder='Deb'
							/>{' '}
							{wrongUserInput.last_name ? (
								<StyledInputErrorMessage>
									Please use only english alphabetic characters
								</StyledInputErrorMessage>
							) : (
								<></>
							)}
						</div>
					</div>
				</div>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>
						Email Address<sup>*</sup>
					</StyledLabel>
					<StyledInput
						required
						disabled={submitted}
						name='email'
						type='email'
						value={userInput.email}
						onChange={onChange}
						className={`form-control ${wrongUserInput.email ? 'wrong_input' : ''}`}
						aria-describedby='emailHelp'
						placeholder='abc@example.com'
					/>
					{wrongUserInput.email ? (
						<StyledInputErrorMessage>Please provide a valid email address</StyledInputErrorMessage>
					) : (
						<></>
					)}
				</div>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>
						Password<sup>*</sup>
					</StyledLabel>
					<StyledInput
						required
						disabled={submitted}
						name='password'
						type='password'
						value={userInput.password}
						onChange={onChange}
						className={`form-control ${wrongUserInput.password ? 'wrong_input' : ''}`}
					/>
					{wrongUserInput.password ? (
						<StyledInputErrorMessage>
							Please use a password with minimum 8 characters. Contains at least 1 symbol, 1
							uppercase, 1 number, 1 lowercase{' '}
						</StyledInputErrorMessage>
					) : (
						<></>
					)}
				</div>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>
						Confirm Password<sup>*</sup>
					</StyledLabel>
					<StyledInput
						disabled={submitted}
						required
						name='confirm_password'
						value={userInput.confirm_password}
						onChange={onChange}
						type='password'
						className='form-control'
					/>
					{wrongUserInput.confirm_password ? (
						<StyledInputErrorMessage>Please make sure your password match</StyledInputErrorMessage>
					) : (
						<></>
					)}
				</div>
				<button disabled={submitted} type='submit' className='btn btn-info btn-sm'>
					{submitted ? (
						<>
							Loading... {'	'}
							<Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
						</>
					) : (
						<>Register</>
					)}
				</button>
			</form>
			<p style={{ fontSize: '14px' }} className='mt-4'>
				Already have an account? <Link to='/login'>Sign in</Link>
			</p>
		</PageContainer>
	);
};
const mapStateToProps = (state) => ({
	authState: state.AUTH_STATE,
});

export default connect(mapStateToProps, { signUpUser })(Register);
