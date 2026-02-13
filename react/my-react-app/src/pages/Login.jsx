import { useState } from "react";
import { useAuth } from "../auth/authStore.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = email.trim().length > 0 && password.trim().length > 0;

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Dummy authentication logic
    if (!email.trim() || !password.trim()) {
      setError("Both email and password are required");
      return;
    }

    setBusy(true);
    try {
      await login(email, password);

      login({
        token: "demo-token",
        user: { name: email.split("@")[0] || "user" },
      });

      navigate("/dashboard", { replace: true });
    } catch {
      setError("Login failed.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="min-h-[calc(100vh-56px)] grid place-items-center px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">로그인</h1>
          <p className="text-sm text-gray-600">계정으로 접속해 주세요.</p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">이메일</span>
            <input
              className="h-12 w-full rounded-xl border px-4 outline-none focus:ring-2 focus:ring-black/10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              autoComplete="username"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">비밀번호</span>
            <input
              className="h-12 w-full rounded-xl border px-4 outline-none focus:ring-2 focus:ring-black/10"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>

          {error && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit || busy}
            className="
            mt-2 h-12 rounded-xl bg-black px-6 text-sm font-medium text-white
            hover:opacity-90
            disabled:bg-gray-300 disabled:text-gray-500
            disabled:opacity-100
            "
          >
            {busy ? "로그인 중..." : "로그인"}
          </button>

          <div className="pt-2 text-center text-sm text-gray-600">
            계정이 없으신가요?{" "}
            <button
              type="button"
              className="font-semibold text-black hover:underline"
              onClick={() => alert("회원가입 화면은 다음 단계에서 추가합니다.")}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
