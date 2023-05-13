import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <button type="button" className={css.button} onClick={() => onClick()}>
      Learn more
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
