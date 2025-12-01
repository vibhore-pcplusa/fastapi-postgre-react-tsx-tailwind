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
  department_id?: number;
  department_name?: string;
}

export interface EmployeeInput {
  name: string;
  age: number;
  city: string;
  department_id?: number;
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
