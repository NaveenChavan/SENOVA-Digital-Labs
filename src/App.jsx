import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BottomCTABar from "./components/BottomCTABar";
import WhatsAppButton from "./components/WhatsAppButton";
import NotifyButton from "./components/NotifyButton";
import ScrollToHash from "./components/ScrollToHash";
import Home from "./pages/Home";
import UpcomingProjects from "./pages/UpcomingProjects";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
