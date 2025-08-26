import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Whitepaper from "./pages/Whitepaper";
import Tokenomics from "./pages/Tokenomics";
import Community from "./pages/Community";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/whitepaper" element={<Whitepaper />} />
          <Route path="/tokenomics" element={<Tokenomics />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
