import { useContext, useState } from 'react';
import myContext from '../../context/data/myContext';
import { Link } from 'react-router-dom';
import { getThemeColors } from '../../utils/colorUtils';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { toast } from 'react-toastify';

function Footer() {
  const context = useContext(myContext);
  const { mode } = context;
  const colors = getThemeColors(mode);
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thanks for subscribing to our newsletter!');
      setEmail('');
    }
  };

  const socialLinks = [
    { icon: FaFacebookF, url: '#', label: 'Facebook', color: '#1877f2' },
    { icon: FaTwitter, url: '#', label: 'Twitter', color: '#1da1f2' },
    { icon: FaInstagram, url: '#', label: 'Instagram', color: '#e4405f' },
    { icon: FaLinkedinIn, url: '#', label: 'LinkedIn', color: '#0077b5' },
    { icon: FaYoutube, url: '#', label: 'YouTube', color: '#ff0000' },
  ];

  return (
    <footer 
      className="relative mt-20"
      style={{ 
        backgroundColor: colors.surface.main,
        borderTop: `1px solid ${colors.border.main}`,
      }}
    >
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to={'/'} className="inline-block">
              <h1 
                className="text-3xl font-bold transition-all duration-300 hover:scale-105"
                style={{ 
                  color: colors.text.primary,
                  textShadow: `0 0 20px ${colors.primary.main}40`,
                }}
              >
                SHOP UP
              </h1>
            </Link>
            <p 
              className="text-sm leading-relaxed"
              style={{ color: colors.text.secondary }}
            >
              Your one-stop destination for quality products. Shop with confidence and enjoy a seamless shopping experience.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    style={{ 
                      backgroundColor: colors.surface.hover,
                      color: colors.text.secondary,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = social.color;
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.boxShadow = `0 4px 12px ${social.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.surface.hover;
                      e.currentTarget.style.color = colors.text.secondary;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ color: colors.text.primary }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', to: '/' },
                { label: 'All Products', to: '/allproducts' },
                { label: 'My Orders', to: '/order' },
                { label: 'Shopping Cart', to: '/cart' },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="inline-block text-sm transition-all duration-300 hover:translate-x-2"
                    style={{ color: colors.text.secondary }}
                    onMouseEnter={(e) => e.target.style.color = colors.primary.main}
                    onMouseLeave={(e) => e.target.style.color = colors.text.secondary}
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ color: colors.text.primary }}
            >
              Customer Service
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'About Us', to: '/about' },
                { label: 'Contact Us', to: '/contact' },
                { label: 'Return Policy', to: '/returnpolicy' },
                { label: 'Privacy Policy', to: '/privacypolicy' },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="inline-block text-sm transition-all duration-300 hover:translate-x-2"
                    style={{ color: colors.text.secondary }}
                    onMouseEnter={(e) => e.target.style.color = colors.primary.main}
                    onMouseLeave={(e) => e.target.style.color = colors.text.secondary}
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ color: colors.text.primary }}
            >
              Stay Connected
            </h3>
            
            {/* Newsletter Form */}
            <form onSubmit={handleNewsletterSubmit} className="mb-6">
              <p 
                className="text-sm mb-3"
                style={{ color: colors.text.secondary }}
              >
                Subscribe to get special offers and updates!
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="flex-1 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 transition-all duration-300"
                  style={{
                    backgroundColor: colors.background.primary,
                    color: colors.text.primary,
                    border: `1px solid ${colors.border.main}`,
                  }}
                  onFocus={(e) => e.target.style.borderColor = colors.primary.main}
                  onBlur={(e) => e.target.style.borderColor = colors.border.main}
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: colors.primary.main,
                    color: 'white',
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = colors.primary.hover}
                  onMouseLeave={(e) => e.target.style.backgroundColor = colors.primary.main}
                >
                  Subscribe
                </button>
              </div>
            </form>

            {/* Contact Info */}
            <div className="space-y-2">
              {[
                { icon: HiMail, text: 'support@shopup.com' },
                { icon: HiPhone, text: '+91 1800-123-4567' },
                { icon: HiLocationMarker, text: 'Mumbai, India' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index} 
                    className="flex items-center gap-2 text-sm"
                    style={{ color: colors.text.secondary }}
                  >
                    <Icon size={16} style={{ color: colors.primary.main }} />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8" style={{ borderTop: `1px solid ${colors.border.main}` }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p 
              className="text-sm"
              style={{ color: colors.text.secondary }}
            >
              Secure Payment Methods
            </p>
            <img 
              src="https://ecommerce-sk.vercel.app/pay.png" 
              alt="Payment Methods" 
              className="h-8 opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div 
        className="py-6"
        style={{ 
          backgroundColor: colors.background.primary,
          borderTop: `1px solid ${colors.border.main}`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p 
              className="text-sm text-center md:text-left"
              style={{ color: colors.text.secondary }}
            >
              © {new Date().getFullYear()} SHOP UP. All rights reserved. Made with ❤️ in India
            </p>
            <div className="flex gap-4 text-sm">
              <Link
                to="/privacypolicy"
                className="transition-colors duration-300"
                style={{ color: colors.text.secondary }}
                onMouseEnter={(e) => e.target.style.color = colors.primary.main}
                onMouseLeave={(e) => e.target.style.color = colors.text.secondary}
              >
                Privacy
              </Link>
              <span style={{ color: colors.border.main }}>|</span>
              <Link
                to="/returnpolicy"
                className="transition-colors duration-300"
                style={{ color: colors.text.secondary }}
                onMouseEnter={(e) => e.target.style.color = colors.primary.main}
                onMouseLeave={(e) => e.target.style.color = colors.text.secondary}
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;