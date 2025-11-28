from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from ..db import Base


class Department(Base):
    __tablename__ = "departments"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(String(255), nullable=True)
    employees = relationship("Employee", back_populates="department")
