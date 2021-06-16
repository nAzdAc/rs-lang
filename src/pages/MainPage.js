import { MAIN_PAGE_TEXT, ADVANTAGES } from '../utils/mainPageText';
import { useStyles } from '../styles/pagesStyles/MainPage.styles';
import { Container, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';

export const MainPage = () => {
	const { theme } = useSelector((state) => state.settings);
	const classes = useStyles({ theme });

	return (
		<Container className={classes.root}>
			<h1 className={classes.logo}>{MAIN_PAGE_TEXT.TITLE}</h1>
			<h2 className={classes.title}>{MAIN_PAGE_TEXT.SUBTITLE}</h2>
			<iframe
				className={classes.video}
				src="https://www.youtube.com/embed/TR0ervSv3JY"
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
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
		</Container>
	);
};
