import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Toast from 'react-bootstrap/Toast';

const Alert = ({ authAlerts }) => {
	const [show, setShow] = useState(false);

	const toggleShow = () => setShow(!show);

	const [currentAlert, setCurrentAlert] = useState(null);

	useEffect(() => {
		if (authAlerts) {
			setCurrentAlert(authAlerts);
			setShow(true);
		}
	}, [authAlerts]);

	return (
		<>
			<style type='text/css'>
				{`
                    .toast_container {
                        min-width: 300px;
                        max-width: 380px;
                        position: absolute;
					    top: 4rem;
					    right: 1%;
                    }
                    .toast-header {
                        background-color: 
                        ${currentAlert && currentAlert.success ? '#4CAF50' : '#F44336'};
                        color: #fff;
                    }
                    .toast-header button {
                        outline: none;
                        color: #fff;
                        font-weight: 500;
                    }
                    .toast-header button:hover {
                        color: #fff;
                    }
                `}
			</style>
			<div className='toast_container'>
				{currentAlert && Array.isArray(currentAlert) ? (
					currentAlert.map((alert, index) => (
						<Toast show={show} onClose={toggleShow} key={index}>
							<style>
								{`
                                    .toast-header {
                                        background-color: 
                                        ${alert.success ? '#4CAF50' : '#F44336'};
                                    }
                                `}
							</style>
							<Toast.Header>
								<span className='mr-auto'>{alert.success ? 'Notification' : 'Error'}</span>
							</Toast.Header>
							<Toast.Body>{alert.message}</Toast.Body>
						</Toast>
					))
				) : (
					<Toast show={show} onClose={toggleShow}>
						<Toast.Header>
							<span className='mr-auto'>
								{currentAlert && currentAlert.success ? 'Notification' : 'Error'}
							</span>
						</Toast.Header>
						<Toast.Body>{currentAlert && currentAlert.message}</Toast.Body>
					</Toast>
				)}
			</div>
		</>
	);
};

const mapStateToProps = (state) => ({
	authAlerts: state.AUTH_STATE.alerts,
});

export default connect(mapStateToProps, {})(Alert);
