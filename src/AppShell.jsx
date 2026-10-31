import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BottomCTABar from "./components/BottomCTABar";
import WhatsAppButton from "./components/WhatsAppButton";
import NotifyButton from "./components/NotifyButton";
import ScrollToHash from "./components/ScrollToHash";
import Home from "./pages/Home";
import UpcomingProjects from "./pages/UpcomingProjects";

/**
 * Router-agnostic app layout. The browser entry (App.jsx) wraps it in
 * <BrowserRouter>; the build-time prerenderer (entry-server.jsx) wraps it
 * in <StaticRouter>. Both must render identical markup for the same URL,
 * or hydration fails, so keep router choice and browser-only logic out of
 * this file.
 */
const AppShell = () => (
  <div className="min-h-screen bg-[#0B1120] text-white font-sans selection:bg-[#2563EB]/30 selection:text-white">
    <ScrollToHash />
    <Navbar />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upcoming-projects" element={<UpcomingProjects />} />
      </Routes>
    </main>
    <Footer />
    <BottomCTABar />
    <WhatsAppButton />
    <NotifyButton />
  </div>
);

export default AppShell;
