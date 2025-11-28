import React, { useState, useEffect } from "react";
import { fetchDepartments, type Department } from "../../api";

interface Props {
  onClose: () => void;
  onDepartmentSelect: (departmentId: number) => void;
}

const DepartmentPopup: React.FC<Props> = ({ onClose, onDepartmentSelect }) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        setLoading(true);
        const data = await fetchDepartments();
        setDepartments(data);
      } catch (error) {
        console.error("Failed to load departments:", error);
      } finally {
        setLoading(false);
      }
    };

    void loadDepartments();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-h-96 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Select Department</h2>
        
        {loading ? (
          <p>Loading departments...</p>
        ) : departments.length === 0 ? (
          <p>No departments available. Please create a department first.</p>
        ) : (
          <div className="space-y-2">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => onDepartmentSelect(dept.id)}
                className="w-full text-left p-3 border rounded hover:bg-gray-100 transition-colors"
              >
                <div className="font-medium">{dept.name}</div>
                {dept.description && (
                  <div className="text-sm text-gray-600">{dept.description}</div>
                )}
              </button>
            ))}
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentPopup;
