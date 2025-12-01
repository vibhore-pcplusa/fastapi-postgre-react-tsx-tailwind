import React, { useEffect } from "react";
import type { Department, DepartmentInput } from "../../Api/department";

interface Props {
  onSubmit: (data: DepartmentInput, id?: number) => void;
  editingDepartment: Department | null;
  onCancelEdit: () => void;
}

const DepartmentForm: React.FC<Props> = ({
  onSubmit,
  editingDepartment,
  onCancelEdit,
}) => {
  const [formData, setFormData] = React.useState<DepartmentInput>({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (editingDepartment) {
      setFormData({
        name: editingDepartment.name,
        description: editingDepartment.description || "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
      });
    }
  }, [editingDepartment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, editingDepartment?.id);
  };

  const handleCancel = () => {
    setFormData({ name: "", description: "" });
    onCancelEdit();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {editingDepartment ? "Edit Department" : "Add New Department"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Department Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            minLength={1}
            maxLength={100}
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={255}
            placeholder="Optional department description"
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {editingDepartment ? "Update" : "Create"}
          </button>
          {editingDepartment && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DepartmentForm;
