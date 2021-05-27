import { MAIN_PAGE_TEXT, DEVELOPERS, ADVANTAGES } from '../utils/mainPageText';
import { useStyles } from '../styles/pagesStyles/MainPage.styles';
import { icons } from '../assets/icons/IconsRequire';
import { Container, Paper } from '@material-ui/core';

export const MainPage = () => {
	const classes = useStyles();
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
					{ADVANTAGES.map((advantage, i) => {
						return (
							<div className={classes.advantage} key={i}>
								<img className={classes.advantageImg} src={advantage.svg} alt={advantage.title} />
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
					{DEVELOPERS.map((developer, i) => {
						return (
							<Paper className={classes.developerCard} key={i}>
								<img className={classes.developerImg} src={developer.photo} alt={developer.name} />
								<h4 className={classes.subtitle1}>{developer.name}</h4>
								<span className={classes.subtitle2}>{developer.description}</span>
								<a target="_blank" rel="noopener noreferrer" href={developer.git_link}>
									<div className={classes.githubWrap}>
										<img className={classes.gitImage} src={icons.git} alt="git" />
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
