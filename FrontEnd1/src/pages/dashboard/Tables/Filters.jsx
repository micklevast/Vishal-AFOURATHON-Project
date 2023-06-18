const Filters = ({
  gender,
  position,
  location,
  department,
  filter_gender,
  filter_department,
  filter_location,
  filter_position,
  setGenderF,
  setPositionF,
  setDepartmentF,
  setLocationF,
  handleChange,
}) => {
  return (
    <div className="flex-center my-4 flex space-x-4 overflow-x-scroll text-black">
      {/* <form  className='flex space-x-4 text-black'> */}

      <label className="mt-[.2rem] mr-1 font-serif text-[1rem]" for="slct">
        Gender:
      </label>
      <select
        id="slct"
        className="border-grey-300 -mt-[.4px] block border bg-white font-serif text-[1rem] focus:outline-blue-500"
        value={filter_gender}
        onChange={(event) => setGenderF(event.target.value)}
      >
        <option value="All">All</option>

        {gender.map((e) => (
          <option value={e} key={e}>
            {e}
          </option>
        ))}
      </select>

      <label className="mt-[.2rem] mr-1 font-serif text-[1rem]" for="slct2">
        Location:
      </label>
      <select
        id="slct2"
        className="border-grey-300 -mt-[.4px] block border bg-white font-serif text-[1rem] focus:outline-blue-500"
        value={filter_location}
        onChange={(event) => setLocationF(event.target.value)}
      >
        <option value="All">All</option>
        {location.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>

      <label className="mt-[.2rem] mr-1 font-serif text-[1rem]" id="slct4">
        Department:
      </label>
      <select
        id="slct4"
        className="border-grey-300  -mt-[.4px] block border bg-white font-serif text-[1rem] focus:outline-blue-500"
        value={filter_department}
        onChange={(event) => setDepartmentF(event.target.value)}
      >
        <option value="All">All</option>
        {department.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>

      <label className="mt-[.2rem] mr-1 font-serif text-[1rem]" for="slct3">
        Position:
      </label>
      <select
        className="border-grey-300 -mt-[.4px] block border bg-white font-serif text-[1rem] focus:outline-blue-500"
        value={filter_position}
        onChange={(event) => setPositionF(event.target.value)}
        id="slct3"
      >
        <option value="All">All</option>
        {position.map((position) => (
          <option key={position} value={position}>
            {position}
          </option>
        ))}
      </select>

      <input
        value="Filter"
        className="border border-blue-500 px-1 font-serif text-[1rem]"
        type="submit"
        onClick={(e) => handleChange(e)}
      />
    </div>
  );
};
export default Filters;
