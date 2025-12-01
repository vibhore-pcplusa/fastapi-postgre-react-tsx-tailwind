from pydantic import BaseModel, Field, validator
from typing import Optional
from fastapi import HTTPException
import re

# Common validation functions
def validate_name(name: str) -> str:
    if len(name) < 2:
        raise HTTPException(status_code=422, detail="Name must be at least 2 characters long")
    if len(name) > 100:
        raise HTTPException(status_code=422, detail="Name cannot exceed 100 characters")
    if not re.match(r'^[a-zA-Z\s\'-]+$', name):
        raise HTTPException(status_code=422, detail="Name can only contain letters, spaces, hyphens, and apostrophes")
    return name.strip()

def validate_city_name(city: str) -> str:
    if len(city) < 2:
        raise HTTPException(status_code=422, detail="City must be at least 2 characters long")
    if len(city) > 100:
        raise HTTPException(status_code=422, detail="City cannot exceed 100 characters")
    if not re.match(r'^[a-zA-Z\s-]+$', city):
        raise HTTPException(status_code=422, detail='City name can only contain letters, spaces, and hyphens')
    return city.strip()

class EmployeeBase(BaseModel):
    name: str = Field(..., description="Name (2-100 chars, letters only)")
    age: int = Field(..., description="Age must be between 18 and 100")
    city: str = Field(..., description="City (2-100 chars, letters only)")
    department_id: Optional[int] = Field(None, ge=1, description="Must be a positive integer if provided")


class EmployeeCreate(EmployeeBase):
    
    @validator('name')
    def validate_name_field(cls, v):
        return validate_name(v)

    @validator('age')
    def validate_age_field(cls, v):
        if not 18 <= v <= 100:
            raise HTTPException(status_code=422, detail="Age must be between 18 and 100")
        return v

    @validator('city')
    def validate_city_field(cls, v):
        return validate_city_name(v)


class EmployeeUpdate(BaseModel):
    name: Optional[str] = Field(None)
    age: Optional[int] = Field(None)
    city: Optional[str] = Field(None)
    department_id: Optional[int] = Field(None, ge=1)

    @validator('name')
    def validate_name_field(cls, v):
        if v is not None:
            return validate_name(v)
        return v

    @validator('age')
    def validate_age_field(cls, v):
        if v is not None:
            if not 18 <= v <= 100:
                raise HTTPException(status_code=422, detail='Age must be between 18 and 100')
            return v
        return v

    @validator('city')
    def validate_city_field(cls, v):
        if v is not None:
            return validate_city_name(v)
        return v

    class Config:
        extra = 'forbid'  # Prevent extra fields

class DepartmentAssignment(BaseModel):
    department_id: int = Field(..., ge=1, description="Must be a valid department ID")

# Response Models
class Employee(EmployeeBase):
    id: int
    name: str
    age: int
    city: str
    department_id: Optional[int] = None
    department_name: Optional[str] = None

    class Config:
        orm_mode = True

class DepartmentBase(BaseModel):
    name: str = Field(..., description="Department name (2-50 chars)")
    description: Optional[str] = Field(None, description="Optional description (max 500 chars)")

    

class DepartmentCreate(DepartmentBase):
    @validator('name')
    def validate_department_name(cls, v):
        if v is None:
            raise HTTPException(status_code=422, detail="Department name is required")

        if v is not None:
            if len(v) == 0:
                raise HTTPException(status_code=422, detail="Department name cannot be empty")
            if len(v) < 2:
                raise HTTPException(status_code=422, detail="Department name must be at least 2 characters long")
            if len(v) > 50:
                raise HTTPException(status_code=422, detail="Department name cannot exceed 50 characters")
            if not re.match(r'^[a-zA-Z\s\'-]+$', v):
                raise HTTPException(status_code=422, detail='Department name can only contain letters, spaces, hyphens, and apostrophes')
        return v.strip()

class DepartmentUpdate(BaseModel):
    name: Optional[str] = Field(None)
    description: Optional[str] = Field(None)

    @validator('name')
    def validate_department_name(cls, v):
        if v is None:
            raise HTTPException(status_code=422, detail="Department name is required")
        #return v

        if v is not None:
            if len(v) == 0:
                raise HTTPException(status_code=422, detail="Department name cannot be empty")
            if len(v) < 2:
                raise HTTPException(status_code=422, detail="Department name must be at least 2 characters long")
            if len(v) > 50:
                raise HTTPException(status_code=422, detail="Department name cannot exceed 50 characters")
            if not re.match(r'^[a-zA-Z\s\'-]+$', v):
                raise HTTPException(status_code=422, detail='Department name can only contain letters, spaces, hyphens, and apostrophes')
            return v.strip()
        return v

    class Config:
        extra = 'forbid'  # Prevent extra fields

class Department(DepartmentBase):
    id: int
    employee_count: Optional[int] = 0
    
    class Config:
        orm_mode = True
