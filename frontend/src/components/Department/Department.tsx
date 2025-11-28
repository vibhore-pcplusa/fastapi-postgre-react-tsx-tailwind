import React, { useEffect, useState } from "react";
import {
  type Department,
  type DepartmentInput,
  fetchDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment
} from "../../api";
import DepartmentForm from "./DepartmentForm";
import DepartmentTable from "./DepartmentTable";

const Department: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchDepartments();
      setDepartments(data);
    } catch (e) {
      setError("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const handleSubmit = async (data: DepartmentInput, id?: number) => {
    try {
      setError(null);
      if (id) {
        await updateDepartment(id, data);
      } else {
        await createDepartment(data);
      }
      setEditingDepartment(null);
      await load();
    } catch (e) {
      setError("Failed to save department");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setError(null);
      await deleteDepartment(id);
      await load();
    } catch (e) {
      setError("Failed to delete department");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Department CRUD</h1>
      {error && (
        <div className="mb-4 text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded">
          {error}
        </div>
      )}
      <DepartmentForm
        onSubmit={handleSubmit}
        editingDepartment={editingDepartment}
        onCancelEdit={() => setEditingDepartment(null)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DepartmentTable
          departments={departments}
          onEdit={setEditingDepartment}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Department;