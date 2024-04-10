import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideNavigationBar from './components/SideNavigationBar'; 
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ListVehicleComponent from './components/ListVehicleComponent';
import CreateVehicleForm from './components/CreateVehicleForm';
import ListVehicleTypesComponent from './components/ListVehicleTypesComponent';
import CreateVehicleTypeForm from './components/CreateVehicleTypeForm';
import DetailsVehicleComponent from './components/DetailsVehicleComponent';
import DetailsCustomerComponent from './components/DetailsCustomerComponent';
import ListCustomersComponent from './components/ListCustomersComponent';
import ListInvoicesComponent from './components/ListInvoicesComponent';
import ListRentalsComponent from './components/ListRentalsComponent';
import DetailsRentalsComponent from './components/DetailsRentalsComponent';
import InteractiveMap from './components/InteractiveMap';



import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/vehicles/*" element={(
          <div className="d-flex">
            <SideNavigationBar />
            <div className="flex-grow-1">
              <HeaderComponent />
              <div className="container">
                <Routes>
                  <Route path="/" element={(
                    <div>
                  <ListVehicleComponent />
                  <ListVehicleTypesComponent />
                  </div>
                  )} />
                 <Route path="add-vehicles" element={<CreateVehicleForm />} />
                 <Route path="add-types" element={<CreateVehicleTypeForm />} />
                 <Route path="details/:vehicleId" element={<DetailsVehicleComponent />} />
                </Routes>
              </div>
              <FooterComponent />
            </div>
          </div>
        )} />

        <Route path="/vehicletypes/*" element={(
          <div className="d-flex">
            <SideNavigationBar />
            <div className="flex-grow-1">
              <HeaderComponent />
              <div className="container">
                <Routes>
                  <Route path="/" element={<ListVehicleTypesComponent />} />
                 <Route path="add-types" element={<CreateVehicleTypeForm />} />
                
                </Routes>
              </div>
              <FooterComponent />
            </div>
          </div>
        )} />

        <Route path="/customers/*" element={(
          <div className="d-flex">
            <SideNavigationBar />
            <div className="flex-grow-1">
              <HeaderComponent />
              <div className="container">
                <Routes>
                  <Route path="/" element={<ListCustomersComponent />} />
                 <Route path="details/:customerId" element={<DetailsCustomerComponent />} />
                
                </Routes>
              </div>
              <FooterComponent />
            </div>
          </div>
        )} />

        <Route path="/invoices/*" element={(
          <div className="d-flex">
            <SideNavigationBar />
            <div className="flex-grow-1">
              <HeaderComponent />
              <div className="container">
                <Routes>
                  <Route path="/" element={<ListInvoicesComponent />} />                
                </Routes>
              </div>
              <FooterComponent />
            </div>
          </div>
        )} />

         <Route path="/rentals/*" element={(
          <div className="d-flex">
            <SideNavigationBar />
            <div className="flex-grow-1">
              <HeaderComponent />
              <div className="container">
                <Routes>
                   <Route path="/" element={<ListRentalsComponent />} />
                 <Route path="details/:rentalId" element={<DetailsRentalsComponent />} />               
                </Routes>
              </div>
              <FooterComponent />
            </div>
          </div>
        )} />

          <Route path="/map/*" element={(
          <div className="d-flex">
            <SideNavigationBar />
            <div className="flex-grow-1">
              <HeaderComponent />
              <div className="container">
                <Routes>
                   <Route path="/" element={<InteractiveMap />} />
                               
                </Routes>
              </div>
              <FooterComponent />
            </div>
          </div>
        )} />
      </Routes>
    </Router>
  );
  
}



export default App;
