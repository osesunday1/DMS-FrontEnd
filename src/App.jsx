// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./components/Layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Officers from "./pages/Officers/Officers";
import Locations from "./pages/Locations/Locations";
import AddLocation from "./pages/Locations/AddLocation";
import AddOfficers from "./pages/Officers/AddOfficers";
import Branches from "./pages/Branches/Branches";
import AddBranch from "./pages/Branches/AddBranch";
import Deployments from "./pages/Deployments/Deployments";
import AddDeployment from "./pages/Deployments/AddDeployment";


const App = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/admin" replace />} />

    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="officers" element={<Officers />} />
      <Route path="officers/add" element={<AddOfficers />} />
      <Route path="locations" element={<Locations />} />
      <Route path="locations/add" element={<AddLocation />} />
      <Route path="branches" element={<Branches />} />
      <Route path="branches/add" element={<AddBranch />} /> 
      <Route path="deployments" element={<Deployments />} />
      <Route path="deployments/add" element={<AddDeployment />} />
    </Route>
  </Routes>
);
export default App;