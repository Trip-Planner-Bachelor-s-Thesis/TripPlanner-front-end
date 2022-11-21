import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LogRegisterContext from "./contexts/log-register-context";
import MainContent from "./components/Layout/MainContent";
import UserProfile from "./components/UserProfile/UserProfile";
import LogRegisterPage from "./pages/LogRegisterPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import NewTripPage from "./pages/NewTripPage";
import AllTripsPage from "./pages/AllTripsPage";
import TripDetailsAllPage from "./pages/TripDetailsAllPage";

function App() {
  const logRegisterContext = useContext(LogRegisterContext);

  return (
    <MainContent>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!logRegisterContext.token && <Route path="/auth" element={<LogRegisterPage />} />}
        <Route path="/profile" element={logRegisterContext.token ? <UserProfile /> : <Navigate to="/auth" />} />
        <Route path="/new-trip" element={logRegisterContext.token ? <NewTripPage /> : <Navigate to="/auth" />} />
        <Route path="/trips" element={logRegisterContext.token ? <AllTripsPage /> : <Navigate to="/auth" />} />
        <Route path="/trips/:tripId" element={logRegisterContext.token ? <TripDetailsAllPage /> : <Navigate to="/auth" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainContent>
  );
}

export default App;
