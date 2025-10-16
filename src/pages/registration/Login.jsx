import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import myContext from '../../context/data/myContext'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../fireabase/FirebaseConfig';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import { getThemeColors, getThemeShadow } from '../../utils/colorUtils';
import Logo from '../../components/logo/Logo';

function Login() {
    const context = useContext(myContext)
    const {loading, setLoading, mode} = context;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const colors = getThemeColors(mode);

    const login = async () => {
        if (!email || !password) {
            toast.error("Please fill all fields");
            return;
        }
        
        setLoading(true)
        try {
            const result = await signInWithEmailAndPassword(auth,email,password);
            toast.success("Login successful!");
            localStorage.setItem('user', JSON.stringify(result))
            navigate('/')
            setLoading(false)
            
        } catch (error) {
            setLoading(false)
            toast.error("Invalid email or password");
        }

    }
   
    return (
        <div className='flex justify-center items-center min-h-screen relative overflow-hidden' 
            style={{
                backgroundColor: colors.background.primary
            }}>
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/image2.jpg" 
                    alt="Login Background"
                    className="w-full h-full object-cover"
                    style={{ filter: mode === 'dark' ? 'brightness(0.7)' : 'brightness(0.9)' }}
                />
                <div className="absolute inset-0" 
                    style={{ 
                        background: mode === 'dark' 
                            ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.9) 100%)'
                            : 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.9) 100%)'
                    }}>
                </div>
            </div>
            
            {loading && <Loader/>}
            
            <div className='px-10 py-10 rounded-2xl w-full max-w-md relative z-10 backdrop-blur-sm animate-fade-in'
                style={{
                    backgroundColor: colors.surface.main,
                    boxShadow: getThemeShadow(mode, 'xl'),
                    border: `1px solid ${colors.border.main}`,
                }}>
                
                {/* Logo Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <Logo 
                            size="large" 
                            showText={true} 
                            variant={mode === 'dark' ? 'white' : 'gradient'}
                        />
                    </div>
                    <h2 
                        className="text-2xl font-bold"
                        style={{ color: colors.text.primary }}
                    >
                        Welcome Back
                    </h2>
                    <p 
                        className="text-sm mt-2"
                        style={{ color: colors.text.secondary }}
                    >
                        Sign in to continue shopping
                    </p>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2" 
                            style={{ color: colors.text.secondary }}>
                            Email Address
                        </label>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            name='email'
                            className='px-4 py-3 w-full rounded-lg outline-none border-2 transition-all duration-300'
                            style={{
                                backgroundColor: colors.surface.main,
                                color: colors.text.primary,
                                borderColor: colors.border.main,
                            }}
                            onFocus={(e) => e.target.style.borderColor = colors.border.focus}
                            onBlur={(e) => e.target.style.borderColor = colors.border.main}
                            placeholder='Enter your email'
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2" 
                            style={{ color: colors.text.secondary }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && login()}
                            className='px-4 py-3 w-full rounded-lg outline-none border-2 transition-all duration-300'
                            style={{
                                backgroundColor: colors.surface.main,
                                color: colors.text.primary,
                                borderColor: colors.border.main,
                            }}
                            onFocus={(e) => e.target.style.borderColor = colors.border.focus}
                            onBlur={(e) => e.target.style.borderColor = colors.border.main}
                            placeholder='Enter your password'
                        />
                    </div>
                    <button
                        onClick={login}
                        disabled={loading}
                        className='w-full text-white font-bold px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed'
                        style={{
                            backgroundColor: colors.primary.main,
                            boxShadow: `0 4px 14px 0 ${colors.primary.main}40`,
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = colors.primary.hover}
                        onMouseLeave={(e) => e.target.style.backgroundColor = colors.primary.main}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </div>
                <div className='text-center mt-6'>
                    <p style={{ color: colors.text.secondary }}>
                        Don&apos;t have an account?{' '}
                        <Link 
                            to={'/signup'} 
                            className='font-bold transition-colors duration-300'
                            style={{ color: colors.primary.main }}
                            onMouseEnter={(e) => e.target.style.color = colors.primary.hover}
                            onMouseLeave={(e) => e.target.style.color = colors.primary.main}>
                            Sign up
                        </Link>
                    </p>
                </div>
                
                {/* Trust Badge */}
                <div className="mt-6 pt-6 border-t" style={{ borderColor: colors.border.main }}>
                    <div className="flex items-center justify-center gap-2 text-sm" 
                        style={{ color: colors.text.tertiary }}>
                        <svg className="w-5 h-5" fill={colors.semantic.success} viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Secure Login</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login