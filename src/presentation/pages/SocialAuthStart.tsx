import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";

type Provider = "google" | "linkedin";

const SocialAuthStart: React.FC = () => {
  const { provider } = useParams<{ provider: Provider }>();
  const navigate = useNavigate();
  // const { loginWithSocialProfile } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!provider) return;
    tryRedirect(provider as Provider);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  const tryRedirect = (prov: Provider) => {
    if (prov === "google") {
      const client = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID as string | undefined;
      const redirect = import.meta.env.VITE_GOOGLE_REDIRECT_URI as string | undefined;
      if (client && redirect) {
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=token%20id_token&client_id=${encodeURIComponent(client)}&redirect_uri=${encodeURIComponent(redirect)}&scope=${encodeURIComponent('openid email profile')}&prompt=select_account&nonce=${Date.now()}`;
        window.location.href = authUrl;
        return true;
      }
    }
    if (prov === "linkedin") {
      const client = import.meta.env.VITE_LINKEDIN_CLIENT_ID as string | undefined;
      const redirect = (import.meta.env.VITE_LINKEDIN_REDIRECT_URI as string | undefined) || 'http://localhost:5173/linkedin-callback';
      if (client) {
        const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${encodeURIComponent(client)}&redirect_uri=${encodeURIComponent(redirect)}&scope=${encodeURIComponent('openid profile email')}`;
        window.location.href = authUrl;
        return true;
      }
    }
    return false;
  };

  const onSubmitMock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!provider) return;
    // Do NOT auto-login without real provider verification. Redirect to signup to create an account.
    const params = new URLSearchParams({ email, name, provider });
    navigate(`/signup?${params.toString()}`);
  };

  if (!provider) return null;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h1 className="text-xl font-semibold text-gray-900">Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}</h1>
        <p className="text-sm text-gray-600">Real {provider} OAuth is not configured. Enter your {provider} email to proceed to account creation.</p>
        {/* {error && (
          <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3" role="alert">{error}</div>
        )} */}
        <form onSubmit={onSubmitMock} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name (optional)"
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button type="submit" className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default SocialAuthStart;


