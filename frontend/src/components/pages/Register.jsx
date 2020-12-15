/**
 *
 * @access 	Public
 * @route  	/register
 * @desc  	Register page for users
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
	PageContainer,
	StyledInput,
	StyledLabel,
} from '../utils/styled-components/components';

const Register = () => {
	return (
		<PageContainer className='container py-3 auth__container'>
			<h2 className='text-info mb-1'>Sign Up</h2>
			<p
				className='lead mb-4 text-capitalize'
				style={{ fontSize: '15.5px', fontWeight: 500 }}
			>
				<i className='fal fa-user-plus mr-2'></i>
				create your account
			</p>

			<form style={{ fontSize: '14px' }}>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>
						Name<sup>*</sup>
					</StyledLabel>
					<StyledInput
						type='email'
						className='form-control'
						aria-describedby='emailHelp'
						placeholder='Nilanjan Deb'
					/>
				</div>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>
						Email Address<sup>*</sup>
					</StyledLabel>
					<StyledInput
						type='email'
						className='form-control'
						aria-describedby='emailHelp'
						placeholder='abc@example.com'
					/>
				</div>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>
						Password<sup>*</sup>
					</StyledLabel>
					<StyledInput type='password' className='form-control' />
				</div>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>
						Confirm Password<sup>*</sup>
					</StyledLabel>
					<StyledInput type='password' className='form-control' />
				</div>
				<button type='submit' className='btn btn-info btn-sm'>
					Register
				</button>
			</form>
			<p style={{ fontSize: '14px' }} className='mt-4'>
				Already have an account? <Link to='/login'>Sign in</Link>
			</p>
		</PageContainer>
	);
};
export default Register;
