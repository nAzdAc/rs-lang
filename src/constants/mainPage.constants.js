import { icons } from '../assets/icons/IconsRequire';
import { images } from '../assets/images/imagesRequire';

export const MANE_PAGE_TITLE = 'Играй, учи и разговаривай на английском';

export const MANE_PAGE_TEXT_P1 =
	'RS Lang — это эффективный сервис для увлекательной практики языков. Более 23 000 000 человек во всем мире уже с нами. Присоединяйся!';

export const MANE_PAGE_TEXT_P2 = 'Мы решаем главную проблему изучающих иностранный язык — поддерживаем мотивацию.';

export const MANE_PAGE_TEXT_P3 =
	'Наши пользователи изучают английский и другие иностранные языки по аутентичным материалам на языке оригинала (фильмы, музыка, книги), проходят увлекательные тренировки для закрепления словарного запаса, осваивают курсы под свои цели (для работы, общения, путешествий), выполняют задания и следят за своим прогрессом.';

export const MANE_PAGE_TEXT_P4 =
	'RS Lang — мультиплатформенный сервис. Сейчас он доступен на веб-платформе, а скоро и в виде бесплатных мобильных приложений для iOS, Android, веерных сеялок и расширений для браузеров.';

export const ADVANTAGES = [
	{
		svg: icons.chart,
		title: 'Результаты',
		description: 'Статитика по дням'
	},
	{
		svg: icons.six,
		title: 'Разделов',
		description: 'Возрастающая сложность'
	},
	{
		svg: icons.game,
		title: '4 игры',
		description: 'Интересно и полезно'
	},
	{
		svg: icons.dictionary,
		title: 'Словарь',
		description: 'на основе ваших достижений'
	}
];

export const DEVELOPERS = [
	{
		photo: images.misha,
		name: 'Михаил Чернышенко',
		description: 'Ментор. Следил за порядком, давал советы и помогал выстраивать процессы.',
		git_link: 'https://github.com/chermic',
		git_name: 'chermic'
	},
	{
		photo: images.nikolay,
		name: 'Николай Крещенович',
		description:
			'Полностью сделал разделы учебника и словаря: вертска, наполнение и варианты отображения. Сделал модуль регистрации и логина. Развернул и задеплоил базовый backend.',
		git_link: 'https://github.com/Nicolay-kr',
		git_name: 'Nicolay-kr'
	},
	{
		photo: images.max,
		name: 'Максим Андреев',
		description:
			'Сделал верстку и логику игр. Доработал backend под задачи проекта: изменил логику управления статусом слов, оптимизировал число запросов к серверу, сделал удобную систему хранения пользовательских взамодействий со словами. Написал обработку статистики на backend. Сверстал блок с настройками, разводящие страницы игр и загрузку аватарок.',
		git_link: 'https://github.com/nAzdAc',
		git_name: 'nAzdAc'
	},
	{
		photo: images.aleksey,
		name: 'Алексей Горавский',
		description:
			'Подготовил среду и настроил проект. Сверстал главную страницу, header c меню и footer проекта. Сделал роутинг в проекте, который работает на двух уровнях: первый отвечает за навигацию по разделам, второй — по уровням сложности и играм в меню. Реализовал механизм передачи разных наборов слов в игры по условиям задания. Сделал тесты.',
		git_link: 'https://github.com/AGoravskiy',
		git_name: 'AGoravskiy'
	},
	{
		photo: images.ivan,
		name: 'Иван Швец',
		description:
			'Сделал макеты в Figma на компонентах Material design. Сверстал базовые компоненты с помощью Material UI. Прикрутил redux к проекту и заложил основу управления настройками карточек слов. Раздел статистики: верстка, работа таблиц и графиков, функции обработки данных на клиенте. Мелкие доработки верстки по всему проекту, чтобы результат соответствовал макетам.',
		git_link: 'https://github.com/ShvetsBy',
		git_name: 'ShvetsBy'
	}
];
