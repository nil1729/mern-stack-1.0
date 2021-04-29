import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import moment from 'moment';
import checker from '../checkFields';

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

const DurationComponent = ({ startingDate, endingDate }) => {
	const sDate = new Date(startingDate).getDate();
	const sDateOrder = moment(startingDate).format('Do').slice(-2);
	const sMonth = moment(startingDate).format('MMMM');
	const sYear = new Date(startingDate).getFullYear();

	let eDate, eDateOrder, eMonth, eYear;
	if (endingDate) {
		eDate = new Date(endingDate).getDate();
		eDateOrder = moment(endingDate).format('Do').slice(-2);
		eMonth = moment(endingDate).format('MMMM');
		eYear = new Date(endingDate).getFullYear();
	}

	return (
		<>
			{sDate}
			<sup>{sDateOrder}</sup> {sMonth} {sYear} -{' '}
			{!endingDate ? (
				'Now'
			) : (
				<>
					{eDate}
					<sup>{eDateOrder}</sup> {eMonth} {eYear}
				</>
			)}
		</>
	);
};

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

const AvatarImage = ({ name, colorCode, imageURL, size }) => {
	let height;
	let width;
	let fontSize;
	switch (size) {
		case 'sm':
			height = 60;
			width = 60;
			fontSize = 25;
			break;
		case 'lg':
			height = 125;
			width = 125;
			fontSize = 45;
			break;
		default:
			height = 75;
			width = 75;
			fontSize = 30;
			break;
	}
	// convert to string
	height += 'px';
	width += 'px';
	fontSize += 'px';

	return (
		<>
			<style type='text/css'>
				{`
					.avatar__container {
						margin: auto;
						overflow: hidden;
						border-radius: 50%;
					}
					.user__short__name {
						height: 100%;
						color: #ffffff;
						letter-spacing: 1px;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				`}
			</style>
			<div className='avatar__container' style={{ height, width }}>
				{imageURL && checker.siteURL(imageURL) ? (
					<img src={imageURL} alt='' className='img-fluid' />
				) : (
					<div
						className='user__short__name text-uppercase'
						style={{ fontSize, backgroundColor: colorCode }}
					>
						{name
							.split(' ')
							.map((it) => it.slice(0, 1))
							.join('')}
					</div>
				)}
			</div>
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
	DurationComponent,
	TimestampComponent,
	AvatarImage,
};
