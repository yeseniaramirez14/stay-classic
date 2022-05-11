import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ServicesList from './Services/ServicesList';
import ServiceForm from './Services/ServiceForm';
import TechniciansList from './Services/TechniciansList';
import TechnicianForm from './Services/TechnicianForm';
import SalesRepList from './SalesRepList';
import SalesRepForm from './SalesRepForm';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import ServiceHistory from './Services/ServiceHistory';
import SalesRecordForm from './SalesRecordFrom';
import SalesRecordList from './SalesRecordList';
import ManufacturersList from './Inventory/ManufacturersList';
import VehicleModelsList from './Inventory/VehicleModelsList';
import AutomobilesList from './Inventory/AutomobilesList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="services">
            <Route path="" element={<ServicesList />} />
            <Route path="new/" element={<ServiceForm />} />
          </Route>
          <Route path="salesrecords">
            <Route path="" element={<SalesRecordList />} />
            <Route path="new/" element={<SalesRecordForm />} />
          </Route>
          <Route path="technicians">
            <Route path="" element={<TechniciansList />} />
            <Route path="new/" element={<TechnicianForm />} />
          </Route>
          <Route path="salesreps">
            <Route path="" element={<SalesRepList />} />
            <Route path="new/" element={<SalesRepForm />} />
          </Route>
          <Route path="customers">
            <Route path="" element={<CustomerList />} />
            <Route path="new/" element={<CustomerForm />} />
          </Route>
          <Route path="servicehistory" element={<ServiceHistory />} />
          <Route path="manufacturers">
            <Route path="" element={<ManufacturersList />} />
            <Route path="new/" element={<CustomerForm />} />
          </Route>
          <Route path="models">
            <Route path="" element={<VehicleModelsList />} />
            <Route path="new/" element={<CustomerForm />} />
          </Route>
          <Route path="automobiles">
            <Route path="" element={<AutomobilesList />} />
            <Route path="new/" element={<CustomerForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
