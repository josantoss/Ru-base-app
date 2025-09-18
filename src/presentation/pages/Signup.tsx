import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Signup: React.FC = () => {
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const googleBtnRef = useRef<HTMLDivElement | null>(null);
  const [isGoogleReady, setIsGoogleReady] = useState(false);
  const linkedInClientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID as string | undefined;
  // const linkedInRedirect = (import.meta.env.VITE_LINKEDIN_REDIRECT_URI as string | undefined) || 'http://localhost:5173/linkedin-callback';
  const isLinkedInConfigured = Boolean(linkedInClientId);

  // Initialize Google button
  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
    let attempts = 0;
    const maxAttempts = 50; // ~5s
    const interval = setInterval(() => {
      attempts++;
      const gsi = (window as any).google?.accounts?.id;
      if (clientId && gsi && googleBtnRef.current) {
        try {
          gsi.initialize({
            client_id: clientId,
            callback: async (response: any) => {
              try {
                await loginWithGoogle(response.credential);
                navigate("/home", { replace: true });
              } catch {
                setError("Google sign-in failed. Please try again.");
              }
            },
          });
          gsi.renderButton(googleBtnRef.current, {
            theme: "outline",
            size: "large",
            shape: "circle",
            text: "continue_with",
            logo_alignment: "center",
          });
          setIsGoogleReady(true);
          clearInterval(interval);
        } catch {
          // keep trying until maxAttempts
        }
      }
      if (attempts >= maxAttempts) {
        clearInterval(interval);
        setIsGoogleReady(false);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [loginWithGoogle, navigate]);


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const urlParams = useMemo(() => new URLSearchParams(window.location.search), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      const username = firstName.trim() || email.trim();
      await signup(username, password, email.trim() || undefined);
      navigate("/login", { replace: true });
    } catch {
      setError("Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-white mb-10">Create a new account</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        {urlParams.get('email') && (
          <div className="text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-md p-3" role="status">
            Prefilled from {urlParams.get('provider')} – verify and complete your account.
          </div>
        )}
        {error && (
          <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3" role="alert">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">First name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Last name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email || urlParams.get('email') || ''}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M3.53 2.47a.75.75 0 1 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-2.14-2.14a12.27 12.27 0 0 0 3.1-4.2.9.9 0 0 0 0-.66C20.88 7.18 16.07 4 12 4a10.1 10.1 0 0 0-4.71 1.16L3.53 2.47ZM12 6.5c3.3 0 7.47 2.66 9.43 6.5a10.86 10.86 0 0 1-2.68 3.52l-2.2-2.2A4.5 4.5 0 0 0 9.68 8.45L7.7 6.47A8.55 8.55 0 0 1 12 6.5Zm0 11c-3.3 0-7.47-2.66-9.43-6.5a10.87 10.87 0 0 1 4.04-4.39l2.06 2.06A4.5 4.5 0 0 0 14.33 14l2.16 2.16A8.55 8.55 0 0 1 12 17.5Z"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 4c4.07 0 8.88 3.18 11.05 8.03a.9.9 0 0 1 0 .66C20.88 17.82 16.07 21 12 21S3.12 17.82.95 12.97a.9.9 0 0 1 0-.66C3.12 7.18 7.93 4 12 4Zm0 2c-3.3 0-7.47 2.66-9.43 6.5C4.53 16.34 8.7 19 12 19s7.47-2.66 9.43-6.5C19.47 8.66 15.3 6 12 6Zm0 2.75A4.25 4.25 0 1 1 7.75 13 4.25 4.25 0 0 1 12 8.75Zm0 2A2.25 2.25 0 1 0 14.25 13 2.25 2.25 0 0 0 12 10.75Z"/></svg>
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-32"
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>

        <div className="flex items-center my-2">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-3 text-gray-500 text-sm">or sign up with</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="flex items-center space-x-4">
          {/* LinkedIn OAuth: block navigation if not configured to avoid LinkedIn error page */}
          {isLinkedInConfigured ? (
            <a
              href="/auth/linkedin/start"
              className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 shadow-sm font-semibold"
              title="Sign up with LinkedIn"
            >
              in
            </a>
          ) : (
            <a
              href="/auth/linkedin/start"
              className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 shadow-sm font-semibold"
              title="LinkedIn not configured"
            >
              in
            </a>
          )}
          {/* Google rendered button container */}
          <div ref={googleBtnRef} className="flex items-center justify-center" />
          {/* Optional: Redirect-based Google OAuth (opens Google account chooser)
              Works when VITE_GOOGLE_OAUTH_CLIENT_ID and VITE_GOOGLE_REDIRECT_URI configured for implicit/hybrid flow */}
          { (import.meta.env.VITE_GOOGLE_REDIRECT_URI && import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID) && (
            <a href="/auth/google/start" className="h-11 px-4 rounded-full bg-white shadow-sm border border-gray-200 flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.731 31.91 29.236 35 24 35 16.82 35 11 29.18 11 22S16.82 9 24 9c3.59 0 6.84 1.357 9.348 3.57l5.657-5.657C34.523 3.053 29.477 1 24 1 10.745 1 0 11.745 0 25s10.745 24 24 24 24-10.745 24-24c0-1.602-.165-3.162-.389-4.917z"/>
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.4 16.074 18.846 13 24 13c3.59 0 6.84 1.357 9.348 3.57l5.657-5.657C34.523 3.053 29.477 1 24 1 15.317 1 7.797 5.63 3.565 12.315l2.741 2.376z"/>
                <path fill="#4CAF50" d="M24 49c5.164 0 9.86-1.977 13.409-5.197l-6.197-5.238C29.593 40.428 26.942 41 24 41c-5.214 0-9.692-3.06-11.548-7.441l-6.5 5.008C9.152 44.75 16.033 49 24 49z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.352 3.174-4.167 5.647-7.794 6.565l.006.004 6.197 5.238C36.87 42.786 48 35 48 25c0-1.602-.165-3.162-.389-4.917z"/>
              </svg>
              <span className="text-sm text-gray-700">Continue with Google</span>
            </a>
          )}
          {/* Fallback simple button shown if SDK or clientId missing */}
          {!isGoogleReady && (
            <button
              type="button"
              onClick={() => setError("Google Sign-In not configured. Set VITE_GOOGLE_CLIENT_ID and reload.")}
              className="h-11 px-4 rounded-full bg-white shadow-sm border border-gray-200 flex items-center space-x-2"
              title="Google sign-in"
              aria-label="Sign in with Google"
            >
              {/* Google 'G' logo (official multi-color) */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.731 31.91 29.236 35 24 35 16.82 35 11 29.18 11 22S16.82 9 24 9c3.59 0 6.84 1.357 9.348 3.57l5.657-5.657C34.523 3.053 29.477 1 24 1 10.745 1 0 11.745 0 25s10.745 24 24 24 24-10.745 24-24c0-1.602-.165-3.162-.389-4.917z"/>
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.4 16.074 18.846 13 24 13c3.59 0 6.84 1.357 9.348 3.57l5.657-5.657C34.523 3.053 29.477 1 24 1 15.317 1 7.797 5.63 3.565 12.315l2.741 2.376z"/>
                <path fill="#4CAF50" d="M24 49c5.164 0 9.86-1.977 13.409-5.197l-6.197-5.238C29.593 40.428 26.942 41 24 41c-5.214 0-9.692-3.06-11.548-7.441l-6.5 5.008C9.152 44.75 16.033 49 24 49z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.352 3.174-4.167 5.647-7.794 6.565l.006.004 6.197 5.238C36.87 42.786 48 35 48 25c0-1.602-.165-3.162-.389-4.917z"/>
              </svg>
              <span className="text-sm text-gray-700">Continue with Google</span>
            </button>
          )}
        </div>

        <div className="pt-2">
          <Link to="/login" className="text-blue-600 hover:underline text-sm">I already have an account</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;

 
