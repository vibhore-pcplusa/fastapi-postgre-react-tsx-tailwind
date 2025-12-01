import React, { useEffect, useState } from "react";
import type { Employee, EmployeeInput } from "../../Api/employee";

interface ValidationError {
  name?: string;
  age?: string;
  city?: string;
  department_id?: string;
}

interface Props {
  onSubmit: (data: EmployeeInput, id?: number) => void;
  editingEmployee?: Employee | null;
  onCancelEdit: () => void;
  onSuccess?: (message: string) => void;
}

const initialState: EmployeeInput = { name: "", age: 0, city: "" };

const EmployeeForm: React.FC<Props> = ({
  onSubmit,
  editingEmployee,
  onCancelEdit,
  onSuccess
}) => {
  const [form, setForm] = useState<EmployeeInput>(initialState);
  const [errors, setErrors] = useState<ValidationError>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (editingEmployee) {
      setForm({
        name: editingEmployee.name,
        age: editingEmployee.age,
        city: editingEmployee.city,
        department_id: editingEmployee.department_id
      });
    } else {
      setForm(initialState);
    }
    setErrors({});
    setTouched({});
  }, [editingEmployee]);

  const validateName = (name: string): string | undefined => {
    if (!name || name.trim().length === 0) {
      return "Name is required";
    }
    if (name.trim().length < 2) {
      return "Name must be at least 2 characters long";
    }
    if (name.trim().length > 100) {
      return "Name cannot exceed 100 characters";
    }
    if (!/^[a-zA-Z\s\'-]+$/.test(name)) {
      return "Name can only contain letters, spaces, hyphens, and apostrophes";
    }
    return undefined;
  };

  const validateAge = (age: number): string | undefined => {
    if (!age || age === 0) {
      return "Age is required";
    }
    if (age < 18) {
      return "Age must be at least 18";
    }
    if (age > 100) {
      return "Age cannot exceed 100";
    }
    return undefined;
  };

  const validateCity = (city: string): string | undefined => {
    if (!city || city.trim().length === 0) {
      return "City is required";
    }
    if (city.trim().length < 2) {
      return "City must be at least 2 characters long";
    }
    if (city.trim().length > 100) {
      return "City cannot exceed 100 characters";
    }
    if (!/^[a-zA-Z\s-]+$/.test(city)) {
      return "City can only contain letters, spaces, and hyphens";
    }
    return undefined;
  };

  const validateDepartmentId = (departmentId: number | undefined): string | undefined => {
    if (departmentId && departmentId < 1) {
      return "Department ID must be a positive number";
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationError = {
      name: validateName(form.name),
      age: validateAge(form.age),
      city: validateCity(form.city),
      department_id: validateDepartmentId(form.department_id),
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    const newValue = name === "age" ? Number(value) : value;
    setForm((prev) => ({
      ...prev,
      [name]: newValue
    }));
    
    // Real-time validation for touched fields
    if (touched[name]) {
      const newErrors = { ...errors };
      if (name === 'name') {
        const error = validateName(newValue as string);
        if (error) {
          newErrors.name = error;
        } else {
          delete newErrors.name;
        }
      } else if (name === 'age') {
        const error = validateAge(newValue as number);
        if (error) {
          newErrors.age = error;
        } else {
          delete newErrors.age;
        }
      } else if (name === 'city') {
        const error = validateCity(newValue as string);
        if (error) {
          newErrors.city = error;
        } else {
          delete newErrors.city;
        }
      } else if (name === 'department_id') {
        const error = validateDepartmentId(newValue as number);
        if (error) {
          newErrors.department_id = error;
        } else {
          delete newErrors.department_id;
        }
      }
      setErrors(newErrors);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    const newErrors = { ...errors };
    if (name === 'name') {
      const error = validateName(form.name);
      if (error) {
        newErrors.name = error;
      } else {
        delete newErrors.name;
      }
    } else if (name === 'age') {
      const error = validateAge(form.age);
      if (error) {
        newErrors.age = error;
      } else {
        delete newErrors.age;
      }
    } else if (name === 'city') {
      const error = validateCity(form.city);
      if (error) {
        newErrors.city = error;
      } else {
        delete newErrors.city;
      }
    } else if (name === 'department_id') {
      const error = validateDepartmentId(form.department_id);
      if (error) {
        newErrors.department_id = error;
      } else {
        delete newErrors.department_id;
      }
    }
    setErrors(newErrors);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(form, editingEmployee?.id);
      
      // Clear form and show success message only for new employees
      if (!editingEmployee) {
        setForm(initialState);
        setErrors({});
        setTouched({});
        onSuccess?.("Employee added successfully!");
      }
    }
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
        <div>
          <input
            className={`border rounded px-3 py-2 w-full ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={100}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>
        <div>
          <input
            className={`border rounded px-3 py-2 w-full ${
              errors.age ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Age"
            name="age"
            type="number"
            min="18"
            max="100"
            value={form.age || ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-600">{errors.age}</p>
          )}
        </div>
        <div>
          <input
            className={`border rounded px-3 py-2 w-full ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="City"
            name="city"
            value={form.city}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={100}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
          )}
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={Object.keys(errors).length > 0}
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
