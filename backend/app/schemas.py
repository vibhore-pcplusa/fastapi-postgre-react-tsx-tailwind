from pydantic import BaseModel, Field
from typing import Optional

class EmployeeBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, description="Name cannot be null")
    age: int = Field(..., ge=0)
    city: str = Field(..., min_length=1, max_length=100)


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeUpdate(EmployeeBase):
    pass


class Employee(EmployeeBase):
    id: int

    class Config:

        orm_mode = True
#        from_attributes = True

class DepartmentBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, description="Department name cannot be null")
    description: Optional[str] = Field(None, max_length=255, description="Department description (optional)")


class DepartmentCreate(DepartmentBase):
    pass


class DepartmentUpdate(DepartmentBase):
    pass


class Department(DepartmentBase):
    id: int

    class Config:
        orm_mode = True
#        from_attributes = True
