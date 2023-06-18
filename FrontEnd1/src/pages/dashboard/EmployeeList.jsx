import React, { useState, useEffect } from "react";
// import './filterForm.css'

// const EmployeeTable = ({ employees, genderFilter, positionFilter ,departmentFilter,locationFilter}) => {
// const [filteredEmployees,setfilteredEmployees]=useState([])
const EmployeeTable = ({ employees, genderFilter }) => {
  const [filteredEmployees, setfilteredEmployees] = useState([]);

  if (employees) {
    const filtered = employees.filter((employee) => {
      if (genderFilter && employee.Gender !== genderFilter) {
        return false;
      }
      return true;
    });
    setfilteredEmployees(filtered);
  } else {
    console.log("employee data not founded!!!!!!");
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Gender</th>
          <th>Position</th>
          <th>Location</th>
          <th>Department</th>
        </tr>
      </thead>
      <tbody>
        {filteredEmployees.map((employee) => (
          <tr key={employee._id}>
            <td>
              {employee.FirstName} {employee.LastName}
            </td>
            <td>{employee.Gender}</td>
            <td>{employee.Position}</td>
            <td>{employee.Location}</td>
            <td>{employee.Department}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [genderFilter, setGenderFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/getEmployee", {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });

      if (!response.ok) {
        console.log(
          " HTTP request was not successful (status in the range 200-299). "
        );
        throw new Error(response.statusText);
      }

      const Alldata = await response.json();
      console.log("mydata::::::::::", Alldata);

      console.log("mydata's  employees::::::::::", Alldata.data);

      setEmployees(Alldata.data);
      console.log("all emp::::", employees);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }
  const styling = {
    border: "2px solid blue",
  };

  return (
    <div>
      <form style={styling}>
        <label htmlFor="gender-filter">Gender:</label>
        <select
          id="gender-filter"
          value={genderFilter}
          onChange={(event) => setGenderFilter(event.target.value)}
        >
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {/* <label htmlFor="position-filter">Position:</label>
          <select id="position-filter" value={positionFilter} onChange={event => setPositionFilter(event.target.value)}>
            <option value="">All</option>
            <option value="Manager">Manager</option>
            <option value="SDE">SDE</option>
            <option value="QA">QA</option>
          </select>
          <label htmlFor="department-filter">Department:</label>
          <select id="department-filter" value={departmentFilter} onChange={event => setDepartmentFilter(event.target.value)}>
            <option value="">All</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="IT">IT</option>
          </select>
          <label htmlFor="location-filter">Location:</label>
          <select id="location-filter" value={locationFilter} onChange={event => setLocationFilter(event.target.value)}>
            <option value="">All</option>
            <option value="San Francisco">San Francisco</option>
            <option value="New York">New York</option>
            <option value="London">London</option>
          </select> */}
      </form>

      {/* <EmployeeTable employees={employees} genderFilter={genderFilter} positionFilter={positionFilter} departmentFilter={departmentFilter} locationFilter={locationFilter} /> */}
      {employees && (
        <EmployeeTable employees={employees} genderFilter={genderFilter} />
      )}
    </div>
  );
}

//   export default EmployeeList;
