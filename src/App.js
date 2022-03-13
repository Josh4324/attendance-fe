import { Route, Routes, BrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import "./App.css";
import Home from "./pages/Home";
import Approval from "./pages/Approval";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/approval" element={<Approval />} />
      </Routes>
      <NotificationContainer />
    </BrowserRouter>
  );
}

export default App;
