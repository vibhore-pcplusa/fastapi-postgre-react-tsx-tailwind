import axios from "axios";
import { Employee } from "./employee";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ??
    (window.location.hostname === "localhost"
      ? "http://localhost:8000"
      : "http://backend:8000")
});

export interface Department {
  id: number;
  name: string;
  description: string | null;
}

export interface DepartmentInput {
  name: string;
  description?: string;
}

export const assignDepartment = async (
  employeeId: number,
  departmentId: number
): Promise<Employee> => {
  const res = await api.patch<Employee>(`/employees/${employeeId}`, {
    department_id: departmentId,
  });
  return res.data;
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
