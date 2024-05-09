import "./CreateBtn.scss";
const CreateBtn = () => {
  return (
    <button className="create-btn">
      <svg
        className="create-btn__hexSvg"
        width="287.000000"
        height="90.000000"
        viewBox="0 0 287 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs />
        <path
          id="Rectangle 3"
          d="M35.87 0L251.12 0L287 45L251.12 90L215.25 90L143.5 90L71.75 90L35.87 90L0 45L35.87 0Z"
          
          fill-opacity="1.000000"
          fill-rule="nonzero"
        />
      </svg>
      <span className="create-btn__text">Создать работу</span>
    </button>
  );
};
export default CreateBtn;
