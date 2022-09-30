import arrow from "../../../images/arrow.svg";

function Portfolio() {
  return (
    <div className="portfolio">
      <h1 className="portfolio__title">Портфолио</h1>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            className="portfolio__list-link"
            href="https://github.com/AlexanderGninenko/movies-explorer-api"
          >
            Статичный сайт
            <img src={arrow} alt="Ссылка на проект" />
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__list-link"
            href="https://github.com/AlexanderGninenko/movies-explorer-api"
          >
            Адаптивный сайт
            <img src={arrow} alt="Ссылка на проект" />
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__list-link"
            href="https://github.com/AlexanderGninenko/movies-explorer-api"
          >
            Одностраничное приложение
            <img src={arrow} alt="Ссылка на проект" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
