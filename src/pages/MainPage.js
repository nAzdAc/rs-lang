import Typography from '@material-ui/core/Typography';
import { MAIN_PAGE_TEXT, DEVELOPERS, ADVANTAGES } from '../utils/mainPageText';
import { useStyles } from '../styles/pagesStyles/MainPage.styles';
import { icons } from '../assets/icons/IconsRequire';
import { Paper } from '@material-ui/core';

export const MainPage = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Typography variant="h1" className={classes.title}>
				{MAIN_PAGE_TEXT.TITLE}
			</Typography>
			<Typography variant="h3" className={classes.subtitle}>
				{MAIN_PAGE_TEXT.SUBTITLE}
			</Typography>
			<iframe
				className={classes.video}
				src="https://www.youtube.com/embed/uRVv43J8jH0"
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
			<div className={classes.textImgWrapper}>
				<Typography variant="body1" className={classes.text}>
					{MAIN_PAGE_TEXT.P1}
				</Typography>
				<Typography variant="body1" className={classes.text}>
					{MAIN_PAGE_TEXT.P2}
				</Typography>
				<Typography variant="body1" className={classes.text}>
					{MAIN_PAGE_TEXT.P3}
				</Typography>
				<Typography variant="body1" className={classes.text}>
					{MAIN_PAGE_TEXT.P4}
				</Typography>
			</div>

			<section className={classes.advantagesSection}>
				<Typography variant="h2" className={classes.subtitle}>
					Ключевые преимущества
				</Typography>
				<div className={classes.advantagesWrapper}>
					{ADVANTAGES.map((advantage, i) => {
						return (
							<div className={classes.advantage} key={i}>
								<img className={classes.advantageImg} src={advantage.svg} alt={advantage.title} />
								<Typography variant="subtitle1">{advantage.title}</Typography>
								<Typography variant="subtitle2">{advantage.description}</Typography>
							</div>
						);
					})}
				</div>
			</section>

			<section>
				<Typography variant="h2" className={classes.subtitle}>
					Разработчики
				</Typography>
				<div className={classes.developers}>
					{DEVELOPERS.map((developer, i) => {
						return (
							<Paper className={classes.developerCard} key={i} style={{ order: `${i}` }}>
								<img className={classes.developerImg} src={developer.photo} alt={developer.name} />
								<Typography variant="h6">{developer.name}</Typography>
								<Typography className={classes.description} variant="body1">
									{developer.description}
								</Typography>
								<a target="_blank" rel="noopener noreferrer" href={developer.git_link}>
									<div className={classes.githubWrap}>
										<img src={icons.git} alt="git" />
										<Typography variant="body1">{developer.git_name}</Typography>
									</div>
								</a>
							</Paper>
						);
					})}
				</div>
			</section>
		</div>
	);
};
