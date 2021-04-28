/**
 *
 * @access 	Public
 * @route  	/developers
 * @desc  	show the list of developers account on the site
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../utils/styled-components/components';

const styles = {
	image: {
		borderRadius: '50%',
		height: '20vh',
	},
	developersContainer: {
		width: '65%',
	},
};

const Developers = () => {
	return (
		<PageContainer className='py-3 container'>
			<h1 className='mb-1 text-info'>Developers</h1>
			<p className='lead'>
				<i className='fab fa-react mr-2'></i>
				Browse and connect with Developers
			</p>
			<div className='list-group'>
				<div className='py-3 list-group-item d-flex align-items-center justify-content-evenly'>
					<div className='avatar__container'>
						{/* <img
							src='https://avatars3.githubusercontent.com/u/54589036?v=4'
							alt=''
							className='img-fluid'
							style={styles.image}
						/> */}
						<div className='user__short__name'>ND</div>
					</div>
					<div style={{ flex: 1.5 }} className='mx-4'>
						<h5>Nilanjan Deb</h5>
						<p style={{ fontSize: '14px' }}>Frontend Web Developer at Student Union Tech Team</p>
						<p style={{ fontSize: '15px' }}>
							<i className='fal fa-map-marker-alt mr-1'></i>
							Pilani, Rajasthan
						</p>
						<Link className='btn btn-primary btn-sm' to='/developers/nil1729'>
							View Profile
						</Link>
					</div>
					<div style={{ flex: 0.8 }} className='d-flex justify-content-center'>
						<ul className='list-group text-primary'>
							{['React.JS', 'Vue.JS', 'Node.JS', 'Python'].map((skill) => (
								<li
									style={{
										border: 0,
										fontSize: '14px',
										background: 'transparent',
									}}
									className='list-group-item mb-1 p-0 text-left'
									key={skill}
								>
									<i className='far fa-check mr-1'></i>
									{skill}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</PageContainer>
	);
};

export default Developers;
