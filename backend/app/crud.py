from sqlalchemy.orm import Session
from . import models, schemas


def get_employees(db: Session):
#    print('vj2')
    return db.query(models.Employee).all()


def get_employee(db: Session, employee_id: int):
    return db.query(models.Employee).filter(models.Employee.id == employee_id).first()


def create_employee(db: Session, employee: schemas.EmployeeCreate):
    db_employee = models.Employee(
        name=employee.name,
        age=employee.age,
        city=employee.city,
    )
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee


def update_employee(db: Session, employee_id: int, employee: schemas.EmployeeUpdate):
    db_employee = get_employee(db, employee_id)
    if not db_employee:
        return None
    db_employee.name = employee.name
    db_employee.age = employee.age
    db_employee.city = employee.city
    db.commit()
    db.refresh(db_employee)
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
