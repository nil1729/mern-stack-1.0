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
	const [userInput, setUserInput] = useState({ email: '', password: '', name: '' });
	const [wrongUserInput, setWrongUserInput] = useState({
		email: false,
		password: false,
		name: false,
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
		if (!validateInput(userInput.name, userInput.email, userInput.password)) return;

		setSubmitted(true);

		// call redux action with data
		await signUpUser(userInput);

		setSubmitted(false);
	};

	// validate input
	const validateInput = (name, email, password) => {
		// check name
		if (!checker.alphabetic(name)) {
			setWrongUserInput({
				...wrongUserInput,
				name: true,
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
					<StyledLabel className='form-label mb-1'>
						Name<sup>*</sup>
					</StyledLabel>
					<StyledInput
						disabled={submitted}
						name='name'
						type='text'
						value={userInput.name}
						onChange={onChange}
						className={`form-control ${wrongUserInput.name ? 'wrong_input' : ''}`}
						placeholder='Nilanjan Deb'
					/>
					{wrongUserInput.name ? (
						<StyledInputErrorMessage>
							Please provide a Name with only alphabetic characters
						</StyledInputErrorMessage>
					) : (
						<></>
					)}
				</div>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>
						Email Address<sup>*</sup>
					</StyledLabel>
					<StyledInput
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
					<StyledInput type='password' className='form-control' />
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
