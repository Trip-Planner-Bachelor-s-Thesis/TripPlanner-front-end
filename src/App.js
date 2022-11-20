import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import LogRegisterPage from "./pages/LogRegisterPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import NewTripPage from "./pages/NewTripPage";
import LogRegisterContext from "./contexts/log-register-context";
import AllTripsPage from "./pages/AllTripsPage";
import TripDetailsAllPage from "./pages/TripDetailsAllPage";

function App() {
  const logRegisterContext = useContext(LogRegisterContext);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!logRegisterContext.token && <Route path="/auth" element={<LogRegisterPage />} />}
        <Route path="/profile" element={logRegisterContext.token ? <UserProfile /> : <Navigate to="/auth" />} />
        <Route path="/new-trip" element={logRegisterContext.token ? <NewTripPage /> : <Navigate to="/auth" />} />
        <Route path="/trips" element={logRegisterContext.token ? <AllTripsPage /> : <Navigate to="/auth" />} />
        <Route path="/trips/:tripId" element={logRegisterContext.token ? <TripDetailsAllPage /> : <Navigate to="/auth" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
