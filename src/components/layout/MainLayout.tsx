import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

const MainLayout = ({ children, title = "Dashboard" }: MainLayoutProps) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header title={title} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>

        {/* Footer */}
        <footer className="border-t bg-card p-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} KidsCare Daycare Management System
          </p>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
