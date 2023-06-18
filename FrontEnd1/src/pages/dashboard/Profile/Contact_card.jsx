// import GitHubIcon from '@mui/icons-material/GitHub';
const Contact_card = ({ number, icon, name, text, username, handleClick }) => {
  const handleVisit = () => {
    window.open(username, "_blank");
  };
  return (
    
    <div>
      <div className={`card card-${number}`}>
        <div className="flex items-center justify-between ">
          <div className="card__icon">
            <i class={icon}></i>
          </div>

          <h2 className="card__title font-serif text-[1rem]">{text}</h2>
        </div>

        <div className="mt-[3.5rem] flex items-center justify-center text-[1.2rem] font-bold text-white">
          {" "}
          {username ? name + "'s profile" : "+ Add github"}
        </div>

        <p className="card__apply">
          <button
            className="card__link"
            onClick={username ? handleVisit : handleClick}
          >
            {username ? "Visit Now" : "Add now"}{" "}
            <i className="fas fa-arrow-right"></i>
          </button>
        </p>
      </div>
    </div>
  );
};
export default Contact_card;
