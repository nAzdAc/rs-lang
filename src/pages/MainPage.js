import { MAIN_PAGE_TEXT, DEVELOPERS, ADVANTAGES } from '../utils/mainPageText';
import { useStyles } from '../styles/pagesStyles/MainPage.styles';
import { Container, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import GitHubIcon from '@material-ui/icons/GitHub';

export const MainPage = () => {
	const classes = useStyles();
	const { theme } = useSelector((state) => state.settings);
	return (
		<Container className={classes.root}>
			<h1 className={classes.logo}>{MAIN_PAGE_TEXT.TITLE}</h1>
			<h2 className={classes.title}>{MAIN_PAGE_TEXT.SUBTITLE}</h2>
			<iframe
				className={classes.video}
				src="https://www.youtube.com/embed/uRVv43J8jH0"
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
			<div className={classes.textImgWrapper}>
				<p className={classes.text}>{MAIN_PAGE_TEXT.P1}</p>
				<p className={classes.text}>{MAIN_PAGE_TEXT.P2}</p>
				<p className={classes.text}>{MAIN_PAGE_TEXT.P3}</p>
				<p className={classes.text}>{MAIN_PAGE_TEXT.P4}</p>
			</div>

			<Paper className={classes.advantagesSection}>
				<h3 className={classes.subtitle}>Ключевые преимущества</h3>
				<div className={classes.advantagesWrapper}>
					{ADVANTAGES.map((advantage) => {
						return (
							<div className={classes.advantage} key={`${advantage.title}advng-Main`}>
								<img
									className={classes.advantageImg}
									src={theme === 'dark' ? advantage.darkSvg : advantage.lightSvg}
									alt={advantage.title}
								/>
								<span style={{ margin: 'auto' }} className={classes.subtitle1}>
									{advantage.title}
								</span>
								<span style={{ margin: 'auto' }} className={classes.subtitle2}>
									{advantage.description}
								</span>
							</div>
						);
					})}
				</div>
			</Paper>

			<section>
				<h3 className={classes.title}>Разработчики</h3>
				<div className={classes.developers}>
					{DEVELOPERS.map((developer) => {
						return (
							<Paper className={classes.developerCard} key={`${developer.name}dvlprs-Main`}>
								<img className={classes.developerImg} src={developer.photo} alt={developer.name} />
								<h4 className={classes.subtitle1}>{developer.name}</h4>
								<span className={classes.subtitle2}>{developer.description}</span>
								<a className={classes.githubLink} target="_blank" rel="noopener noreferrer" href={developer.git_link}>
									<div className={classes.githubWrap}>
										<GitHubIcon className={classes.githubImage} />
										<span className={classes.subtitle2}>{developer.git_name}</span>
									</div>
								</a>
							</Paper>
						);
					})}
				</div>
			</section>
		</Container>
	);
};
