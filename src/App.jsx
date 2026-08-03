import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import NotifyButton from "./components/NotifyButton";
import ScrollToHash from "./components/ScrollToHash";
import Home from "./pages/Home";
import UpcomingProjects from "./pages/UpcomingProjects";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0A1931] text-[#F6FAFD] font-sans selection:bg-[#4A7FA7]/30 selection:text-white">
        <ScrollToHash />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upcoming-projects" element={<UpcomingProjects />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        <NotifyButton />
      </div>
    </BrowserRouter>
  );
}

export default App;
