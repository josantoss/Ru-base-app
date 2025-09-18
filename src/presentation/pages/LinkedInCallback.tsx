import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const LinkedInCallback: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithSocialProfile } = useAuth();

  useEffect(() => {
  (async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const error = params.get("error");
    if (error) {
      navigate("/signup", { replace: true });
      return;
    }
    if (code) {
      try {
        const exchangeUrl = import.meta.env.VITE_LINKEDIN_TOKEN_EXCHANGE_URL as string | undefined;
        if (exchangeUrl) {
          const res = await fetch(`${exchangeUrl}?code=${encodeURIComponent(code)}`);
          const profile = await res.json();
          await loginWithSocialProfile("linkedin", { id: profile.sub || profile.id, email: profile.email, name: profile.name });
          navigate("/home", { replace: true });
          return;
        }
      } catch {
        // ignore and fall through
      }
      navigate("/signup", { replace: true });
    }
  })();
}, [navigate, loginWithSocialProfile]);

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <p>Processing LinkedIn sign-in...</p>
    </div>
  );
};

export default LinkedInCallback;


