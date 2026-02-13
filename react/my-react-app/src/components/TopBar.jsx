import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authStore.jsx";

export default function TopBar() {
  const { user, logout, isAuthed } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link to="/dashboard" className="font-semibold 
        no-underline
        whitespace-nowrap">
          Traffic Test
        </Link>

        <div className="flex items-center gap-3 whitespace-nowrap">
          {isAuthed ? (
            <>
              <span className="text-sm text-gray-600">{user?.name} 님</span>
              <button
                onClick={onLogout}
                className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
