import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Toast from 'react-bootstrap/Toast';

const Alert = ({ alerts }) => {
	const [show, setShow] = useState(false);

	const toggleShow = () => setShow(!show);

	const [currentAlert, setCurrentAlert] = useState(null);

	useEffect(() => {
		if (alerts) {
			setCurrentAlert(alerts);
			setShow(true);
		} else setShow(false);
	}, [alerts]);

	return (
		<>
			<style type='text/css'>
				{`
                    .toast_container {
                        min-width: 300px;
                        max-width: 380px;
                        position: fixed;
					    top: 4rem;
					    right: 1%;
						z-index: 99;
                    }
					.toast {
						background-color: #ffffff;
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
	alerts: state.ALERTS,
});

export default connect(mapStateToProps, {})(Alert);
