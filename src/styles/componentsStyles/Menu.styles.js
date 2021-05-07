import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const MenuStyled = styled.nav`
	width: 60%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	color: #ffffff;

	@media (max-width: 1080px) {
		width: unset;
	}

	> ul {
		display: flex;

		& > .MuiListItem-gutters {
			@media (max-width: 800px) {
				padding: 6px;
			}
		}
	}

	> ul > div {
		display: flex;

		& > .MuiButton-root {
			min-width: 20px;
		}

		& > .MuiButton-text {
			padding: 0;
			margin-right: 10px;
		}

		& > .MuiListItem-gutters {
			@media (max-width: 800px) {
				padding: 6px;
			}
		}
	}
`;

export const useStyles = makeStyles({
	settings: {
		'&:hover, &:focus': {
			transform: 'rotate(360deg)',
			transition: '0.5s'
		}
	},
	button: {
		fontWeight: 'bold',
		width: '109px',
		height: '36px',
		background: '#01A299',
		color: '#FFF',
		'&:hover': {
			background: '#00D9CE'
		}
	},
	full: {
		'@media (max-width: 800px)': {
			display: 'none'
		}
	},
	icon: {
		'@media (min-width: 800px)': {
			display: 'none'
		}
	}
});
