import { NavLink, Outlet } from "react-router-dom";
import TopBar from "../components/TopBar.jsx";
import Dashboard from "../pages/Dashboard.jsx";

const navItem = ({ isActive }) =>
  [
    "block rounded-xl px-3 py-2 text-sm",
    isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100",
  ].join(" ");

export default function AppLayout() {
  //   return (
  //     <div className="min-h-screen bg-gray-5">
  //       <TopBar />
  //       <main className="mx-auto max-w-5xl px-4 py-8">
  //         <Outlet />
  //       </main>
  //     </div>
  //   );

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />

      <div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr] px-4">
        {/* Sidebar */}
        <aside className="w-64 mx-auto grid max-w-6xl grid-cols-[200px_1fr] gap-6 px-4 py-6">
          <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5">
            <div className="text-xs font-semibold text-gray-500">MENU</div>
            <button className="mt-3 w-full rounded-xl px-3 py-2 text-left hover:bg-gray-50">
              DASHBOARD
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="min-h-[calc(100vh-56px)] grid place-items-center  max-w-5xl px-2 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
