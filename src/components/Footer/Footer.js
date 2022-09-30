function Footer() {
  return (
    <footer className="footer">
      <h1 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h1>
      <div className="footer__container">
        <p className="footer__year">© 2022</p>
        <ul className="footer__links">
          <li className="footer__links-item">
            <a
              href="https://github.com/AlexanderGninenko/movies-explorer-api"
              className="footer__link"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__links-item">
            <a
              href="https://github.com/AlexanderGninenko/movies-explorer-api"
              className="footer__link"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
