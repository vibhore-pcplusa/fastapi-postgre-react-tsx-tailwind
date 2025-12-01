import React, { useEffect, useState } from "react";
import {
  type Employee,
  type EmployeeInput,
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from "../../Api/employee";
import { assignDepartment } from "../../Api/department";
import EmployeeForm from "./EmployeeForm";
import EmployeeTable from "./EmployeeTable";
import Toast from "../Toast/Toast";

const Employee: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (e) {
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const handleSubmit = async (data: EmployeeInput, id?: number) => {
    try {
      setError(null);
      if (id) {
        await updateEmployee(id, data);
        showToast("Employee updated successfully!", "success");
      } else {
        await createEmployee(data);
      }
      setEditingEmployee(null);
      await load();
    } catch (e) {
      setError("Failed to save employee");
      showToast("Failed to save employee", "error");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setError(null);
      await deleteEmployee(id);
      await load();
    } catch (e) {
      setError("Failed to delete employee");
    }
  };

  const handleDepartmentAssign = async (employeeId: number, departmentId: number) => {
    try {
      setError(null);
      await assignDepartment(employeeId, departmentId);
      await load();
    } catch (e) {
      setError("Failed to assign department");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Employee CRUD</h1>
      {error && (
        <div className="mb-4 text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded">
          {error}
        </div>
      )}
      <EmployeeForm
        onSubmit={handleSubmit}
        editingEmployee={editingEmployee}
        onCancelEdit={() => setEditingEmployee(null)}
        onSuccess={showToast}
      />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <EmployeeTable
          employees={employees}
          onEdit={setEditingEmployee}
          onDelete={handleDelete}
          onDepartmentAssign={handleDepartmentAssign}
        />
      )}
    </div>
  );
};

export default Employee;
