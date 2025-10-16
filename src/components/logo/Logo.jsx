import { Link } from 'react-router-dom';

const Logo = ({ 
  size = 'medium', 
  showText = true, 
  className = '',
  variant = 'default' // 'default', 'white', 'gradient'
}) => {
  const sizes = {
    small: { icon: 32, text: 'text-xl' },
    medium: { icon: 40, text: 'text-2xl' },
    large: { icon: 56, text: 'text-4xl' },
    xlarge: { icon: 80, text: 'text-5xl' }
  };

  const currentSize = sizes[size] || sizes.medium;

  // Color variants
  const variants = {
    default: {
      gradient1: '#ec4899',
      gradient2: '#be185d',
      text: 'text-pink-600'
    },
    white: {
      gradient1: '#ffffff',
      gradient2: '#f3f4f6',
      text: 'text-white'
    },
    gradient: {
      gradient1: '#ec4899',
      gradient2: '#be185d',
      text: 'bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text text-transparent'
    }
  };

  const colors = variants[variant] || variants.default;

  return (
    <Link to="/" className={`flex items-center gap-2 cursor-pointer ${className}`}>
      {/* Logo Icon */}
      <svg
        width={currentSize.icon}
        height={currentSize.icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 hover:scale-110"
      >
        {/* Gradient Definition */}
        <defs>
          <linearGradient id={`logoGradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.gradient1} />
            <stop offset="100%" stopColor={colors.gradient2} />
          </linearGradient>
          
          {/* Shadow Filter */}
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="0" dy="2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Shopping Bag Shape */}
        <g filter="url(#shadow)">
          {/* Bag Body */}
          <path
            d="M25 35 L25 80 C25 85 28 88 33 88 L67 88 C72 88 75 85 75 80 L75 35 Z"
            fill={`url(#logoGradient-${variant})`}
            stroke={colors.gradient1}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          
          {/* Handle Left */}
          <path
            d="M35 35 C35 28 38 20 45 17 C48 15 52 15 55 17 C62 20 65 28 65 35"
            fill="none"
            stroke={`url(#logoGradient-${variant})`}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          
          {/* Sparkle Elements */}
          <circle cx="45" cy="55" r="2.5" fill="white" opacity="0.9"/>
          <circle cx="55" cy="65" r="2" fill="white" opacity="0.8"/>
          <circle cx="50" cy="72" r="1.5" fill="white" opacity="0.7"/>
          
          {/* Up Arrow (Shopping/Growth) */}
          <path
            d="M50 48 L50 68 M45 53 L50 48 L55 53"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
        </g>

        {/* Top Fold of Bag */}
        <rect
          x="25"
          y="32"
          width="50"
          height="6"
          fill={colors.gradient2}
          rx="1"
        />
      </svg>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-bold ${currentSize.text} ${colors.text} tracking-tight`}>
            ShopUp
          </span>
          {size !== 'small' && (
            <span className="text-xs text-gray-500 font-medium tracking-wider">
              E-COMMERCE
            </span>
          )}
        </div>
      )}
    </Link>
  );
};

export default Logo;
