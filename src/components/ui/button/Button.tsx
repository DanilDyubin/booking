import { ButtonHTMLAttributes } from 'react';

import './button.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  title?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  title,
  variant,
  size,
  className = '',
  disabled = false,
}) => {
  const buttonClass = `btn ${variant} ${size} ${className} `;

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
};

export default Button;
