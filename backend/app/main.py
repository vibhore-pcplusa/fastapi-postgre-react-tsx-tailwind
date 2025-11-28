from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .models import Employee, Department, Product, Category
from . import schemas, crud, models
from .db import Base, engine, SessionLocal
from typing import List

# Tables are now created by Alembic migrations
# Base.metadata.create_all(bind=engine)

#my swagger document link to view in localhost - http://localhost:8000/docs#/default/read_employees_employees_get
#At swagger hub i can see it at this url - https://app.swaggerhub.com/apis/prestanda/employee-crud-api/0.1.0#/default/read_employee_employees__employee_id__get


app = FastAPI(
    title="Employee Management API",
    description="API for managing employee records",
    version="1.0.0",
    contact={
        "name": "Vibhore",
        "email": "vibhore@pcplusa.com"
    },
    license_info={
        "name": "MIT",
    },
    openapi_tags=[
        {
            "name": "Employees",
            "description": "Operations with employees"
        },
        {
            "name": "Departments",
            "description": "Operations with departments"
        }
    ]
)


origins = [
    "http://localhost:5173",
    "http://frontend:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get(
    "/employees", 
    response_model=List[schemas.Employee],
    summary="Get all employees",
    description="""Retrieves a list of all employees in the system.
    
    ### Returns:
    An array of employee objects containing all employee details
    """,
    response_description="List of all employees",
    tags=["Employees"]
)
def read_employees(db: Session = Depends(get_db)):
    return crud.get_employees(db)


@app.get(
    "/employees/{employee_id}",
    response_model=schemas.Employee,
    summary="Get employee by ID",
    description="""Retrieves a specific employee by their unique identifier.
    
    ### Parameters:
    - **employee_id**: The unique identifier of the employee
    
    ### Returns:
    The employee object with all details if found
    
    ### Errors:
    - 404: Employee not found
    """,
    response_description="Employee details",
    responses={
        404: {
            "description": "Employee not found",
            "content": {
                "application/json": {
                    "example": {"detail": "Employee not found"}
                }
            }
        }
    },
    tags=["Employees"]
)
def read_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = crud.get_employee(db, employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee


@app.post(
    "/employees", 
    response_model=schemas.Employee,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new employee",
    description="""Creates a new employee with the given details.
    
    ### Request Body:
    - **name**: Full name of the employee (required)
    - **age**: Age of the employee (must be positive)
    - **city**: City where the employee is located
    
    ### Returns:
    The created employee record with all details including the generated ID
    """,
    response_description="The created employee record",
    tags=["Employees"]  # Make sure this matches the tag name above
)
def create_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    return crud.create_employee(db, employee)


@app.put(
    "/employees/{employee_id}",
    response_model=schemas.Employee,
    summary="Update an employee",
    description="""Updates an existing employee's information.
    
    ### Parameters:
    - **employee_id**: The unique identifier of the employee to update
    - **employee**: Updated employee data
    
    ### Returns:
    The updated employee object with all details
    
    ### Errors:
    - 404: Employee not found
    """,
    response_description="Updated employee details",
    responses={
        404: {
            "description": "Employee not found",
            "content": {
                "application/json": {
                    "example": {"detail": "Employee not found"}
                }
            }
        }
    },
    tags=["Employees"]
)
def update_employee(
    employee_id: int,
    employee: schemas.EmployeeUpdate,
    db: Session = Depends(get_db),
):
    updated = crud.update_employee(db, employee_id, employee)
    if not updated:
        raise HTTPException(status_code=404, detail="Employee not found")
    return updated


@app.delete(
    "/employees/{employee_id}",
    summary="Delete an employee",
    description="""Deletes an employee from the system.
    
    ### Parameters:
    - **employee_id**: The unique identifier of the employee to delete
    
    ### Returns:
    Success message confirming deletion
    
    ### Errors:
    - 404: Employee not found
    """,
    response_description="Deletion confirmation",
    responses={
        404: {
            "description": "Employee not found",
            "content": {
                "application/json": {
                    "example": {"detail": "Employee not found"}
                }
            }
        },
        204: {
            "description": "Employee deleted successfully",
            "content": {
                "application/json": {
                    "example": {"message": "Employee deleted successfully"}
                }
            }
        }
    },
    tags=["Employees"]
)
def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_employee(db, employee_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"message": "Employee deleted successfully"}


# Department endpoints
@app.get(
    "/departments", 
    response_model=List[schemas.Department],
    summary="Get all departments",
    description="""Retrieves a list of all departments in the system.
    
    ### Returns:
    An array of department objects containing all department details
    """,
    response_description="List of all departments",
    tags=["Departments"]
)
def read_departments(db: Session = Depends(get_db)):
    return crud.get_departments(db)


@app.get(
    "/departments/{department_id}",
    response_model=schemas.Department,
    summary="Get department by ID",
    description="""Retrieves a specific department by their unique identifier.
    
    ### Parameters:
    - **department_id**: The unique identifier of the department
    
    ### Returns:
    The department object with all details if found
    
    ### Errors:
    - 404: Department not found
    """,
    response_description="Department details",
    responses={
        404: {
            "description": "Department not found",
            "content": {
                "application/json": {
                    "example": {"detail": "Department not found"}
                }
            }
        }
    },
    tags=["Departments"]
)
def read_department(department_id: int, db: Session = Depends(get_db)):
    department = crud.get_department(db, department_id)
    if not department:
        raise HTTPException(status_code=404, detail="Department not found")
    return department


@app.post(
    "/departments", 
    response_model=schemas.Department,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new department",
    description="""Creates a new department with the given details.
    
    ### Request Body:
    - **name**: Name of the department (required)
    - **description**: Description of the department (optional)
    
    ### Returns:
    The created department record with all details including the generated ID
    """,
    response_description="The created department record",
    tags=["Departments"]
)
def create_department(department: schemas.DepartmentCreate, db: Session = Depends(get_db)):
    return crud.create_department(db, department)


@app.put(
    "/departments/{department_id}",
    response_model=schemas.Department,
    summary="Update a department",
    description="""Updates an existing department's information.
    
    ### Parameters:
    - **department_id**: The unique identifier of the department to update
    - **department**: Updated department data
    
    ### Returns:
    The updated department object with all details
    
    ### Errors:
    - 404: Department not found
    """,
    response_description="Updated department details",
    responses={
        404: {
            "description": "Department not found",
            "content": {
                "application/json": {
                    "example": {"detail": "Department not found"}
                }
            }
        }
    },
    tags=["Departments"]
)
def update_department(
    department_id: int,
    department: schemas.DepartmentUpdate,
    db: Session = Depends(get_db),
):
    updated = crud.update_department(db, department_id, department)
    if not updated:
        raise HTTPException(status_code=404, detail="Department not found")
    return updated


@app.delete(
    "/departments/{department_id}",
    summary="Delete a department",
    description="""Deletes a department from the system.
    
    ### Parameters:
    - **department_id**: The unique identifier of the department to delete
    
    ### Returns:
    Success message confirming deletion
    
    ### Errors:
    - 404: Department not found
    """,
    response_description="Deletion confirmation",
    responses={
        404: {
            "description": "Department not found",
            "content": {
                "application/json": {
                    "example": {"detail": "Department not found"}
                }
            }
        },
        204: {
            "description": "Department deleted successfully",
            "content": {
                "application/json": {
                    "example": {"message": "Department deleted successfully"}
                }
            }
        }
    },
    tags=["Departments"]
)
def delete_department(department_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_department(db, department_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Department not found")
    return {"message": "Department deleted successfully"}
