/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
function Button({
  cls,
  label,
  handleOnButtonClick,
  handleOnMouseDown,
  isMouseDown,
}) {
  const btnStyle = {
    transform: isMouseDown ? "scale(0.9)" : "scale(1)",
    transition: "transform 0.3s",
  };

  return (
    <div
      style={isMouseDown === label ? btnStyle : null}
      className={"btn " + cls}
      onClick={() => handleOnButtonClick(label)}
      onMouseDown={() => handleOnMouseDown(label)}
    >
      {label}
    </div>
  );
}

export default Button;
