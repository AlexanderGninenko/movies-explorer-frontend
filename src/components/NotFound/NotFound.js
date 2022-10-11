function NotFound({ onGoBack }) {
  const goBack = (e) => {
    e.preventDefault();
    onGoBack();
  };

  return (
    <form onSubmit={goBack} className='notFound'>
      <h1 className='notFound__title'>404</h1>
      <p className='notFound__subtitle'>Страница не найдена</p>
      <button type='submit' className='notFound__button'>
        Назад
      </button>
    </form>
  );
}

export default NotFound;
