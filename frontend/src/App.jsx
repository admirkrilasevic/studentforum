import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Account from "./pages/Account";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Navigate to="/home" replace />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/home/:department" element={<Home />} />
          <Route path="/home/:department/:courseId" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/:section" element={<Account />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
