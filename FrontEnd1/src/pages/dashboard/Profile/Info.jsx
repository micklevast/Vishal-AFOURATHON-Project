import {
  Card,
  CardBody,
  Avatar,
  CardHeader,
  CardFooter,
  Typography,
  IconButton,
  TabsHeader,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Tab,
  Switch,
  Tooltip,
  Button,
  Progress,
} from "@material-tailwind/react";
import {
  ClockIcon,
  PencilIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Skill_card from "./Skill_card";
import Contact from "./Contact";

const Info = ({ data, handleClick, state }) => {
  return (
    data &&
 (   <div className="flex flex-col bg-transparent space-y-3 lg:flex-row">
      <div className="flex w-full flex-col">
        <div className="shadow-t-lg relative mt-2 h-[8rem] w-full rounded-t-xl bg-gradient-to-r from-amber-100 to-pink-50 md:h-[10rem]"></div>
        <div className="rounded-b-lg bg-white shadow-lg ">
          <div className="flex justify-between">
            <Avatar
          
              src={`${data["profile_photo"]?data["profile_photo"]:"/img/images.png"}`}
              alt="bruce-mars"
              // size=""
              className=" ml-[2.5rem] -mt-[4.2rem] h-[8rem] w-[8rem] rounded-full bg-white p-[.2rem] shadow-lg"
            />
            {!state && data && (
              <Menu placement="left-start" className="float-right p-2">
                <MenuHandler className="m-3">
                  <IconButton size="sm" variant="text" color="blue-gray">
                    <EllipsisVerticalIcon
                      strokeWidth={3}
                      fill="currenColor"
                      className="h-6 w-6 capitalize"
                    />
                  </IconButton>
                </MenuHandler>
                <MenuList>
                  <MenuItem className="p-0">
                    {/* <Link to="/auth/edit-profile"> */}
                    <button onClick={handleClick}>
                      <div className="flex items-center justify-evenly space-x-1">
                        <PencilIcon className="h-3 w-3" />

                        <span>Edit</span>
                      </div>
                      {/* </Link> */}
                    </button>
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </div>

          <div className="ml-[3rem] mt-2 flex flex-col space-y-1 pb-2 ">
            <Typography
              varient="h1"
              className="text-justify font-serif text-[1.6rem] font-bold"
            >
              {data && data.FirstName} {data && data.LastName}
            </Typography>
            <Typography
              className=" text-gray flex items-center space-x-3 text-[.8rem]"
              variant="paragraph"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 text-red-600"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{data && data.Location}, India</span>
            </Typography>

            <Typography
              variant="paragraph"
              className="flex items-center space-x-3 text-[.8rem]"
            >
              <img
                src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/null/external-suitcase-interface-kiranshastry-lineal-kiranshastry-1.png"
                className="h-5 w-5 bg-transparent "
              />
              <span>
                {data && data["Position"]} {data && data["Department"]}
              </span>
            </Typography>

            <div className="flex items-center space-x-3 py-4 font-serif">
              <button className="">Bussiness Card</button>
              <button className="rounded-md border border-[#0d05f5] px-3 py-1 text-[#0d05f5] transition-all duration-300 ease-in-out hover:bg-[#0d05f5] hover:text-white">
                Message
              </button>
            </div>
          </div>
        </div>
        <div className="my-8 rounded-lg bg-white shadow-lg">
          <Typography variant="h2" className="my-4 ml-5 text-[1.2rem]">
            About
          </Typography>
          <Typography className="ml-5 mb-3 text-[.8rem]">
            {data && data.about}
          </Typography>
        </div>
        <div className="">
          {data && <Skill_card data={data} state={state} />}
        </div>
      </div>
      <div className="md:ml-6">{data && <Contact data={data} handleClick={handleClick} state={state}></Contact>}</div>
    </div>)
  );
};

export default Info;
