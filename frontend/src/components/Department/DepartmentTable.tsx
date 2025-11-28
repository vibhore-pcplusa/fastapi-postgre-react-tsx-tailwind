import React from "react";
import type { Department } from "../../api";

interface Props {
  departments: Department[];
  onEdit: (department: Department) => void;
  onDelete: (id: number) => void;
}

const DepartmentTable: React.FC<Props> = ({
  departments,
  onEdit,
  onDelete
}) => {
  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.id} className="border-t">
              <td className="px-4 py-2">{dept.id}</td>
              <td className="px-4 py-2">{dept.name}</td>
              <td className="px-4 py-2">
                {dept.description || (
                  <span className="text-gray-400 italic">No description</span>
                )}
              </td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(dept)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(dept.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {departments.length === 0 && (
            <tr>
              <td
                className="px-4 py-4 text-center text-gray-500"
                colSpan={4}
              >
                No departments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
