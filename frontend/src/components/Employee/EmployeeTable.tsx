import React, { useState } from "react";
import type { Employee, Department } from "../../api";
import Vibhore from "../Vibhore";
import DepartmentPopup from "./DepartmentPopup";

interface Props {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
  onDepartmentAssign: (employeeId: number, departmentId: number) => void;
}

const EmployeeTable: React.FC<Props> = ({
  employees,
  onEdit,
  onDelete,
  onDepartmentAssign
}) => {
  const [showDepartmentPopup, setShowDepartmentPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleAssignDepartment = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowDepartmentPopup(true);
  };

  const handleDepartmentSelect = (departmentId: number) => {
    if (selectedEmployee) {
      onDepartmentAssign(selectedEmployee.id, departmentId);
      setShowDepartmentPopup(false);
      setSelectedEmployee(null);
    }
  };
  return (
    <>
      <Vibhore text="Employee Management System" />
      <div className="bg-white rounded shadow overflow-x-auto">
        
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Age</th>
            <th className="px-4 py-2 text-left">City</th>
            <th className="px-4 py-2 text-left">Department</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.id} className="border-t">
              <td className="px-4 py-2">{e.id}</td>
              <td className="px-4 py-2">{e.name}</td>
              <td className="px-4 py-2">{e.age}</td>
              <td className="px-4 py-2">{e.city}</td>
              <td className="px-4 py-2">
                <div className="flex items-center space-x-2">
                  <span>{e.department_name || 'Not Assigned'}</span>
                  <button
                    onClick={() => handleAssignDepartment(e)}
                    className="text-green-600 hover:underline text-sm"
                  >
                    Assign
                  </button>
                </div>
              </td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(e)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(e.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td
                className="px-4 py-4 text-center text-gray-500"
                colSpan={6}
              >
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      <Vibhore text="Footer" />
      {showDepartmentPopup && (
        <DepartmentPopup
          onClose={() => setShowDepartmentPopup(false)}
          onDepartmentSelect={handleDepartmentSelect}
        />
      )}
    </>
  );
};

export default EmployeeTable;
