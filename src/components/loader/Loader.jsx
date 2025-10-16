import { useContext } from 'react';
import myContext from '../../context/data/myContext';
import { getThemeColors } from '../../utils/colorUtils';

function Loader({ variant = 'spinner', size = 'md', fullScreen = true }) {
  const { mode } = useContext(myContext);
  const colors = getThemeColors(mode);

  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const containerClass = fullScreen 
    ? 'fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-50'
    : 'flex items-center justify-center p-4';

  const backdropStyle = fullScreen ? {
    backgroundColor: mode === 'dark' ? 'rgba(15, 23, 42, 0.9)' : 'rgba(248, 250, 252, 0.9)',
    backdropFilter: 'blur(8px)'
  } : {};

  // Spinner Variant (Default)
  if (variant === 'spinner') {
    return (
      <div className={containerClass} style={backdropStyle}>
        <div className="flex flex-col items-center gap-4">
          <svg 
            aria-hidden="true" 
            className={`${sizes[size]} animate-spin`}
            style={{ color: colors.primary.main }}
            viewBox="0 0 100 101" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" 
              fill="currentColor" 
              opacity="0.2"
            />
            <path 
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" 
              fill="currentColor"
            />
          </svg>
          {fullScreen && (
            <p 
              className="text-sm font-medium animate-pulse"
              style={{ color: colors.text.secondary }}
            >
              Loading...
            </p>
          )}
        </div>
      </div>
    );
  }

  // Dots Variant
  if (variant === 'dots') {
    return (
      <div className={containerClass} style={backdropStyle}>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full animate-bounce"
              style={{
                backgroundColor: colors.primary.main,
                animationDelay: `${i * 0.15}s`,
                animationDuration: '0.6s'
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Pulse Variant
  if (variant === 'pulse') {
    return (
      <div className={containerClass} style={backdropStyle}>
        <div className="relative">
          <div
            className={`${sizes[size]} rounded-full animate-ping absolute`}
            style={{
              backgroundColor: colors.primary.main,
              opacity: 0.4
            }}
          />
          <div
            className={`${sizes[size]} rounded-full relative`}
            style={{ backgroundColor: colors.primary.main }}
          />
        </div>
      </div>
    );
  }

  // Bars Variant
  if (variant === 'bars') {
    return (
      <div className={containerClass} style={backdropStyle}>
        <div className="flex gap-1 items-end h-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-1.5 bg-current animate-pulse"
              style={{
                backgroundColor: colors.primary.main,
                height: '100%',
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1s',
                transform: `scaleY(${0.3 + Math.random() * 0.7})`
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export default Loader;