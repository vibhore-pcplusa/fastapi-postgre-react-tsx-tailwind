from sqlalchemy import Column, Integer, String
from ..db import Base


class Developer(Base):
    __tablename__ = "developers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(String(255), nullable=True)
    developer_type = Column(String(50), nullable=False)
