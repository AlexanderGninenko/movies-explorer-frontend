import arrow from '../../../images/arrow.svg';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h1 className='portfolio__title'>Портфолио</h1>
      <ul className='portfolio__list'>
        <li className='portfolio__list-item'>
          <a
            className='portfolio__list-link'
            href='https://github.com/AlexanderGninenko/movies-explorer-api'
            target='_blank'
            rel='noreferrer'
          >
            Статичный сайт
            <img src={arrow} alt='Ссылка на проект' />
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a
            className='portfolio__list-link'
            href='https://github.com/AlexanderGninenko/movies-explorer-api'
            target='_blank'
            rel='noreferrer'
          >
            Адаптивный сайт
            <img src={arrow} alt='Ссылка на проект' />
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a
            className='portfolio__list-link'
            href='https://github.com/AlexanderGninenko/movies-explorer-api'
            target='_blank'
            rel='noreferrer'
          >
            Одностраничное приложение
            <img src={arrow} alt='Ссылка на проект' />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
