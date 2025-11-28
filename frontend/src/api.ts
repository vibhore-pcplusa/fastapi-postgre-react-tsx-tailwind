import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ??
    (window.location.hostname === "localhost"
      ? "http://localhost:8000"
      : "http://backend:8000")
});

export interface Employee {
  id: number;
  name: string;
  age: number;
  city: string;
}

export interface EmployeeInput {
  name: string;
  age: number;
  city: string;
}

export interface Department {
  id: number;
  name: string;
  description: string | null;
}

export interface DepartmentInput {
  name: string;
  description?: string;
}

export const fetchEmployees = async (): Promise<Employee[]> => {
  const res = await api.get<Employee[]>("/employees");
  return res.data;
};

export const createEmployee = async (
  data: EmployeeInput
): Promise<Employee> => {
  const res = await api.post<Employee>("/employees", data);
  return res.data;
};

export const updateEmployee = async (
  id: number,
  data: EmployeeInput
): Promise<Employee> => {
  const res = await api.put<Employee>(`/employees/${id}`, data);
  return res.data;
};

export const deleteEmployee = async (id: number): Promise<void> => {
  await api.delete(`/employees/${id}`);
};

// Department API functions
export const fetchDepartments = async (): Promise<Department[]> => {
  const res = await api.get<Department[]>("/departments");
  return res.data;
};

export const createDepartment = async (
  data: DepartmentInput
): Promise<Department> => {
  const res = await api.post<Department>("/departments", data);
  return res.data;
};

export const updateDepartment = async (
  id: number,
  data: DepartmentInput
): Promise<Department> => {
  const res = await api.put<Department>(`/departments/${id}`, data);
  return res.data;
};

export const deleteDepartment = async (id: number): Promise<void> => {
  await api.delete(`/departments/${id}`);
};
