import {
  Card,
  CardBody,
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
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
const Skill_card = ({ data, state }) => {
  return (
    <Card className="  w-full  capitalize shadow-xl">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 flex items-center justify-between p-6 capitalize"
      >
        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="text-[1.2rem] capitalize"
          >
            Skills
          </Typography>
        </div>
        {!state && (
          <Menu placement="left-start">
            <MenuHandler>
              <IconButton size="sm" variant="text" color="blue-gray">
                <EllipsisVerticalIcon
                  strokeWidth={3}
                  fill="currenColor"
                  className="h-6 w-6 capitalize"
                />
              </IconButton>
            </MenuHandler>
            <MenuList>
              <MenuItem>
                <Link to="/dashboard/skills">Update Skills</Link>
              </MenuItem>

              <MenuItem>
                <Link to="/dashboard/skills">Add more skills</Link>
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </CardHeader>

      <CardBody className="max-h-[15rem]  overflow-x-scroll overflow-y-scroll px-0 pt-0">
        <table className="w-full min-w-[640px] table-auto">
          <thead className="sticky top-0 bg-white">
            <tr>
              {["Skill", "Domain", "Year of experience", "level"].map((el) => (
                <th
                  key={el}
                  className="border-b  border-blue-gray-50 py-3 px-6 text-center capitalize"
                >
                  <Typography
                    variant="paragraph"
                    className="text-xs  uppercase text-black "
                  >
                    {el}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className=" overflow-y-auto">
            {data["Skills"] &&
              data["Skills"].map((ele, key) => {
                if (ele.skill_id) {
                  console.log(ele);

                  const className = `py-3 px-5 ${
                    key === data["Skills"].length - 1 ? "" : ""
                  }`;
                  let c = 0;
                  if (ele.level == "Beginner") c = 25;
                  else if (ele.level == "Intermediate") c = 60;
                  else c = 100;
                  return (
                    <tr key={ele.skill_id._id}>
                      <td className={className}>
                        <div className="flex items-center gap-4 capitalize">
                          <Typography
                            variant="small"
                            className="text-center  text-xs font-medium capitalize text-black"
                          >
                            {ele.skill_id.skill_name}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-center  text-xs font-medium capitalize text-black"
                        >
                          {ele.skill_id.domain}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-center  text-xs font-medium capitalize text-black"
                        >
                          {ele.YOE}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="w-10/12">
                          <Typography
                            variant="small"
                            className="mb-1 block text-xs  font-medium capitalize text-black"
                          >
                            {ele.level}%
                          </Typography>
                          <Progress
                            value={c}
                            variant="gradient"
                            color={
                              c === 100 ? "green" : c === 60 ? "blue" : "red"
                            }
                            className="h-1 capitalize"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                }
              })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};
export default Skill_card;
