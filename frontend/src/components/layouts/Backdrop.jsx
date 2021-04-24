import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

const Backdrop = ({ authLoading }) => {
	return authLoading ? (
		<>
			<style type='text/css'>
				{`
                    .full_page_backdrop {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        z-index: 99999;
                        background-color: rgba(47, 51, 47, 0.507);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .full_page_backdrop .spinner-border {
                        height: 4rem;
                        width: 4rem;
                        color: rgb(20, 20, 20, 0.9);
                    }
                `}
			</style>
			<div className='full_page_backdrop'>
				<Spinner animation='border' />
			</div>
		</>
	) : null;
};

const mapStateToProps = (state) => ({
	authLoading: state.AUTH_STATE.loading,
});

export default connect(mapStateToProps, {})(Backdrop);
