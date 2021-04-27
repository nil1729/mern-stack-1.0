/**
 *
 * @access 	Private
 * @route  	/dashboard/education
 * @desc  	Add new Education
 *
 */

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	PageContainer,
	StyledInput,
	StyledTextArea,
	StyledLabel,
	GreyLinkButton,
} from '../utils/styled-components/components';
import Spinner from 'react-bootstrap/Spinner';
import moment from 'moment';
import { addEducation } from '../../store/actions/user_profile';

const AddEducation = ({ addEducation, authState: { user } }) => {
	const history = useHistory();

	// set today and tomorrow date
	const today = new Date();
	const tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);
	const [maxStartDate] = useState(moment(today).format('YYYY-MM-DD'));
	const [minEndDate, setMinEndDate] = useState(moment(tomorrow).format('YYYY-MM-DD'));

	// Set Login initials Form state
	const [submitted, setSubmitted] = useState(false);
	const [userInput, setUserInput] = useState({
		school_name: '',
		degree: '',
		starting_date: maxStartDate,
		ending_date: minEndDate,
		field_of_study: '',
		program_description: '',
	});

	// Check box
	const [currentlyEnrolled, setCurrentlyEnrolled] = useState(true);
	const [wrongUserInput, setWrongUserInput] = useState({ email: false });

	// On change handler
	const onChange = (e) => {
		setWrongUserInput({
			...wrongUserInput,
			[e.target.name]: false,
		});

		// Starting date change
		if (e.target.name === 'starting_date') {
			const startDate = new Date(e.target.value);
			const nextDate = new Date(startDate);
			nextDate.setDate(nextDate.getDate() + 1);
			setMinEndDate(moment(nextDate).format('YYYY-MM-DD'));
			if (moment(startDate).format('YYYY-MM-DD') >= userInput.ending_date) {
				setUserInput({
					...userInput,
					starting_date: moment(startDate).format('YYYY-MM-DD'),
					ending_date: moment(nextDate).format('YYYY-MM-DD'),
				});
				return;
			}
		}

		// Set user input state
		setUserInput({
			...userInput,
			[e.target.name]: e.target.value,
		});
	};

	// on submit handler
	const submitHandler = async (e) => {
		// prevent the default behavior of form submission
		e.preventDefault();

		setSubmitted(true);

		let data = { ...userInput };

		if (currentlyEnrolled) delete data.ending_date;

		// call redux action with data
		const isSuccess = await addEducation(user.id, data);

		if (!isSuccess) setSubmitted(false);
		else history.push('/dashboard');
	};

	return (
		<PageContainer className='container py-4 mb-4'>
			<h2 className='text-info mb-1'>Add Your Education</h2>
			<p className='lead mb-4 text-capitalize' style={{ fontSize: '15.5px', fontWeight: 500 }}>
				<i className='fas fa-university mr-2'></i>
				Add any school/bootcamp that you have attended
			</p>

			<form style={{ fontSize: '14px' }} onSubmit={submitHandler}>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>
						School or Bootcamp<sup>*</sup>
					</StyledLabel>
					<StyledInput
						required
						disabled={submitted}
						type='text'
						className='form-control'
						onChange={onChange}
						value={userInput.school_name}
						name='school_name'
						placeholder='BITS Pilani, Pilani Campus'
					/>
				</div>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>
						Degree or Certificate<sup>*</sup>
					</StyledLabel>
					<StyledInput
						required
						disabled={submitted}
						type='text'
						className='form-control'
						onChange={onChange}
						value={userInput.degree}
						name='degree'
						placeholder='Bachelor of Engineering'
					/>
				</div>
				<div className='mb-4'>
					<StyledLabel className='form-label mb-1'>
						Field of Study<sup>*</sup>
					</StyledLabel>
					<StyledInput
						required
						disabled={submitted}
						type='text'
						className='form-control'
						onChange={onChange}
						value={userInput.field_of_study}
						name='field_of_study'
						placeholder='Computer Science'
					/>
				</div>
				<div className='mb-2'>
					<StyledLabel className='form-label mb-1'>
						Starting Date<sup>*</sup>
					</StyledLabel>
					<StyledInput
						required
						disabled={submitted}
						type='date'
						className='form-control'
						onChange={onChange}
						value={userInput.starting_date}
						name='starting_date'
						max={maxStartDate}
					/>
				</div>
				<div className='mb-4 form-check'>
					<input
						disabled={submitted}
						type='checkbox'
						className='form-check-input'
						defaultChecked={currentlyEnrolled}
						onChange={() => setCurrentlyEnrolled(!currentlyEnrolled)}
					/>
					<label className='form-check-label' htmlFor='exampleCheck1'>
						Currently Enrolled
					</label>
				</div>
				{currentlyEnrolled ? null : (
					<div className='mb-4'>
						<StyledLabel className='form-label mb-1'>
							Ending Date<sup>*</sup>
						</StyledLabel>
						<StyledInput
							disabled={submitted || currentlyEnrolled}
							type='date'
							className='form-control'
							onChange={onChange}
							value={userInput.ending_date}
							name='ending_date'
							min={minEndDate}
						/>
					</div>
				)}
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>Program Description</StyledLabel>
					<StyledTextArea
						disabled={submitted}
						rows='4'
						placeholder='Write something about your Education program'
						className='form-control'
						onChange={onChange}
						value={userInput.program_description}
						aria-label='With textarea'
						name='program_description'
					></StyledTextArea>
				</div>
				<div className='mt-4'>
					<button disabled={submitted} type='submit' className='btn btn-info btn-sm'>
						{submitted ? (
							<>
								Saving... {'	'}
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
});

export default connect(mapStateToProps, { addEducation })(AddEducation);
