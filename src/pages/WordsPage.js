import React, { useState, useContext } from 'react';
import { backRoutes } from '../utils/backRoutes';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import Box from '@material-ui/core/Box';
import LevelButton from '../components/LevelButton';
import WordsCardList from '../components/WordsCardList';
import { Route, useRouteMatch, MemoryRouter, Link } from 'react-router-dom';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { AuthContext } from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			marginTop: theme.spacing(2)
		}
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		flexDirection: 'column'
	},
	title: {
		marginRight: '40px',
		fontSize: '60px',
		fontStyle: 'normal',
		fontWeight: '300',
		lineHeight: '80px',
		textAlign: 'left',
		color: (group) =>
			group === 0
				? '#BB86FC'
				: group === 1
					? '#985EFF'
					: group === 2
						? '#7F39FB'
						: group === 3 ? '#6200EE' : group === 4 ? '#5600E8' : group === 5 ? '#3700B3' : '#3700B3',
		verticalAlign: 'middle'
	},
	titleBox: {
		display: 'flex',
		marginTop: '160px',
		marginRight: 'auto'
	},
	pagination: {
		margin: '40px',
		fontSize: '40px',
		marginLeft: 'auto',
		marginRight: 'auto'
	}
}));

export default function WordsPage() {
	const { userId, token } = useContext(AuthContext);
	let match = useRouteMatch().path;
	let group = match[match.length - 1] - 1;
	const [ page, setPage ] = useState(0);
	const classes = useStyles(group);
	const fetchUrl = backRoutes.getWordsPage(group, page);

	const handlePaginationChange = (e, value) => {
		setPage(value);
	};

	return (
		<Container className={classes.container}>
			<MemoryRouter initialEntries={[ `${match}` ]} initialIndex={0}>
				<Box className={classes.titleBox}>
					<Typography className={classes.title} variant="h1" component="h2">
						Difficulty level
					</Typography>
					<LevelButton group={group + 1} />
				</Box>
				<WordsCardList
					userId={userId}
					token={token}
					page={page}
					difficulty={group}
					fetchUrl={fetchUrl}
					infoPanel="CardIcons"
				/>
				<Route>
					{({ location }) => {
						return (
							<Pagination
								page={page}
								className={classes.pagination}
								onChange={handlePaginationChange}
								count={30}
								color="primary"
								renderItem={(item) => (
									<PaginationItem
										component={Link}
										to={`${match}${item.page === 0 ? '' : `?page=${item.page}`}`}
										{...item}
									/>
								)}
							/>
						);
					}}
				</Route>
			</MemoryRouter>
		</Container>
	);
}
