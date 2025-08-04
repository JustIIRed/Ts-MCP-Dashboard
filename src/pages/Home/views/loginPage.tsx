import { useState, type FormEvent } from "react";
import { useAuthStore } from "../../../store/Zust/useAuthStore";

function loginPage() {
  const { login, isLoggingIn, loginGuest } = useAuthStore();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login?.(formData);
  };
  const handleGuestLogin = async () => {
    loginGuest?.();
  };
  return (
    <div className="h-screen grid lg:grid-cols-2 relative">
      {/* App version at absolute top left */}
      <span
        className="absolute"
        style={{
          top: "1px",
          left: "1px",
          zIndex: 50,
          background: "var(--fallback-b1,oklch(var(--b1)/1))",
          color: "var(--fallback-bc,#a3a3a3)",
          fontSize: "0.95em",
          fontWeight: 600,
          padding: "2px 10px",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          opacity: 0.85,
          letterSpacing: "0.04em",
          pointerEvents: "none",
          userSelect: "none",
          width: "fit-content",
          position: "absolute",
        }}
      >
        v0.0.0
      </span>
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Centered MCP title */}
          <div className="text-center mb-10">
            <h1 className="text-8xl font-bold tracking-tight">M.C.P</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-base-content/40">📧</span>
                </div>
                <input
                  type="email"
                  className="w-full px-10 py-2 bg-transparent border border-base-300 rounded-lg focus:outline-none focus:border-primary/50"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  minLength={1}
                  style={{ WebkitAppearance: "none", appearance: "none" }}
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-base-content/40">🔒</span>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-10 py-2 bg-transparent border border-base-300 rounded-lg focus:outline-none focus:border-primary/50"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  minLength={1}
                  style={{ WebkitAppearance: "none", appearance: "none" }}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  <span className="text-base-content/40">
                    {showPassword ? "🙈" : "👁️"}
                  </span>
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={
                isLoggingIn ||
                !formData.email.trim() ||
                !formData.password.trim()
              }
            >
              {isLoggingIn ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
          <button
            type="button"
            className="btn btn-outline w-full mt-2"
            onClick={handleGuestLogin}
          >
            Continue as Guest
          </button>
        </div>
      </div>
      <div className="hidden lg:block bg-base-200" />
    </div>
  );
}

export default loginPage;
