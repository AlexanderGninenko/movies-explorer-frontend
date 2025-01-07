import logo from '../../../images/web-hero-logo.png';

function Promo() {
  return (
    <section className='promo'>
      <img className='promo__logo' src={logo} alt='Логотип Web Hero'></img>
      <h1 className='promo__title'>
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <p className='promo__description'>
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </p>
      <a className='promo__learn-more' href='#about-project'>
        Узнать больше
      </a>
    </section>
  );
}

export default Promo;
