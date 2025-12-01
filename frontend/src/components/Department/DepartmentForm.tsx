import React, { useEffect, useState } from "react";
import type { Department, DepartmentInput } from "../../Api/department";

interface ValidationError {
  name?: string;
  description?: string;
}

interface Props {
  onSubmit: (data: DepartmentInput, id?: number) => void;
  editingDepartment: Department | null;
  onCancelEdit: () => void;
  onSuccess?: (message: string) => void;
}

const DepartmentForm: React.FC<Props> = ({
  onSubmit,
  editingDepartment,
  onCancelEdit,
  onSuccess
}) => {
  const [formData, setFormData] = useState<DepartmentInput>({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState<ValidationError>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

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
    setErrors({});
    setTouched({});
  }, [editingDepartment]);

  const validateName = (name: string): string | undefined => {
    if (!name || name.trim().length === 0) {
      return "Department name is required";
    }
    if (name.trim().length < 2) {
      return "Department name must be at least 2 characters long";
    }
    if (name.trim().length > 50) {
      return "Department name cannot exceed 50 characters";
    }
    if (!/^[a-zA-Z\s\'-]+$/.test(name)) {
      return "Department name can only contain letters, spaces, hyphens, and apostrophes";
    }
    return undefined;
  };

  const validateDescription = (description: string): string | undefined => {
    if (description && description.length > 500) {
      return "Description cannot exceed 500 characters";
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationError = {
      name: validateName(formData.name),
      description: validateDescription(formData.description || ""),
    };

    // Remove undefined errors
    Object.keys(newErrors).forEach(key => {
      if (newErrors[key as keyof ValidationError] === undefined) {
        delete newErrors[key as keyof ValidationError];
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation for touched fields
    if (touched[name]) {
      const newErrors = { ...errors };
      if (name === 'name') {
        const error = validateName(value || '');
        if (error) {
          newErrors.name = error;
        } else {
          delete newErrors.name;
        }
      } else if (name === 'description') {
        const error = validateDescription(value || '');
        if (error) {
          newErrors.description = error;
        } else {
          delete newErrors.description;
        }
      }
      setErrors(newErrors);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    const newErrors = { ...errors };
    if (name === 'name') {
      const error = validateName(formData.name || '');
      if (error) {
        newErrors.name = error;
      } else {
        delete newErrors.name;
      }
    } else if (name === 'description') {
      const error = validateDescription(formData.description || '');
      if (error) {
        newErrors.description = error;
      } else {
        delete newErrors.description;
      }
    }
    setErrors(newErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData, editingDepartment?.id);
      
      // Clear form and show success message only for new departments
      if (!editingDepartment) {
        setFormData({ name: "", description: "" });
        setErrors({});
        setTouched({});
        onSuccess?.("Department added successfully!");
      }
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", description: "" });
    setErrors({});
    setTouched({});
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
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            maxLength={50}
            placeholder="Enter department name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
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
            onBlur={handleBlur}
            rows={3}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            maxLength={500}
            placeholder="Optional department description"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={Object.keys(errors).length > 0}
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
