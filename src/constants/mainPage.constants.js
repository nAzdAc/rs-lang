import icons from '../assets/icons';
import images from '../assets/images';

export const MANE_PAGE_TITLE = 'Играй, учи и разговаривай на английском';

export const MANE_PAGE_TEXT_P1 = 'RS Lang — это эффективный сервис для увлекательной практики языков. Более 23 000 000 человек во всем мире уже с нами. Присоединяйся!';

export const MANE_PAGE_TEXT_P2 = 'Мы решаем главную проблему изучающих иностранный язык — поддерживаем мотивацию.';

export const MANE_PAGE_TEXT_P3 = 'Наши пользователи изучают английский и другие иностранные языки по аутентичным материалам на языке оригинала (фильмы, музыка, книги), проходят увлекательные тренировки для закрепления словарного запаса, осваивают курсы под свои цели (для работы, общения, путешествий), выполняют задания и следят за своим прогрессом.';

export const MANE_PAGE_TEXT_P4 = 'RS Lang — мультиплатформенный сервис. Сейчас он доступен на веб-платформе, а скоро и в виде бесплатных мобильных приложений для iOS, Android, веерных сеялок и расширений для браузеров.';

export const ADVANTAGES = [
  {
    svg: icons.chart,
    title: 'Результаты',
    description: 'Статитика по дням',
  },
  {
    svg: icons.six,
    title: 'Разделов',
    description: 'Возрастающая сложность',
  },
  {
    svg: icons.game,
    title: '4 игры',
    description: 'Интересно и полезно',
  },
  {
    svg: icons.dictionary,
    title: 'Словарь',
    description: 'на основе ваших достижений',
  },
];

export const DEVELOPERS = [
  {
    photo: images.misha,
    name: 'Михаил Чернышенко',
    description: 'Ментор. Следил за порядком, давал советы, помогал выстраивать процессы.',
    git_link: 'https://github.com/chermic',
    git_name: 'chermic',
  },
  {
    photo: images.nik,
    name: 'Николай Крещенович',
    description: 'Рисовал карты, внедрял карты и машинки, делал звук движения машин, сделал роутинг, реализовал паузу в игре и настроил загрузочную сцену.',
    git_link: 'https://github.com/Nicolay-kr',
    git_name: 'Nicolay-kr',
  },
  {
    photo: images.maks,
    name: 'Максим Андреев',
    description: 'Привел в проект ментора. Занимался интеграцией front- и back-end, сделал блок настроек: языки, громкость. Запустил статистику, замутил музыку, прикрутил верстку к JS, настроил баланс машинок и вообще был турбиной всего проекта. Сделал игру по сети.',
    git_link: 'https://github.com/nAzdAc',
    git_name: 'nAzdAc',
  },
  {
    photo: images.aleksey,
    name: 'Алексей Горавский',
    description: 'Настроил webpack, разработал и задеплоил весь backend — все что расписано в разделе «Под капотом».',
    git_link: 'https://github.com/AGoravskiy',
    git_name: 'AGoravskiy',
  },
  {
    photo: images.ivan,
    name: 'Иван Швец',
    description: 'Занимался дизайном и версткой, готовил эту статью и видео.',
    git_link: 'https://github.com/ShvetsBy',
    git_name: 'ShvetsBy',
  },
]
