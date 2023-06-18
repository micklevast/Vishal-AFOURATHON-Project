import { CheckBadgeIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

const Domain = ({
  ele,
  domain,
  idx,
  data,
  handleCheck,
  setdomain,
  setSkills,
}) => {
  return (
    <div className="w-[12rem]">
      <div
        key={idx}
        className={`flex h-16 w-[12rem] items-center justify-center rounded-xl border-2 border-purple-500  text-blue-600 shadow-lg ${
          domain === ele ? "bg-white" : " bg-gray-100"
        }`}
      >
        <CheckBadgeIcon
          className={`h-5 w-5 text-inherit ${domain !== ele ? "hidden" : ""}`}
        ></CheckBadgeIcon>

        <input
          type="radio"
          name={ele}
          id={ele}
          checked={domain == ele}
          onChange={(e) => handleCheck(e, setSkills, setdomain, data)}
          className="hidden"
        ></input>
        <label htmlFor={ele} className="text-center	text-xl">
          {ele}
        </label>
      </div>
    </div>
  );
};
export default Domain;
