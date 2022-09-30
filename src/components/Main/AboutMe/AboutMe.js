import myphoto from "../../../images/myphoto.svg";

function AboutMe() {
  return (
    <div className="about-me">
      <h1 className="about-me__title">Студент</h1>
      <div className="about-me__container">
        <div className="about-me__info">
          <h2 className="about-me__name">Александр</h2>
          <h3 className="about-me__status">Фронтенд-разработчик, 32 года</h3>
          <p className="about-me__description">
            Я родился и живу в городе Большой Камень, закончил факультет
            экономики СГУ. У меня есть жена и сын. Я люблю слушать музыку, а ещё
            увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в
            компании «СКБ Контур». После того, как прошёл курс по
            веб-разработке, начал заниматься фриланс-заказами и ушёл с
            постоянной работы.
          </p>
          <a
            className="about-me__github"
            href="https://github.com/AlexanderGninenko/"
          >
            Github
          </a>
        </div>
        <img className="about-me__photo" src={myphoto} alt="Мое фото" />
      </div>
    </div>
  );
}

export default AboutMe;
