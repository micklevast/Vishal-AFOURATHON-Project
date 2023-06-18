import axios from "axios";

export async function fetchData(
  setData,
  setDepartment,
  setGender,
  setLocation,
  setPosition,
  filter_gender,
  filter_location,
  filter_department,
  filter_position
) {
  await axios
    .post(`${import.meta.env.VITE_APP_API_URL}/getEmployee`, {
      gender: filter_gender,
      location: filter_location,
      department: filter_department,
      position: filter_position,
    })
    .then(async (d) => {
      const dd = await d.data;
      setData(dd.data);
      // console.log(dd)
      let loc = [];
      let pos = [],
        dep = [],
        gen = [];
      dd.data.map((a, i) => {
        if (!loc.includes(a.Location)) loc.push(a.Location);
        if (!pos.includes(a.Position)) pos.push(a.Position);
        if (!gen.includes(a.Gender)) gen.push(a.Gender);
        if (!dep.includes(a.Department)) dep.push(a.Department);
      });
      setDepartment(dep);
      setGender(gen);
      setLocation(loc);
      setPosition(pos);
    })
    .catch((ee) => {
      console.log(ee);
    });
}
