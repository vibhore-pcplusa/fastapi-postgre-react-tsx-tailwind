import pytest
from fastapi.testclient import TestClient


def test_create_employee(client: TestClient, sample_employee):
    response = client.post("/employees", json=sample_employee)
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == sample_employee["name"]
    assert data["age"] == sample_employee["age"]
    assert data["city"] == sample_employee["city"]
    assert "id" in data


def test_get_employees_empty(client: TestClient):
    response = client.get("/employees")
    assert response.status_code == 200
    assert response.json() == []


def test_get_employees_with_data(client: TestClient, sample_employee):
    # Create an employee first
    create_response = client.post("/employees", json=sample_employee)
    assert create_response.status_code == 201
    
    # Get all employees
    response = client.get("/employees")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["name"] == sample_employee["name"]


def test_get_employee_by_id(client: TestClient, sample_employee):
    # Create an employee first
    create_response = client.post("/employees", json=sample_employee)
    assert create_response.status_code == 201
    employee_id = create_response.json()["id"]
    
    # Get the employee by ID
    response = client.get(f"/employees/{employee_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == employee_id
    assert data["name"] == sample_employee["name"]


def test_get_employee_not_found(client: TestClient):
    response = client.get("/employees/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Employee not found"


def test_update_employee(client: TestClient, sample_employee):
    # Create an employee first
    create_response = client.post("/employees", json=sample_employee)
    assert create_response.status_code == 201
    employee_id = create_response.json()["id"]
    
    # Update the employee
    update_data = {
        "name": "Jane Doe",
        "age": 25,
        "city": "Los Angeles"
    }
    response = client.put(f"/employees/{employee_id}", json=update_data)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == update_data["name"]
    assert data["age"] == update_data["age"]
    assert data["city"] == update_data["city"]


def test_update_employee_not_found(client: TestClient):
    update_data = {
        "name": "Jane Doe",
        "age": 25,
        "city": "Los Angeles"
    }
    response = client.put("/employees/999", json=update_data)
    assert response.status_code == 404
    assert response.json()["detail"] == "Employee not found"


def test_delete_employee(client: TestClient, sample_employee):
    # Create an employee first
    create_response = client.post("/employees", json=sample_employee)
    assert create_response.status_code == 201
    employee_id = create_response.json()["id"]
    
    # Delete the employee
    response = client.delete(f"/employees/{employee_id}")
    assert response.status_code == 204
    
    # Verify employee is deleted
    get_response = client.get(f"/employees/{employee_id}")
    assert get_response.status_code == 404


def test_delete_employee_not_found(client: TestClient):
    response = client.delete("/employees/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Employee not found"


def test_create_employee_invalid_data(client: TestClient):
    invalid_data = {
        "name": "",  # Empty name should fail validation
        "age": "not_a_number",  # Invalid age type
        "city": "New York"
    }
    response = client.post("/employees", json=invalid_data)
    # FastAPI will handle validation errors before reaching the endpoint
    assert response.status_code == 422
