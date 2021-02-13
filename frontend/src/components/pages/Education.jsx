/**
 *
 * @access 	Public
 * @route  	/dashboard/experience
 * @desc  	Add new experience
 *
 */

import React from 'react';
import {
	PageContainer,
	StyledInput,
	StyledTextArea,
	StyledLabel,
	GreyLinkButton,
} from '../utils/styled-components/components';

const Login = () => {
	return (
		<PageContainer className='container py-4 mb-4'>
			<h2 className='text-info mb-1'>Add Your Education</h2>
			<p
				className='lead mb-4 text-capitalize'
				style={{ fontSize: '15.5px', fontWeight: 500 }}
			>
				<i class='fas fa-university mr-2'></i>
				Add any school/bootcamp that you have attended
			</p>

			<form style={{ fontSize: '14px' }}>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>
						School or Bootcamp<sup>*</sup>
					</StyledLabel>
					<StyledInput
						type='text'
						className='form-control'
						aria-describedby='emailHelp'
						placeholder='BITS Pilani, Pilani Campus'
					/>
				</div>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>
						Degree or Certificate<sup>*</sup>
					</StyledLabel>
					<StyledInput
						type='password'
						className='form-control'
						id='exampleInputPassword1'
						placeholder='Bachelor of Engineering'
					/>
				</div>
				<div className='mb-4'>
					<StyledLabel className='form-label mb-1'>Field of Study</StyledLabel>
					<StyledInput
						type='text'
						className='form-control'
						aria-describedby='emailHelp'
						placeholder='Computer Science'
					/>
				</div>
				<div className='mb-2'>
					<StyledLabel className='form-label mb-1'>
						Starting Date<sup>*</sup>
					</StyledLabel>
					<StyledInput type='date' className='form-control' />
				</div>
				<div className='mb-4 form-check'>
					<input type='checkbox' className='form-check-input' />
					<label className='form-check-label' htmlFor='exampleCheck1'>
						Currently Enrolled
					</label>
				</div>
				<div className='mb-4'>
					<StyledLabel className='form-label mb-1'>
						Ending Date<sup>*</sup>
					</StyledLabel>
					<StyledInput type='date' className='form-control' />
				</div>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>
						Program Description
					</StyledLabel>
					<StyledTextArea
						rows='4'
						placeholder='Write something about your Education program'
						className='form-control'
						aria-label='With textarea'
					></StyledTextArea>
				</div>
				<div className='mt-4'>
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
