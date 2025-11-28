from sqlalchemy.orm import Session, selectinload
from . import models, schemas


def get_employees(db: Session):
    employees = db.query(models.Employee).options(
        selectinload(models.Employee.department)
    ).all()
    
    # Manually add department_name to each employee
    for employee in employees:
        employee.department_name = employee.department.name if employee.department else None
    
    return employees


def get_employee(db: Session, employee_id: int):
    employee = db.query(models.Employee).options(
        selectinload(models.Employee.department)
    ).filter(models.Employee.id == employee_id).first()
    
    if employee:
        employee.department_name = employee.department.name if employee.department else None
    
    return employee


def create_employee(db: Session, employee: schemas.EmployeeCreate):
    db_employee = models.Employee(
        name=employee.name,
        age=employee.age,
        city=employee.city,
        department_id=employee.department_id,
    )
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee


def update_employee(db: Session, employee_id: int, employee: schemas.EmployeeUpdate):
    db_employee = get_employee(db, employee_id)
    if not db_employee:
        return None
    if employee.name is not None:
        db_employee.name = employee.name
    if employee.age is not None:
        db_employee.age = employee.age
    if employee.city is not None:
        db_employee.city = employee.city
    if employee.department_id is not None:
        # Check if department exists
        department = db.query(models.Department).filter(models.Department.id == employee.department_id).first()
        if not department:
            raise ValueError(f"Department with id {employee.department_id} does not exist")
        db_employee.department_id = employee.department_id
    db.commit()
    
    # Refresh with department data
    db.refresh(db_employee)
    db_employee.department_name = db_employee.department.name if db_employee.department else None
    
    return db_employee


def delete_employee(db: Session, employee_id: int):
    db_employee = get_employee(db, employee_id)
    if not db_employee:
        return False
    db.delete(db_employee)
    db.commit()
    return True


# Department CRUD operations
def get_departments(db: Session):
    return db.query(models.Department).all()


def get_department(db: Session, department_id: int):
    return db.query(models.Department).filter(models.Department.id == department_id).first()


def create_department(db: Session, department: schemas.DepartmentCreate):
    db_department = models.Department(
        name=department.name,
        description=department.description,
    )
    db.add(db_department)
    db.commit()
    db.refresh(db_department)
    return db_department


def update_department(db: Session, department_id: int, department: schemas.DepartmentUpdate):
    db_department = get_department(db, department_id)
    if not db_department:
        return None
    db_department.name = department.name
    db_department.description = department.description
    db.commit()
    db.refresh(db_department)
    return db_department


def delete_department(db: Session, department_id: int):
    db_department = get_department(db, department_id)
    if not db_department:
        return False
    db.delete(db_department)
    db.commit()
    return True
