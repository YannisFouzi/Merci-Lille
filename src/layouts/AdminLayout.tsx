import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavigation from "../components/Admin/AdminNavigation";

const AdminLayout: React.FC = () => {
  return (
    <div>
      <AdminNavigation />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
