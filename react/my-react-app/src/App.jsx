import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AppLayout from "./app/AppLayout";
import { ProtectedRoute } from "./app/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>

    /*
    <div className="min-h-screen grid place-items-center">
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <h1 className="text-2xl font-semibold">Tailwind OK</h1>
        <p className="text-gray-600 mt-2">이 카드가 예쁘게 보이면 성공</p>
      </div>
    </div>
    */
  );
}
