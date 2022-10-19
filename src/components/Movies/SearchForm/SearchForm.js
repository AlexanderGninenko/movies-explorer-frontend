import { useState, useEffect } from 'react';

const SearchForm = ({
  findMovies,
  toggleShorts,
  isShortsToggled,
  searchQuery,
}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    findMovies(value.toLowerCase());
  }, [isShortsToggled]);

  const handleFindMovies = (e) => {
    e.preventDefault();
    findMovies(value.toLowerCase());
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleShortsToggle = () => {
    toggleShorts();
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
