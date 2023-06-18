import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button,
} from "@material-tailwind/react";
import ReactDOM from "react-dom";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import DataTable from "react-data-table-component";
import { tableCustomStyles } from "./tableCustomStyle";
import { Link, useNavigate } from "react-router-dom";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { fetchData } from "./Tables/fetchData";
import Filters from "./Tables/Filters";
export function Tables({ toggleOverlay }) {
  const navigate = useNavigate();
  const [filter_gender, setGenderF] = useState("All");
  const [filter_location, setLocationF] = useState("All");
  const [filter_department, setDepartmentF] = useState("All");
  const [filter_position, setPositionF] = useState("All");
  const [gender, setGender] = useState([]);
  const [department, setDepartment] = useState([]);
  const [location, setLocation] = useState([]);
  const [position, setPosition] = useState([]);
  const [toggle, changeToggle] = useState(false);
  const [cookies, setCookie] = useCookies();
  const [data, setData] = useState([]);

  const columns = [
    {
      name: "Name",

      selector: (row) => row.FirstName,
      cellExport: (row) => row.FirstName,
      sortable: true,
    },
    {
      name: "Position",
      selector: (row) => row.Position,
      cellExport: (row) => row.Position,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row) => row.Department,
      cellExport: (row) => row.Department,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.Gender,
      cellExport: (row) => row.Gender,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.Location,
      cellExport: (row) => row.Location,
      sortable: true,
    },
    {
      name: "Employeed",
      selector: (row) => row.JoinDate,
      cellExport: (row) => row.JoinDate,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <button
          onClick={(e) => handleClick(e, row)}
          className="text-center font-serif text-[1rem] capitalize md:text-base"
        >
          View
        </button>
      ),
      cellExport: (row) => "",
    },
  ];
  const handleClick = (e, row) => {
    navigate("/dashboard/profile", { state: row });
  };

  useEffect(() => {
    fetchData(
      setData,
      setDepartment,
      setGender,
      setLocation,
      setPosition,
      filter_gender,
      filter_location,
      filter_department,
      filter_position
    );
  }, []);

  const handleChange = (e) => {
    // setGender(e.target.value)
    console.log(e);
    fetchData(
      setData,
      setDepartment,
      setGender,
      setLocation,
      setPosition,
      filter_gender,
      filter_location,
      filter_department,
      filter_position
    );
  };

  return (
    <div>
      <Card className="mt-9">
        <CardHeader variant="gradient" color="blue" className="-mb-2 p-6">
          <Typography variant="h5" color="white" className="text-center">
            All Employees
          </Typography>
        </CardHeader>

        <CardBody className="text-xl">
          {/*-------------------- applying filter------------------ */}
          {/* <h3>----------here the filter is---------------</h3> */}
          <Filters
            handleChange={handleChange}
            gender={gender}
            position={position}
            location={location}
            department={department}
            filter_gender={filter_gender}
            filter_department={filter_department}
            filter_location={filter_location}
            filter_position={filter_position}
            setGenderF={setGenderF}
            setPositionF={setPositionF}
            setDepartmentF={setDepartmentF}
            setLocationF={setLocationF}
          ></Filters>
          {data && (
            <DataTableExtensions {...{ columns, data }}>
              <DataTable
                columns={columns}
                data={data}
                pagination
                defaultSortFieldId
                highlightOnHover
                noHeader
                customStyles={tableCustomStyles}
              />
            </DataTableExtensions>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default Tables;
