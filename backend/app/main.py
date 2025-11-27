from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .models import Employee, Department, Product, Category
from . import schemas, crud
from .db import Base, engine, SessionLocal

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


@app.get("/employees", response_model=list[schemas.Employee])
def read_employees(db: Session = Depends(get_db)):
    return crud.get_employees(db)


@app.get("/employees/{employee_id}", response_model=schemas.Employee)
def read_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = crud.get_employee(db, employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee


@app.post("/employees", response_model=schemas.Employee, status_code=status.HTTP_201_CREATED,
    summary="Create a new employee",
    description="Creates a new employee with the given details",
    response_description="The created employee record",
    tags=["Employees"]
)
def create_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    """
    Create a new employee with the following information:
    - **name**: Full name of the employee (required)
    - **age**: Age of the employee (must be positive)
    - **city**: City where the employee is located
    """
    return crud.create_employee(db, employee)


@app.put("/employees/{employee_id}", response_model=schemas.Employee)
def update_employee(
    employee_id: int,
    employee: schemas.EmployeeUpdate,
    db: Session = Depends(get_db),
):
    updated = crud.update_employee(db, employee_id, employee)
    if not updated:
        raise HTTPException(status_code=404, detail="Employee not found")
    return updated


@app.delete("/employees/{employee_id}", status_code=204)
def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    ok = crud.delete_employee(db, employee_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Employee not found")
    return None
