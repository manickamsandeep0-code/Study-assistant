import React, { useState, useEffect } from 'react';
import { signInWithGoogle } from '../services/authService';
import { UserProfile } from '../types';

interface LoginProps {
  onLogin: (user: UserProfile) => void;
}

// A custom hook for mouse position to create interactive effects
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
};

// A custom hook for the typing animation effect
const useTypingEffect = (text: string, duration = 50, start = false) => {
    const [displayedText, setDisplayedText] = useState('');
  
    useEffect(() => {
        if (!start) return;
        setDisplayedText(''); 
        let i = 0;
        const intervalId = setInterval(() => {
            setDisplayedText(text.slice(0, i + 1));
            i++;
            if (i > text.length) {
                clearInterval(intervalId);
            }
        }, duration);

        return () => clearInterval(intervalId);
    }, [text, duration, start]);

    return displayedText;
};


const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state after a short delay to trigger entry animations
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const subtitleText = "Your Smartest Study Companion";
  const typedSubtitle = useTypingEffect(subtitleText, 50, isMounted);


  const { x, y } = useMousePosition();
  
  // Calculate parallax offsets for background blobs
  const parallax = (factor: number) => ({
    transform: `translate(${(x - window.innerWidth / 2) * factor}px, ${(y - window.innerHeight / 2) * factor}px)`
  });

  const handleGoogleLogin = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const userData = await signInWithGoogle();
      if (userData) {
        const user: UserProfile = {
          id: userData.uid,
          name: userData.displayName,
          email: userData.email,
          photoURL: userData.photoURL,
        };
        onLogin(user);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Main container with animated gradient background
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#161b22] text-white overflow-hidden relative">
      {/* Animated Background Blobs with Parallax Effect */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div style={parallax(-0.02)} className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-blob"></div>
        <div style={parallax(-0.03)} className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div style={parallax(-0.015)} className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Content wrapper with z-index to stay on top */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        {/* Header Section */}
        <div className={`text-center mb-10 max-w-3xl transition-all duration-1000 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Schedule GPT 2.0
          </h1>
          <h2 className={`mt-4 text-3xl font-bold sm:text-4xl text-gray-200 transition-opacity duration-1000 ease-out delay-200 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
            {typedSubtitle}
            <span className="animate-ping">|</span>
          </h2>
          <p className={`mt-6 text-lg text-blue-400 font-medium cursor-pointer hover:underline transition-all duration-1000 ease-out delay-300 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
            Learn Smarter, Rest Better, Grow Faster.
          </p>
          <p className={`mt-4 max-w-xl mx-auto text-center text-gray-400 leading-relaxed transition-all duration-1000 ease-out delay-[400ms] ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
            Discover personalized learning paths, summarize any content in seconds, and stay on track with smart study schedules and mindful breaks — all designed to make you learn 10x better and live healthier.
          </p>
        </div>

        {/* The main card with glassmorphism effect and interactive glow */}
        <div 
          className={`relative w-full max-w-sm p-8 space-y-6 bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700 transition-all duration-1000 ease-out delay-[500ms] ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
          {/* Mouse-based Glow Effect */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ background: `radial-gradient(400px circle at ${x}px ${y}px, rgba(45, 212, 191, 0.15), transparent 50%)`}}></div>

          <div className="relative flex justify-center animate-float">
              <div className="bg-blue-600/20 p-3 rounded-full border border-blue-500/50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
              </div>
          </div>
          
          <h2 className="relative text-xl font-semibold text-center text-gray-200">
            Get Started Today
          </h2>
          
          {/* Login Button and Error Message Section */}
          <div className="relative space-y-4 pt-2">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className={`
                shimmer-button flex items-center justify-center w-full px-6 py-3 
                text-base font-medium text-white 
                bg-blue-600 rounded-lg 
                transition-all duration-300 ease-in-out
                focus:outline-none focus:ring-4 focus:ring-blue-500/50
                shadow-lg shadow-blue-600/30
                ${isLoading 
                  ? 'opacity-70 cursor-not-allowed' 
                  : 'hover:bg-blue-700 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-600/40'
                }
              `}
            >
              {/* Google Icon SVG */}
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span>
                {isLoading ? 'Signing in...' : 'Sign in with Google'}
              </span>
            </button>
            
            {/* Error Message Display */}
            {error && (
              <p className="text-sm text-center text-red-400 animate-pulse">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .animate-blob { animation: blob 10s infinite; }
        .animation-delay-2000 { animation-delay: -3s; }
        .animation-delay-4000 { animation-delay: -6s; }
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { translateY(0px); }
        }

        .shimmer-button {
            position: relative;
            overflow: hidden;
        }

        .shimmer-button::after {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            bottom: -50%;
            left: -50%;
            background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255,.2) 50%, rgba(255, 255, 255, 0) 100%);
            transform: rotateZ(60deg) translate(-5em, 7.5em);
        }
      
        .shimmer-button:hover::after, .shimmer-button:focus::after {
            animation: shimmer 1s forwards;
        }

        @keyframes shimmer {
            100% {
                transform: rotateZ(60deg) translate(1em, -9em);
            }
        }
      `}</style>
    </div>
  );
};

export default Login;