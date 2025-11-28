import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Employee from "./components/Employee/Employee";
import Department from "./components/Department/Department";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<Employee />} />
            <Route path="/departments" element={<Department />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
