import Contact_card from "./Contact_card";
const Contact = ({ data, handleClick,state }) => {
  return (
    <div className="flex flex-row justify-between overflow-scroll  lg:flex-col ">
      {((state && data["github"]) || (!state))  &&
      <Contact_card
        number={5}
        icon={"fa-brands fa-github"}
        text={"github "}
        handleClick={handleClick}
        username={data["github"]}
        name={data.FirstName}
        state={state}
      ></Contact_card>}
      {((state && data["linkedIn"]) || (!state))  &&
      <Contact_card
        number={2}
        icon={"fa-brands fa-linkedin"}
        text={"LinkedIN "}
        handleClick={handleClick}
        username={data["linkedIn"]}
        name={data.FirstName}
        state={state}
      ></Contact_card>}
      {((state && data["portfolio"]) || (!state))  &&

      <Contact_card
        number={3}
        icon={"fa-solid fa-link"}
        text={"Portfolio "}
        handleClick={handleClick}
        username={data["portfolio"]}
        name={data.FirstName}
        state={state}
      ></Contact_card>}
      {((state && data["leetcode"]) || (!state))  &&

      <Contact_card
        number={4}
        icon={"fa-solid fa-code"}
        text={"Leetcode "}
        handleClick={handleClick}
        username={data["leetcode"]}
        name={data.FirstName}
        state={state}
      ></Contact_card>}
    </div>
  );
};

export default Contact;
