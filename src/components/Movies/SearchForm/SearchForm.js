const SearchForm = () => {
  return (
    <form className='searchform'>
      <div className='searchform__field'>
        <input className='searchform__input' placeholder='Фильм'></input>
        <button type='submit' className='searchform__button'>
          Найти
        </button>
      </div>
      <div className='searchform__shorts'>
        <input type='checkbox' className='searchform__shorts-input'></input>
        <span className='searchform__label'>Короткометражки</span>
      </div>
    </form>
  );
};

export default SearchForm;
