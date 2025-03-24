import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import BillingPage from "./pages/billing";
import TeachersPage from "./pages/teachers";
import ChildrenPage from "./pages/children";
import ClassroomsPage from "./pages/classrooms";
import SettingsPage from "./pages/settings";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/children" element={<ChildrenPage />} />
          <Route path="/classrooms" element={<ClassroomsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
