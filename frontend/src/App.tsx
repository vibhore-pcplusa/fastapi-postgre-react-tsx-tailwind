import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
/*import Employee from "./components/Employee/Employee";
import Department from "./components/Department/Department";
import Dashboard from "./components/Dashboard";
import Playground from "./components/Playground";
import Calculator from "./components/Calculator";
import AdvCalculator from "./components/AdvCalculator";*/ //it was not lazy loading , but now we are chaning it . 
import { lazy, Suspense } from "react";

// Lazy load pages 
const Employee = lazy(() => import("./components/Employee/Employee")); 
const Department = lazy(() => import("./components/Department/Department")); 
const Dashboard = lazy(() => import("./components/Dashboard")); 
const Playground = lazy(() => import("./components/Playground")); 
const Calculator = lazy(() => import("./components/Calculator")); 
const AdvCalculator = lazy(() => import("./components/AdvCalculator"));



const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employees" element={<Employee />} />
              <Route path="/departments" element={<Department />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/adv_calculator" element={<AdvCalculator />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
