import React, { useEffect, useState } from "react";
import {
  type Employee,
  type EmployeeInput,
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from "../../api";
import EmployeeForm from "./EmployeeForm";
import EmployeeTable from "./EmployeeTable";

const Employee: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

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
      } else {
        await createEmployee(data);
      }
      setEditingEmployee(null);
      await load();
    } catch (e) {
      setError("Failed to save employee");
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
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <EmployeeTable
          employees={employees}
          onEdit={setEditingEmployee}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Employee;
