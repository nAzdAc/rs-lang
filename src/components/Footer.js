import { useSelector } from 'react-redux';
import { images } from '../assets/images/imagesRequire';
import { useStyles } from '../styles/componentsStyles/Footer.styles';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

export const Footer = () => {
	const { theme } = useSelector((state) => state.settings);
	const classes = useStyles({ theme });

	return (
		<footer className={classes.footer}>
			<p className={classes.year}>2021</p>
			<div className={classes.iconsWrap}>
				<a className={classes.link} href="https://www.instagram.com/maxandreev1507/">
					<InstagramIcon className={classes.icon} />
				</a>

				<a className={classes.link} href="https://www.linkedin.com/in/max-andreev/">
					<LinkedInIcon className={classes.icon} />
				</a>

				<a className={classes.link} href="https://github.com/nAzdAc">
					<GitHubIcon className={classes.icon} />
				</a>
			</div>
			<div className={classes.imageWrap}>
				<a className={classes.schoolLink} target="_blank" rel="noopener noreferrer" href="https://rs.school/react/">
					<img className={classes.schoolImage} src={images.school} alt="rs" />
				</a>
			</div>
		</footer>
	);
};
