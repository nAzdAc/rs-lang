import { images } from '../assets/images/imagesRequire';
import { useStyles } from '../styles/componentsStyles/Footer.styles';

const gitAccounts = [
	{
		name: 'AGoravskiy',
		url: 'https://github.com/AGoravskiy'
	},
	{
		name: 'nAzdAc',
		url: 'https://github.com/nAzdAc'
	},
	{
		name: 'Nickolay-Kr',
		url: 'https://github.com/Nicolay-kr'
	},
	{
		name: 'ShvetsBy',
		url: 'https://github.com/ShvetsBy'
	}
];

export const Footer = () => {
	const classes = useStyles();

	return (
		<footer className={classes.footer}>
			<p className={classes.year}>2021</p>
			<div className={classes.developers}>
				{gitAccounts.map((acc) => (
					<a className={classes.githubLink} target="_blank" key={acc.url} rel="noopener noreferrer" href={acc.url}>
						{acc.name}
					</a>
				))}
			</div>
			<div className={classes.imageWrap}>
				<a className={classes.schoolLink} target="_blank" rel="noopener noreferrer" href="https://rs.school/react/">
					<img className={classes.schoolImage} src={images.school} alt="rs" />
				</a>
			</div>
		</footer>
	);
};
