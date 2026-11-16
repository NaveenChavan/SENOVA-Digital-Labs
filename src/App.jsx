import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToHash from "./components/ScrollToHash";
import Home from "./pages/Home";
import UpcomingProjects from "./pages/UpcomingProjects";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0b1120] font-sans text-white">
        <ScrollToHash />
        <Navbar />
        <main id="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upcoming-projects" element={<UpcomingProjects />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  );
}

export default App;
