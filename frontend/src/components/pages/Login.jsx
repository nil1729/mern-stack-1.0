/**
 *
 * @access 	Public
 * @route  	/login
 * @desc  	Login page for users
 *
 */

import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import {
	PageContainer,
	StyledInput,
	StyledLabel,
	StyledInputErrorMessage,
} from '../utils/styled-components/components';
import { connect } from 'react-redux';
import { signInUser } from '../../store/actions/auth';
import checker from '../utils/checkFields';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Login = ({ authState: { isAuthenticated }, signInUser, ...rest }) => {
	const history = useHistory();
	const query = useQuery();

	// Set Login initials Form state
	const [submitted, setSubmitted] = useState(false);
	const [userInput, setUserInput] = useState({ email: '', password: '' });
	const [wrongUserInput, setWrongUserInput] = useState({ email: false });

	useEffect(() => {
		if (isAuthenticated) {
			if (query.get('redirect')) {
				history.push(query.get('redirect'));
				return;
			}
			history.push('/dashboard');
		}
		// eslint-disable-next-line
	}, [isAuthenticated]);

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
		if (!validateInput(userInput.email)) return;

		setSubmitted(true);

		// call redux action with data
		const isSuccess = await signInUser(userInput);

		if (!isSuccess) setSubmitted(false);
	};

	// validate input
	const validateInput = (email) => {
		// check email
		if (!checker.email(email)) {
			setWrongUserInput({
				...wrongUserInput,
				email: true,
			});
			return false;
		}

		return true;
	};

	return (
		<PageContainer className='container py-3 auth__container'>
			<h2 className='text-info mb-1'>Sign In</h2>
			<p className='lead mb-4 text-capitalize' style={{ fontSize: '15.5px', fontWeight: 500 }}>
				<i className='fal fa-user-lock mr-2'></i>
				sign into your account
			</p>

			<form style={{ fontSize: '14px' }} onSubmit={submitHandler}>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>
						Email Address<sup>*</sup>
					</StyledLabel>
					<StyledInput
						required
						disabled={submitted}
						name='email'
						type='email'
						onChange={onChange}
						value={userInput.email}
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
						onChange={onChange}
						value={userInput.password}
						className='form-control'
					/>
				</div>
				<button type='submit' className='btn btn-info btn-sm' disabled={submitted}>
					{submitted ? (
						<>
							Loading... {'	'}
							<Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
						</>
					) : (
						<>Login</>
					)}
				</button>
			</form>
			<p style={{ fontSize: '14px' }} className='mt-4'>
				Don't have an account? <Link to='/register'>Sign Up</Link>
			</p>
		</PageContainer>
	);
};

const mapStateToProps = (state) => ({
	authState: state.AUTH_STATE,
});

export default connect(mapStateToProps, { signInUser })(Login);
