import PropTypes from 'prop-types';

export function Filter({ value, onChange }) {
  return (
    <div>
      <div>
        <p>Find contacts by name</p>
        <input type="text" name="filter" value={value} onChange={onChange} />
      </div>
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
