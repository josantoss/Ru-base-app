import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const GoogleCallback: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithSocialProfile } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("access_token");
        const idToken = params.get("id_token");
        // If implicit flow was used (not recommended for production), profile can be fetched via userinfo with access token.
        if (accessToken) {
          const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          const profile = await res.json();
          await loginWithSocialProfile("google", { sub: profile.sub, email: profile.email, name: profile.name });
        } else if (idToken) {
          const payload = JSON.parse(atob(idToken.split(".")[1]));
          await loginWithSocialProfile("google", { sub: payload.sub, email: payload.email, name: payload.name });
        }
        navigate("/home", { replace: true });
      } catch {
        navigate("/signup", { replace: true });
      }
    })();
  }, [loginWithSocialProfile, navigate]);

  return <div className="p-6 max-w-3xl mx-auto text-white">Signing you in with Google…</div>;
};

export default GoogleCallback;


