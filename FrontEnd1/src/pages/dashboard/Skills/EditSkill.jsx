const EditSkill = ({
  token,
  setskill_to_edit,
  skill_to_edit,
  changeModalName,
  handleEditSkill,
  chunks,
  setchunks,
  changeColor,
  changeOverlay,
  changAlert,
  toggleOverlay,
}) => {
  return (
    <div className="absolute top-[10rem] left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform space-y-5 rounded-xl  bg-white px-8 py-5 lg:top-1/2">
      <div className="mb-3 border-b-2 border-gray-700 pb-2 text-xl ">
        Edit Skill Name
      </div>
      ID: <input type="text" value={skill_to_edit.skill_id} disabled />
      <p>Name :</p>{" "}
      <input
        className="border-b-2 outline-none"
        type="text"
        value={skill_to_edit.skill_name}
        onChange={(e) => {
          setskill_to_edit((prev) => ({ ...prev, skill_name: e.target.value }));
        }}
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={(e) => {
            changeModalName("Update");
          }}
          color="red"
          className="rounded bg-red-500 px-3 py-1 text-lg font-normal capitalize text-white"
        >
          Cancel
        </button>
        <button
          className="rounded bg-green-500 px-3 py-1 text-lg font-normal  capitalize text-white"
          onClick={(e) =>
            handleEditSkill(
              token,
              skill_to_edit,
              chunks,
              setchunks,
              changeColor,
              changeOverlay,
              changAlert,
              toggleOverlay
            )
          }
        >
          Update
        </button>
      </div>
      <hr />
    </div>
  );
};
export default EditSkill;
