import Typography from '@material-ui/core/Typography';
import {
	MANE_PAGE_TITLE,
	MANE_PAGE_TEXT_P1,
	MANE_PAGE_TEXT_P2,
	MANE_PAGE_TEXT_P3,
	MANE_PAGE_TEXT_P4,
	DEVELOPERS,
	ADVANTAGES
} from '../constants/mainPage.constants';
import { useStyles } from '../styles/pagesStyles/MainPage.styles';
import { icons } from '../assets/icons/IconsRequire';

export const MainPage = () => {
	const classes = useStyles();
	return (
		<div className={classes.wrapper}>
			<div>
				<p className={classes.rs_lang}>RS Lang</p>
				<Typography variant="h3" className={classes.title}>
					{MANE_PAGE_TITLE}
				</Typography>
				<div className={classes.textImgWrapper}>
					<div>
						<iframe
							width="800"
							height="600"
							src="https://www.youtube.com/embed/uRVv43J8jH0"
							title="YouTube video player"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							className={classes.video}
						/>
						<Typography variant="body1" className={classes.text}>
							{MANE_PAGE_TEXT_P1}
						</Typography>
						<Typography variant="body1" className={classes.text}>
							{MANE_PAGE_TEXT_P2}
						</Typography>
						<Typography variant="body1" className={classes.text}>
							{MANE_PAGE_TEXT_P3}
						</Typography>
						<Typography variant="body1" className={classes.text}>
							{MANE_PAGE_TEXT_P4}
						</Typography>
					</div>
				</div>

				<div className={classes.advantagesSection}>
					<Typography variant="h2" className={classes.title}>
						Ключевые преимущества
					</Typography>
					<div className={classes.advantagesWrapper}>
						{ADVANTAGES.map((advantage, i) => {
							return (
								<div className={classes.advantage} key={i}>
									<div className={classes.advantageImgWrapper}>
										<img src={advantage.svg} alt={advantage.title} />
									</div>
									<Typography variant="subtitle1">{advantage.title}</Typography>
									<Typography variant="subtitle2">{advantage.description}</Typography>
								</div>
							);
						})}
					</div>
				</div>
				<div className={classes.developersSection}>
					<Typography variant="h2" className={classes.title}>
						Разработчики
					</Typography>
					<div className={classes.developers}>
						{DEVELOPERS.map((developer, i) => {
							return (
								<div className={classes.developerWrapper} key={i} style={{ order: `${i}` }}>
									<div className={classes.developerImgWrapper}>
										<img src={developer.photo} alt={developer.name} />
									</div>
									<Typography variant="h6">{developer.name}</Typography>
									<Typography className={classes.description} variant="body1">
										{developer.description}
									</Typography>
									<a target="_blank" rel="noopener noreferrer" href={developer.git_link}>
										<div className={classes.gitWrapper}>
											<div className={classes.gitIconWrapper}>
												<img src={icons.git} alt="git" />
											</div>
											<Typography variant="body1">{developer.git_name}</Typography>
										</div>
									</a>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};
