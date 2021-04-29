/**
 *
 * @access 	Private
 * @route  	/dashboard
 * @desc  	Dashboard page for currently logged in user
 *
 */

import React, { useEffect, useState } from 'react';
import {
	PageContainer,
	GreyLinkButton,
	TableItem,
	DurationComponent,
} from '../utils/styled-components/components';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import { fetchDashboard, deleteCreditFromAccount } from '../../store/actions/user_profile';

const Developers = ({
	authState: { isAuthenticated, user },
	userProfileState,
	fetchDashboard,
	deleteCreditFromAccount,
}) => {
	const [educations, setEducations] = useState(null);
	const [experiences, setExperiences] = useState(null);

	useEffect(() => {
		if (user && userProfileState.dashboard === null) fetchDashboard(user.id);
		if (user && userProfileState.new_credits) fetchDashboard(user.id);
		if (user && userProfileState.dashboard && !userProfileState.new_credits) {
			setEducations(userProfileState.dashboard.educations);
			setExperiences(userProfileState.dashboard.experiences);
		}
		// eslint-disable-next-line
	}, [isAuthenticated, userProfileState]);

	const deleteCredit = (id, creditType) => async () => {
		if (creditType === 'edu')
			setEducations(
				educations.map((it) => {
					if (it.id === id) return { ...it, deleting: true };
					return it;
				})
			);
		else
			setExperiences(
				experiences.map((it) => {
					if (it.id === id) return { ...it, deleting: true };
					return it;
				})
			);
		await deleteCreditFromAccount(user.id, id, creditType);
	};
	return (
		<PageContainer className='container py-3 mb-5 auth__container'>
			<h2 className='text-info mb-1'>Dashboard</h2>
			<p className='lead mb-4 text-capitalize' style={{ fontSize: '15.5px', fontWeight: 500 }}>
				<i className='fal fa-user mr-2'></i>
				welcome {user ? user.name : 'DevConnector User'}
			</p>
			<div>
				<GreyLinkButton smallfont='true' to='/dashboard/profile' className='btn btn-light btn-sm'>
					<i className='text-info fas fa-user-edit mr-1'></i>
					{user && !user.new_account ? 'Edit' : 'Create'} Profile
				</GreyLinkButton>
				<GreyLinkButton
					smallfont='true'
					to='/dashboard/experience'
					className={`btn btn-light btn-sm mx-3 ${user && user.new_account ? 'disabled' : ''}`}
				>
					<i className='text-info mr-1 fab fa-black-tie'></i>Add Experience
				</GreyLinkButton>
				<GreyLinkButton
					smallfont='true'
					to='/dashboard/education'
					className={`btn btn-light btn-sm ${user && user.new_account ? 'disabled' : ''}`}
				>
					<i className='text-info mr-1 fas fa-graduation-cap'></i>Add Education
				</GreyLinkButton>
			</div>
			<div className='mt-5'>
				<h5>Experience Credentials</h5>
				<table className='table mt-3 border'>
					<thead className='table-info'>
						<tr>
							<TableItem thead={true} scope='col'>
								Company
							</TableItem>
							<TableItem thead={true} scope='col'>
								Title
							</TableItem>
							<TableItem thead={true} scope='col'>
								Duration
							</TableItem>
							<TableItem thead={true} scope='col'></TableItem>
						</tr>
					</thead>
					<tbody>
						{userProfileState.loading ||
						userProfileState.dashboard === null ||
						userProfileState.new_credits ? (
							<tr>
								<TableItem colSpan='4'>
									<div className='text-center'>
										<Spinner animation='border' />
									</div>
								</TableItem>
							</tr>
						) : userProfileState.dashboard.experiences.length === 0 ? (
							<tr>
								<TableItem colSpan='4'>
									<p className='text-center lead'>You didn't add any job experience yet</p>
								</TableItem>
							</tr>
						) : (
							<>
								{experiences &&
									experiences.map((exp, index) => (
										<tr key={exp.id}>
											<TableItem>{exp.company_name}</TableItem>
											<TableItem>{exp.job_title}</TableItem>
											<TableItem>
												<DurationComponent
													startingDate={exp.starting_date}
													endingDate={exp.ending_date}
												/>
											</TableItem>
											<TableItem>
												<button
													disabled={exp.deleting}
													style={{ fontSize: '13px' }}
													className='btn btn-danger btn-sm'
													onClick={deleteCredit(exp.id, 'exp')}
												>
													{exp.deleting ? (
														<>
															Removing... {'	'}
															<Spinner
																as='span'
																animation='border'
																size='sm'
																role='status'
																aria-hidden='true'
															/>
														</>
													) : (
														<>
															Delete<i className='fas fa-trash ml-1'></i>
														</>
													)}{' '}
												</button>
											</TableItem>
										</tr>
									))}
							</>
						)}
					</tbody>
				</table>
			</div>
			<div className='mt-5'>
				<h5>Education Credentials</h5>
				<table className='table mt-3 border'>
					<thead className='table-info'>
						<tr>
							<TableItem thead={true} scope='col'>
								School
							</TableItem>
							<TableItem thead={true} scope='col'>
								Degree
							</TableItem>
							<TableItem thead={true} scope='col'>
								Duration
							</TableItem>
							<TableItem thead={true} scope='col'></TableItem>
						</tr>
					</thead>
					<tbody>
						{userProfileState.loading ||
						userProfileState.dashboard === null ||
						userProfileState.new_credits ? (
							<tr>
								<TableItem colSpan='4'>
									<div className='text-center'>
										<Spinner animation='border' />
									</div>
								</TableItem>
							</tr>
						) : userProfileState.dashboard.educations.length === 0 ? (
							<tr>
								<TableItem colSpan='4'>
									<p className='text-center lead'>You didn't add any education status yet</p>
								</TableItem>
							</tr>
						) : (
							<>
								{educations &&
									educations.map((edu, index) => (
										<tr key={edu.id}>
											<TableItem>{edu.school_name}</TableItem>
											<TableItem>{edu.degree}</TableItem>
											<TableItem>
												<DurationComponent
													startingDate={edu.starting_date}
													endingDate={edu.ending_date}
												/>
											</TableItem>
											<TableItem>
												<button
													disabled={edu.deleting}
													onClick={deleteCredit(edu.id, 'edu')}
													style={{ fontSize: '13px' }}
													className='btn btn-danger btn-sm'
												>
													{edu.deleting ? (
														<>
															Removing... {'	'}
															<Spinner
																as='span'
																animation='border'
																size='sm'
																role='status'
																aria-hidden='true'
															/>
														</>
													) : (
														<>
															Delete<i className='fas fa-trash ml-1'></i>
														</>
													)}
												</button>
											</TableItem>
										</tr>
									))}
							</>
						)}
					</tbody>
				</table>
			</div>
			<button disabled className='mt-4 text-uppercase btn btn-sm btn-danger'>
				<i className='fas fa-user-times mr-2'></i>delete my account
			</button>
		</PageContainer>
	);
};

const mapStateToProps = (state) => ({
	authState: state.AUTH_STATE,
	userProfileState: state.USER_PROFILE,
});

export default connect(mapStateToProps, { fetchDashboard, deleteCreditFromAccount })(Developers);
