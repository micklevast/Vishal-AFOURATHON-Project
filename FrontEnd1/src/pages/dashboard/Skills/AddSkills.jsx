import { useState } from "react";
const AddSkills = ({
  slct_skill,
  select_v,
  setSkill,
  changeSelectV,
  setData,
  domain_data,
  toggleOverlay,
  changeOverlay,
  handleSkill,
  setDomainData,
  data,
}) => {
  const [other, setOther] = useState("");
  return (
    <div className="absolute top-[20rem] left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-xl bg-white  px-8 py-5 lg:top-1/2">
      <div className="mb-3 border-b-2 border-gray-700 pb-2 text-xl">
        Add Skill
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-0">
          <label htmlFor="skill">
            Skill <small className="absolute ml-1 text-red-900 ">*</small>{" "}
          </label>
          <input
            type="text"
            value={slct_skill}
            name="skill"
            id="skill"
            className="border-b-2 border-blue-300  px-2 py-1 outline-none"
            onChange={(e) => setSkill(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="domain">
            Domain <small className="absolute ml-1 text-red-900 ">*</small>
          </label>
          <select
            className=" border border-blue-500 bg-white px-3 py-1 outline-none "
            name=""
            id=""
            value={select_v}
            onChange={(e) => changeSelectV(e.target.value)}
          >
            <option value={"Other"}>Other</option>

            {domain_data &&
              domain_data.map((ele, idx) => {
                return (
                  <option key={idx} value={ele}>
                    {ele}
                  </option>
                );
              })}
            {/* {console.log(select_v)} */}
          </select>
          <div
            className={`flex flex-col gap-0 ${
              select_v === "Other" ? "visible" : "hidden"
            }`}
          >
            <label htmlFor="skill">
              Domain Name{" "}
              <small className="absolute ml-1 text-red-900 ">*</small>{" "}
            </label>
            <input
              type="text"
              value={other}
              name="skill"
              id="skill"
              className={`border-b-2 border-blue-300  px-2 py-1 outline-none`}
              onChange={(e) => setOther(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pb-3">
          <button
            onClick={(e) => {
              toggleOverlay(false);
              changeOverlay(false);
            }}
            color="red"
            className="rounded bg-red-500 px-3 py-1 text-lg font-normal capitalize text-white"
          >
            Cancel
          </button>
          <button
            className="rounded bg-green-500 px-3 py-1 text-lg font-normal  capitalize text-white"
            onClick={(e) =>
              handleSkill(
                e,
                slct_skill,
                select_v,
                changeOverlay,
                toggleOverlay,
                setData,
                setDomainData,
                data,
                other
              )
            }
          >
            Add
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default AddSkills;
