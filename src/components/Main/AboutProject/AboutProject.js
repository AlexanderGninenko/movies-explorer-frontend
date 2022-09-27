function AboutProject() {
  return (
    <div id="about-project" className="about-project">
      <h1 className="about-project__title">О проекте</h1>
      <div className="about-project__duration">
        <div className="about-project__stages">
          <h2 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h2>
          <p className="about-project__description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__stages">
          <h2 className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </h2>
          <p className="about-project__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__diagram">
        <p className="about-project__diagram__weeks">1 неделя</p>
        <p className="about-project__diagram__weeks">4 недели</p>
        <p className="about-project__diagram__techs">Back-end</p>
        <p className="about-project__diagram__techs">Front-end</p>
      </div>
    </div>
  );
}

export default AboutProject;
