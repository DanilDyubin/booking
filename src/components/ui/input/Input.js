import './styles.scss';

export const Input = ({ type, size = '', placeholder, name, value, label, onChange }) => {
  const inputClass = `input ${size}`;
  return (
    <div className="input-field">
      <input
        id={name}
        type={type}
        className={inputClass}
        required
        name={name}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={name} className="label">
        {label}
      </label>
    </div>
  );
};

export default Input;
