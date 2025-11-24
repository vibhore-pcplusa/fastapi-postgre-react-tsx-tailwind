import React from "react";
import type { Employee } from "../api";

interface Props {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

const EmployeeTable: React.FC<Props> = ({
  employees,
  onEdit,
  onDelete
}) => {
  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name2</th>
            <th className="px-4 py-2 text-left">Age2</th>
            <th className="px-4 py-2 text-left">City</th>
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
                colSpan={5}
              >
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
