import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../fireabase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';
import { getThemeColors, getThemeShadow } from '../../utils/colorUtils';
import Logo from '../../components/logo/Logo';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const context = useContext(myContext);
    const { loading, setLoading, mode } = context;

    const navigate = useNavigate();
    const colors = getThemeColors(mode);

    const signup = async () => {
        if (name === "" || email === "" || password === "") {
            return toast.error("All fields are required");
        }

        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);

            const user = {
                name: name,
                uid: users.user.uid,
                email: users.user.email,
                time : Timestamp.now()
            }
            const userRef = collection(fireDB, "users")
            await addDoc(userRef, user);
            toast.success("Signup Successful");
            setName("");
            setEmail("");
            setPassword("");
            setLoading(false);
            navigate('/login')

        } catch (error) {
            toast.error("Signup failed. Please try again.");
            setLoading(false);
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
                    src="/image3.jpg" 
                    alt="Signup Background"
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
            
            {loading && <Loader />}
            
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
                        Create Account
                    </h2>
                    <p 
                        className="text-sm mt-2"
                        style={{ color: colors.text.secondary }}
                    >
                        Join us and start shopping today
                    </p>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2" 
                            style={{ color: colors.text.secondary }}>
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            name='name'
                            className='px-4 py-3 w-full rounded-lg outline-none border-2 transition-all duration-300'
                            style={{
                                backgroundColor: colors.surface.main,
                                color: colors.text.primary,
                                borderColor: colors.border.main,
                            }}
                            onFocus={(e) => e.target.style.borderColor = colors.border.focus}
                            onBlur={(e) => e.target.style.borderColor = colors.border.main}
                            placeholder='Enter your full name'
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2" 
                            style={{ color: colors.text.secondary }}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && signup()}
                            className='px-4 py-3 w-full rounded-lg outline-none border-2 transition-all duration-300'
                            style={{
                                backgroundColor: colors.surface.main,
                                color: colors.text.primary,
                                borderColor: colors.border.main,
                            }}
                            onFocus={(e) => e.target.style.borderColor = colors.border.focus}
                            onBlur={(e) => e.target.style.borderColor = colors.border.main}
                            placeholder='Create a strong password'
                        />
                    </div>
                    <button
                        onClick={signup}
                        disabled={loading}
                        className='w-full text-white font-bold px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed'
                        style={{
                            backgroundColor: colors.accent.main,
                            boxShadow: `0 4px 14px 0 ${colors.accent.main}40`,
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = colors.accent.hover}
                        onMouseLeave={(e) => e.target.style.backgroundColor = colors.accent.main}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </div>
                <div className='text-center mt-6'>
                    <p style={{ color: colors.text.secondary }}>
                        Already have an account?{' '}
                        <Link 
                            to={'/login'} 
                            className='font-bold transition-colors duration-300'
                            style={{ color: colors.accent.main }}
                            onMouseEnter={(e) => e.target.style.color = colors.accent.hover}
                            onMouseLeave={(e) => e.target.style.color = colors.accent.main}>
                            Login
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
                        <span>Your data is secure</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup