from pydantic import BaseModel
from pydantic import Field

class EmployeeBase(BaseModel):
    name: str = Field(...,  min_length=1, max_length=100, description="Name cannot be null")
    age: int = Field(..., ge=0)
    city: str = Field(..., min_length=1, max_length=100)


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeUpdate(EmployeeBase):
#    name: str = Field(..., required=True)
    pass


class Employee(EmployeeBase):
    id: int

    class Config:
        orm_mode = True
