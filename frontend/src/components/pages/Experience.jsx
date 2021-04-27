/**
 *
 * @access 	Public
 * @route  	/dashboard/experience
 * @desc  	Add new experience
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
import { addExperience } from '../../store/actions/user_profile';

const AddExperience = ({ authState: { user }, addExperience }) => {
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
		company_name: '',
		job_title: '',
		starting_date: maxStartDate,
		ending_date: minEndDate,
		location: '',
		job_description: '',
	});

	// Check box
	const [currentJob, setCurrentJob] = useState(true);
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

		if (currentJob) delete data.ending_date;

		// call redux action with data
		const isSuccess = await addExperience(user.id, data);

		if (!isSuccess) setSubmitted(false);
		else history.push('/dashboard');
	};

	return (
		<PageContainer className='container py-4 mb-4'>
			<h2 className='text-info mb-1'>Add an Experience</h2>
			<p className='lead mb-4 text-capitalize' style={{ fontSize: '15.5px', fontWeight: 500 }}>
				<i className='fas fa-code-branch mr-2'></i>
				Add any developer/programming positions that you have in the past
			</p>

			<form style={{ fontSize: '14px' }} onSubmit={submitHandler}>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>
						Job Title<sup>*</sup>
					</StyledLabel>
					<StyledInput
						required
						disabled={submitted}
						type='text'
						className='form-control'
						name='job_title'
						value={userInput.job_title}
						onChange={onChange}
						placeholder='Frontend Developer'
					/>
				</div>
				<div className='mb-3'>
					<StyledLabel className='form-label mb-1'>
						Company<sup>*</sup>
					</StyledLabel>
					<StyledInput
						required
						disabled={submitted}
						type='text'
						className='form-control'
						name='company_name'
						value={userInput.company_name}
						onChange={onChange}
						placeholder='ABC Company'
					/>
				</div>
				<div className='mb-4'>
					<StyledLabel className='form-label mb-1'>Location</StyledLabel>
					<StyledInput
						disabled={submitted}
						type='text'
						className='form-control'
						name='location'
						value={userInput.location}
						onChange={onChange}
						placeholder='Delhi, India'
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
						type='checkbox'
						className='form-check-input'
						defaultChecked={currentJob}
						onChange={() => setCurrentJob(!currentJob)}
					/>
					<label className='form-check-label' htmlFor='exampleCheck1'>
						Ongoing Job
					</label>
				</div>
				{currentJob ? null : (
					<div className='mb-4'>
						<StyledLabel className='form-label mb-1'>
							Ending Date<sup>*</sup>
						</StyledLabel>
						<StyledInput
							disabled={submitted || currentJob}
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
					<StyledLabel className='form-label mb-1'>Job Description</StyledLabel>
					<StyledTextArea
						rows='4'
						placeholder='Write something about your Job / Experience'
						className='form-control'
						onChange={onChange}
						value={userInput.job_description}
						aria-label='With textarea'
						name='job_description'
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

export default connect(mapStateToProps, { addExperience })(AddExperience);
