import React, { useEffect, useState } from "react";
import type { Employee, EmployeeInput } from "../../Api/employee";

interface Props {
  onSubmit: (data: EmployeeInput, id?: number) => void;
  editingEmployee?: Employee | null;
  onCancelEdit: () => void;
}

const initialState: EmployeeInput = { name: "", age: 0, city: "" };

const EmployeeForm: React.FC<Props> = ({
  onSubmit,
  editingEmployee,
  onCancelEdit
}) => {
  const [form, setForm] = useState<EmployeeInput>(initialState);

  useEffect(() => {
    if (editingEmployee) {
      setForm({
        name: editingEmployee.name,
        age: editingEmployee.age,
        city: editingEmployee.city
      });
    } else {
      setForm(initialState);
    }
  }, [editingEmployee]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!form.name || !form.city || !form.age) return;
    onSubmit(form, editingEmployee?.id);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow mb-4 flex flex-col gap-3"
    >
      <h2 className="text-xl font-semibold">
        {editingEmployee ? "Edit Employee" : "Add Employee"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          className="border rounded px-3 py-2"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="border rounded px-3 py-2"
          placeholder="Age"
          name="age"
          type="number"
          value={form.age || ""}
          onChange={handleChange}
        />
        <input
          className="border rounded px-3 py-2"
          placeholder="City"
          name="city"
          value={form.city}
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {editingEmployee ? "Update" : "Create"}
        </button>
        {editingEmployee && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="border border-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default EmployeeForm;
