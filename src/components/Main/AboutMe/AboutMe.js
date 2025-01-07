import myphoto from '../../../images/myphoto.jpg';

function AboutMe() {
  return (
    <section className='about-me'>
      <h1 className='about-me__title'>Студент</h1>
      <div className='about-me__container'>
        <img className='about-me__photo' src={myphoto} alt='Мое фото' />

        <div className='about-me__info'>
          <h2 className='about-me__name'>Александр</h2>
          <h3 className='about-me__status'>Фронтенд-разработчик, 33 года</h3>
          <p className='about-me__description'>
            Я родился и живу в городе Большой Камень, закончил Дальневосточный
            Федеральный университет по специальности переводчик китайского и
            английского языков. У меня есть жена и сын. Я люблю слушать музыку,
            водить автомобиль и очень увлекаюсь программированием. На данный
            момент я работаю начальником отдела технических переводов в самой
            крупной судостроительной компании страны ООО "ССК Звезда". После
            того, как прошёл курс по веб-разработке, начал делать проект для
            своей текущей работы, который облегчит рабочую рутину.
          </p>
          <a
            className='about-me__github'
            href='https://github.com/AlexanderGninenko/'
          >
            Github
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
