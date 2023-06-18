import React from "react";
import axios from "axios";
import Domain from "./Skills/Domain";
import { fetchUserData, handleCheck } from "./Skills/fetchUserData";
import { handleSkill } from "./Skills/handleSkill";
import { handleToggle } from "./Skills/handleToggle";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@material-tailwind/react";
import { CheckBadgeIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import DisplaySkill from "./Skills/DisplaySkill";
import AddSkills from "./Skills/AddSkills";
import EditSkill from "./Skills/EditSkill";
import { handleEditSkill } from "./Skills/handleEditSkill";
import EditToggle from "./Skills/EditToggle";

export function Skills({ toggleOverlay }) {
  const [data, setData] = useState({});
  let history = useNavigate();
  const [domain_data, setDomainData] = useState([]);
  const [skills, setSkills] = useState([]);
  const [userdata, setUserdata] = useState([]);
  const [domain, setdomain] = useState("");
  const [chunks, setchunks] = useState([]);
  const [cookies, setCookie] = useCookies();
  const [alert, changAlert] = useState(false);
  const [text, changeColor] = useState("");
  const [overlay, changeOverlay] = useState(false);
  const [slct_skill, setSkill] = useState("");
  const [loading, setLoading] = useState(true);
  const [select_v, changeSelectV] = useState("Technical");
  const [ModalName, changeModalName] = useState("Update");
  const [skill_to_edit, setskill_to_edit] = useState({});
  const [rang, setRang] = useState("blue");
  //Retriving the domain from the request
  useEffect(() => {
    fetchUserData(
      cookies.jwt,
      setUserdata,
      setchunks,
      setData,
      setDomainData,
      setdomain,
      setLoading
    );
  }, []);
  //Handling the toggole selection of the domain

  const handleButton = async () => {
    const token = cookies.jwt;
    if (chunks.length) {
      await axios
        .post(
          `${import.meta.env.VITE_APP_API_URL}/employee/addSkills`,
          {
            skills: chunks,
            cookie: token,
          },
          {
            withCredentials: true,
          }
        )
        .then((d) => {
          const jss = d.data;
          if (!jss.Success) {
            console.log("barabar chhe");
            changeColor(jss.message);
            changAlert(true);
            setRang("red");
          } else {
            console.log("Something went wrong");
            setRang("green");
            changAlert(true);
            changeColor("SuccessFully changed");
          }
        })
        .catch((err) => {
          setRang("red");
          changeColor(err.message);
          changAlert(true);
        });
    } else {
      setRang("red");
      changeColor("Select any skill");
      changAlert(true);
      return;
    }
  };
  //handling the skill add

  const arr = [];

  const HandleDeleteSkill = (id) => {
    const token = cookies.jwt;

    // axios call
    axios
      .post(`${import.meta.env.VITE_APP_API_URL}/deleteSkill`, {
        skill_id: id,
        token,
      })
      .then(async (d) => {
        const jss = d.data;
        setRang("blue");
        changAlert(true);
        changeColor("SuccessFully deleted");

        if (jss.Success) {
          // remove from chunks
          const arr = [...chunks];
          arr.filter((ele, i) => {
            if (ele.skill_id === id) {
              arr.splice(i, 1);
            }
          });
          setchunks(arr);
          window.location.reload();
        } else {
          console.log("success false:", jss);
          setRang("red");
          changAlert(true);
          changeColor(jss.message);

          // history("/")
        }
      })
      .catch((err) => {
        changeOverlay(false);
        toggleOverlay(false);
        console.log(err);
        setRang("red");
        changeColor(err.message);
        changAlert(true);
      });
  };
  const HandleDeleteAllSkills = () => {
    const token = cookies.jwt;
    const skillIdstodelete = chunks.map((ele, i) => {
      return ele.skill_id;
    });
    // axios call
    axios
      .post(`${import.meta.env.VITE_APP_API_URL}/deleteAllSkills`, {
        data: skillIdstodelete,
        token,
      })
      .then((d) => {
        const jss = d.data;
        if (jss.Success) {
          // remove from chunks
          setchunks([]);

          changeOverlay(false);
          toggleOverlay(false);
          window.location.reload();
          // changeColor(jss.message)
          // changAlert(true)
        } else {
          console.log("success false:", jss);
          // changAlert(false)
          // history("/")
        }
      })
      .catch((err) => {
        changeOverlay(false);
        toggleOverlay(false);
        console.log(err);
        //  changeColor(err)
        //  changAlert(true)
      });
  };
  return (
    <div className="md:my-15 min-w-sm relative mx-auto my-8 flex min-h-screen flex-col gap-8">
      <Alert
        show={alert}
        color={rang}
        dismissible={{
          onClose: () => changAlert(false),
        }}
      >
        {text}
      </Alert>

      <div className="flex justify-between ">
        <Typography variant="h3">Skills</Typography>
      </div>
      {loading && (
        <div role="status" className="">
          {/* <svg
            aria-hidden="true"
            className=" mr-2 h-12 w-12 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg> */}
          {/* <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div> */}

          <div class="wrapper">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <span>Loading</span>
          </div>
        </div>
      )}
      {ModalName === "Add" && overlay && (
        <AddSkills
          slct_skill={slct_skill}
          select_v={select_v}
          setSkill={setSkill}
          changeSelectV={changeSelectV}
          setData={setData}
          domain_data={domain_data}
          toggleOverlay={toggleOverlay}
          changeOverlay={changeOverlay}
          data={data}
          handleSkill={handleSkill}
          setDomainData={setDomainData}
        ></AddSkills>
      )}

      {/* Update Skills Modal */}
      {ModalName === "Update" && overlay && (
        <div className="absolute top-[30rem] left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform space-y-5 rounded-xl  bg-white px-8 py-5 lg:top-1/2">
          <div className="mb-3 border-b-2 border-gray-700 pb-2 text-xl ">
            Update Skills
          </div>

          {chunks &&
            chunks.map((ele, idx) => {
              let name;
              Object.values(data).map((d) => {
                // console.log("D:",d)
                d.forEach((e) => {
                  // console.log("In update",e)
                  if (e._id == ele.skill_id && e.skill_name.length > 0) {
                    name = e.skill_name;
                    arr.push({ name, skill_id: e._id });
                  }
                });
                // name = data[d].filter(e=>e.skill_id==ele.skill_id)
              });

              return (
                <EditToggle
                  ele={ele}
                  idx={idx}
                  name={name}
                  data={data}
                  Object={Object}
                  setskill_to_edit={setskill_to_edit}
                  changeModalName={changeModalName}
                  HandleDeleteSkill={HandleDeleteSkill}
                ></EditToggle>
              );
            })}
          <div className="flex justify-end gap-2">
            <button
              onClick={(e) => {
                toggleOverlay(false);
                changeOverlay(false);
              }}
              color="red"
              className="rounded bg-green-500 px-3 py-1 text-lg font-normal capitalize text-white"
            >
              Cancel
            </button>
            <button
              onClick={HandleDeleteAllSkills}
              className="rounded bg-red-500 px-3 py-1 text-lg font-normal  capitalize text-white"
            >
              Delete All
            </button>
          </div>
          <hr />
        </div>
      )}

      {/* Edit Skills Modal */}
      {ModalName === "Edit" && overlay && (
        <EditSkill
          token={cookies.jwt}
          setskill_to_edit={setskill_to_edit}
          skill_to_edit={skill_to_edit}
          changeModalName={changeModalName}
          handleEditSkill={handleEditSkill}
          chunks={chunks}
          setchunks={setchunks}
          changeColor={changeColor}
          changeOverlay={changeOverlay}
          changeAlert={changAlert}
          toggleOverlay={toggleOverlay}
        ></EditSkill>
      )}
      <div className="flex justify-center space-x-9 overflow-scroll">
        {domain_data &&
          domain_data.map((ele, idx) => {
            return (
              <Domain
                ele={ele}
                domain={domain}
                idx={idx}
                data={data}
                handleCheck={handleCheck}
                setdomain={setdomain}
                setSkills={setSkills}
              ></Domain>
            );
          })}
      </div>
      <div className="flex flex-col">
        {domain_data &&
          domain_data.map((dom, idx) => {
            return (
              <div className={`flex flex-wrap justify-evenly `} id={dom}>
                {data[dom] &&
                  data[dom].map((ele, idx) => {
                    return (
                      <DisplaySkill
                        ele={ele}
                        idx={idx}
                        domain={domain}
                        handleToggle={handleToggle}
                        dom={dom}
                        setData={setData}
                        setchunks={setchunks}
                        chunks={chunks}
                        data={data}
                      ></DisplaySkill>
                    );
                  })}
              </div>
            );
          })}
      </div>

      { !loading && <div className="mt-[3rem] flex flex-col justify-center space-x-4 md:flex-row ">
        <Button
          onClick={(e) => {
            changeModalName("Update");
            toggleOverlay(true);
            changeOverlay(true);
          }}
          varient="gradient"
          className="m-2 w-[11rem] bg-orange-700"
        >
          Update Skills
        </Button>
        <Button
          varient="gradient"
          color="green"
          className={`m-2 w-[9rem] justify-center`}
          onClick={handleButton}
        >
          Save Changes
        </Button>

        <Button
          onClick={(e) => {
            changeModalName("Add");
            toggleOverlay(true);
            changeOverlay(true);
          }}
          varient="gradient"
          color="pink"
          className="m-2 h-10 w-[10rem] items-center justify-center px-9"
        >
          + Add Skill
        </Button>
      </div>}
    </div>
  );
}

export default Skills;
