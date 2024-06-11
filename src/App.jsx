import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppProvider from "./context.jsx";
import NotFound from "./pages/NotFound";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { AuthProvider } from "./authContext";
import UserModal from "./components/UserModal";
import Forgotpassword from "./auth/Forgotpassword";
import GameSlide from "./pages/GameSlide";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <ToastContainer
            autoClose={2000}
            position="top-center"
            pauseOnHover
            theme="colored"
          />
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/game/:id" element={<GameSlide />} />
            <Route path="/forgotpassword" element={<Forgotpassword />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
