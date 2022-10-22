import { useState, useEffect } from 'react';

const SearchForm = ({ findMovies }) => {
  const [value, setValue] = useState('');
  const [isShortsToggled, setIsShortsToggled] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('searchQuery')) {
      setValue(JSON.parse(localStorage.getItem('searchQuery')));
    }
    setValue('');
    setIsShortsToggled(JSON.parse(localStorage.getItem('isShortsToggled')));
  }, []);

  const handleFindMovies = (e) => {
    e.preventDefault();
    findMovies(value, isShortsToggled);
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleShortsToggle = () => {
    const shortsValue = !isShortsToggled;
    setIsShortsToggled(shortsValue);
    findMovies(value, shortsValue);
  };

  return (
    <form className='searchform'>
      <div className='searchform__field'>
        <input
          onChange={handleInputChange}
          className='searchform__input'
          placeholder='Фильм'
          value={value || ''}
        ></input>
        <button
          onClick={handleFindMovies}
          type='submit'
          className='searchform__button'
        >
          Найти
        </button>
      </div>
      <div className='searchform__shorts'>
        <input
          onClick={handleShortsToggle}
          checked={isShortsToggled || ''}
          type='checkbox'
          className='searchform__shorts-input'
          readOnly
        ></input>
        <span className='searchform__label'>Короткометражки</span>
      </div>
    </form>
  );
};

export default SearchForm;
