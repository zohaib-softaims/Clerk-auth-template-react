import { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp } = useSignUp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_link",
        redirect_url: window.location.origin,
      });

      navigate("/verify-email");
    } catch (err) {
      setError(err.errors?.[0]?.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/dashboard",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err) {
      setError(err.errors?.[0]?.message || "Google sign up failed");
    }
  };

  const handleLinkedInSignUp = async () => {
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_linkedin_oidc",
        redirectUrl: "/dashboard",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err) {
      setError(err.errors?.[0]?.message || "LinkedIn sign up failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-5">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Create Account</h2>
        <p className="text-gray-600 text-center text-sm mb-8">Sign up to get started</p>

        <button
          onClick={handleGoogleSignUp}
          className="w-full p-3 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 flex items-center justify-center gap-3 mb-5 hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <button
          onClick={handleLinkedInSignUp}
          className="w-full p-3 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 flex items-center justify-center gap-3 mb-5 hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#0077B5"
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            />
          </svg>
          Continue with LinkedIn
        </button>

        <div className="text-center my-5 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">or</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="John"
              className="w-full p-3 border border-gray-300 rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Doe"
              className="w-full p-3 border border-gray-300 rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full p-3 border border-gray-300 rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              minLength={8}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 hover:transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/40 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <button onClick={() => navigate("/signin")} className="bg-none border-none text-blue-500 font-semibold cursor-pointer ml-1.5 text-sm hover:underline">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
