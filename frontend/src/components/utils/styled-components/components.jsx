import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import moment from 'moment';

const PageContainer = styled.div`
	width: 65%;
`;

const StyledInput = styled.input`
	height: calc(1.5em + 0.5rem + 2px);
	outline: none;
	box-shadow: none !important;
	border-radius: 0;
	font-size: 0.85rem;
	color: #000000;
	&:focus {
		color: #000000;
	}
	&.wrong_input {
		border-color: red;
	}
`;

const StyledInputGroupText = styled.span`
	height: calc(1.5em + 0.5rem + 2px);
	outline: none;
	border-radius: 0;
	font-size: 0.85rem;
	color: #000000;
`;

const StyledInputErrorMessage = styled.small`
	color: red;
`;

const StyledSelect = styled.select`
	height: calc(1.5em + 0.5rem + 2px);
	outline: none;
	box-shadow: none !important;
	border-radius: 0;
	font-size: 0.85rem;
	padding: 0.1rem 0.35rem;
`;

const StyledTextArea = styled.textarea`
	outline: none;
	box-shadow: none !important;
	border-radius: 0;
	font-size: 0.9rem;
	min-height: 100px;
`;

const StyledLabel = styled.label`
	font-size: 0.85rem;
`;

const GreyLinkButton = styled(Link)`
	background-color: rgba(202, 197, 197, 0.671);
	&:hover {
		background-color: rgb(202, 197, 197);
	}
	${(props) =>
		props.smallfont &&
		css`
			font-size: 13.2px;
		`}
`;

const TableItem = styled.td`
	font-size: 13.2px;
	color: #2f3133;
	vertical-align: middle !important;
	${(props) =>
		props.thead &&
		css`
			font-size: 14px;
			font-weight: 500;
			border-top: 0 !important;
			color: #000;
		`};
`;

const StyledHelperText = styled.small`
	font-weight: 500;
	color: grey;
`;

const TimestampComponent = ({ timestamp }) => {
	let currDate = new Date(timestamp);
	const tDate = currDate.getDate();
	const tDateOrder = moment(currDate).format('Do').slice(-2);
	const tMonth = moment(currDate).format('MMMM');
	const tYear = currDate.getFullYear();

	return (
		<>
			{' '}
			{tDate}
			<sup>{tDateOrder}</sup> {tMonth} {tYear}, {moment(currDate).format('hh:mm a')}
		</>
	);
};

export {
	PageContainer,
	StyledInput,
	StyledInputErrorMessage,
	StyledSelect,
	StyledHelperText,
	StyledTextArea,
	StyledLabel,
	GreyLinkButton,
	TableItem,
	StyledInputGroupText,
	TimestampComponent,
};
