import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../../contexts/ThemeContext';

interface CustomButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
  active?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  className = '',
  active = false,
  disabled = false,
  loading = false,
}) => {
  const theme = useSelector((state:any) => state.theme.theme);
  const { colors } = useContext(ThemeContext);
  const currTheme = colors[theme];

  return (
    <button
      onClick={disabled || loading ? undefined : onClick}
      className={`rounded-md py-2 px-4 font-bold text-lg flex items-center justify-center group ${className}`}
      style={{
        backgroundColor: active ? currTheme.background : colors[theme].background,
        borderColor: colors[theme].borderColor,
        color: colors[theme].textColor,
        opacity: disabled || loading ? 0.7 : 1,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        borderWidth: 1,
        borderStyle: 'solid',
        transition: 'background-color 0.3s, border-color 0.3s, color 0.3s',
      }}
      disabled={disabled || loading}
    >
      {loading ? (
        <div
          style={{
            border: `3px solid ${colors[theme].borderColor}`,
            borderTopColor: 'transparent',
            borderRadius: '50%',
            height: 28,
            width: 28,
            animation: 'spin 1s linear infinite',
          }}
        />
      ) : (
        label
      )}
    </button>
  );
};

export default CustomButton;