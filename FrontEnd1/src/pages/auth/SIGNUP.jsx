import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
  Alert,
  showAlerts,
} from "@material-tailwind/react";
import React from "react";

export function SIGNUP({ signup, setSignup, state }) {
  let history = useNavigate();
  const [first, setfirst] = useState(signup.first);
  const [last, setlast] = useState(signup.last);
  const [loc, setloc] = useState(signup.location);
  const [dept, setdept] = useState(signup.dept);
  const [pos, setpos] = useState(signup.pos);
  const [jod, setjod] = useState(signup.jod);
  const [gen, setgen] = useState(signup.gen);
  const [email, setemail] = useState(signup.email);
  const [pass, setpass] = useState(signup.pass);

  const handleChange = (val, s) => {
    // console.log(e,s)
    const st = signup;
    if (s === "first") {
      setfirst(val);
      st["first"] = val;
    }

    if (s === "last") {
      setlast(val);
      st["last"] = val;
    }
    if (s === "loc") {
      setloc(val);
      st["location"] = val;
    }
    if (s === "dept") {
      setdept(val);
      st["dept"] = val;
    }
    if (s === "pos") {
      setpos(val);
      st["pos"] = val;
    }
    if (s === "jod") {
      setjod(val);
      st["jod"] = val;
    }
    if (s === "gen") {
      setgen(val);
      st["gen"] = val;
    }
    if (s === "email") {
      setemail(val);
      st["email"] = val;
    }
    if (s === "pass") {
      setpass(val);
      st["pass"] = val;
    }
    setSignup(st);

    // console.log(signup)
  };

  return (
    <>
      <div className="mb-3 flex flex-row justify-between">
        <div className="pr-2">
          <input
            type="text"
            id="FirstName"
            className="black text-x block w-full  border border-gray-300 px-3 py-2.5 capitalize focus:outline-blue-500 sm:text-xs"
            placeholder="First Name"
            value={first}
            onChange={(e) => handleChange(e.target.value, "first")}
            required
          />
        </div>
        <div className="pl-2">
          <input
            type="text"
            id="LastName"
            className="black block w-full border   border-gray-300 px-3 py-2.5 capitalize focus:outline-blue-500 sm:text-xs"
            placeholder="Last Name"
            value={last}
            onChange={(e) => handleChange(e.target.value, "last")}
            required
          />
        </div>
      </div>
      <div className="mb-3 flex flex-row justify-between">
        <div className="pr-2">
          <input
            type="text"
            id="Department"
            className="black block w-full border  border-gray-300 px-3 py-2.5 capitalize focus:outline-blue-500 sm:text-xs"
            placeholder="Department"
            value={dept}
            onChange={(e) => handleChange(e.target.value, "dept")}
            required
          />
        </div>
        <div className="pl-2">
          <input
            type="text"
            id="Position"
            className="black block w-full border  border-gray-300 px-3 py-2.5 capitalize focus:outline-blue-500 sm:text-xs"
            placeholder="Position"
            value={pos}
            onChange={(e) => handleChange(e.target.value, "pos")}
            required
          />
        </div>
      </div>

      <div className="mb-3 flex flex-row justify-between">
        <div className=" flex w-1/2 justify-center">
          <label className="block w-1/2 py-2" required>
            Gender:
          </label>
          <select
            className="border-grey-300 block border bg-white focus:outline-blue-500"
            value={gen}
            onChange={(e) => handleChange(e.target.value, "gen")}
          >
            <option value={"Female"}>Female</option>
            <option value={"Male"}>Male</option>
            <option value={"Other"}>Other</option>
          </select>
        </div>
        <div className="w-1/2 pl-2">
          <input
            type="text"
            id="location"
            className="block w-full border border-gray-300 px-3 py-2 capitalize  focus:outline-blue-500 sm:text-xs"
            placeholder="Location"
            value={loc}
            onChange={(e) => handleChange(e.target.value, "loc")}
            required
          />
        </div>
      </div>

      <div className="mb-3 flex">
        <label className="w-1/2 py-2 pl-2">Select Joining date</label>
        <input
          type="date"
          id="JD"
          className="black mb-3 block w-1/2 border  border-gray-300 px-3 py-2.5 capitalize focus:outline-blue-500 sm:text-xs"
          placeholder=""
          value={jod}
          onChange={(e) => handleChange(e.target.value, "jod")}
          required
        />
      </div>

      {state && (
        <div className="mb-3">
          <input
            type="email"
            id="Email"
            className="black mb-3 block w-full border border-gray-300 px-3 py-2.5 focus:outline-blue-500 sm:text-xs"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => handleChange(e.target.value, "email")}
            required
            disabled
          />
        </div>
      )}
      {!state && (
        <div className="mb-3">
          <input
            type="email"
            id="Email"
            className="black mb-3 block w-full border border-gray-300 px-3 py-2.5 focus:outline-blue-500 sm:text-xs"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => handleChange(e.target.value, "email")}
            required
          />
        </div>
      )}

      {state && (
        <div className="mb-5 md:mb-6">
          <input
            type="password"
            id="password"
            className="black mb-3 block w-full border border-gray-300 px-3 py-2.5 capitalize focus:outline-blue-500 sm:text-xs"
            placeholder="Enter Password"
            value={pass}
            onChange={(e) => handleChange(e.target.value, "pass")}
            required
            disabled
          />
        </div>
      )}
      {!state && (
        <div className="mb-5 md:mb-6">
          <input
            type="password"
            id="password"
            className="black mb-3 block w-full border border-gray-300 px-3 py-2.5 capitalize focus:outline-blue-500 sm:text-xs"
            placeholder="Enter Password"
            value={pass}
            onChange={(e) => handleChange(e.target.value, "pass")}
            required
          />
        </div>
      )}
    </>
  );
}

export default SIGNUP;
