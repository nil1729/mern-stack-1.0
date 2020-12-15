import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
	width: 65%;
`;

const StyledInput = styled.input`
	height: calc(1.5em + 0.5rem + 2px);
	outline: none;
	box-shadow: none !important;
	border-radius: 0;
	font-size: 0.85rem;
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
	font-size: 0.75rem;
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

export {
	PageContainer,
	StyledInput,
	StyledSelect,
	StyledHelperText,
	StyledTextArea,
	StyledLabel,
	GreyLinkButton,
	TableItem,
};
