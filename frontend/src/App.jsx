import { BrowserRouter, Routes, Route } from "react-router-dom";

import Experts from "./pages/Experts";
import ExpertDetail from "./pages/ExpertDetail";
import MyBookings from "./pages/MyBookings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Experts />} />

        <Route
          path="/experts/:id"
          element={<ExpertDetail />}
        />

        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;