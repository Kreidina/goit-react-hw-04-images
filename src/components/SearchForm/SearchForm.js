import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import css from './SearchForm.module.css';

export const SearchForm = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handelInput = e => {
    setQuery(e.currentTarget.value);
  };

  const handelSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return toast.info('Enter a word to search for a picture');
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <form className={css.searchForm} onSubmit={handelSubmit}>
      <button type="submit" className={css.searchFormButton}>
        <AiOutlineSearch className={css.iconSearch} />
        <span className={css.searchFormButtonLabel}>Search</span>
      </button>
      <input
        value={query}
        onChange={handelInput}
        className={css.searchFormInput}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
