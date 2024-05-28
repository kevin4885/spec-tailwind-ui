import Icon from "./Icon/Icon.jsx";

const Colors = ["red", "orange", "yellow", "green", "indigo", "purple", "fuchsia", "pink"];

const Avatar = ({ image, initials, firstName, lastName, checked, checkColor, name, onClick, itemId }) => {
  const handleClick = e => {
    if (onClick) onClick(e, itemId, !checked);
  };

  if (!checked) {
    if (image) {
      return (
        <div className={"select-none w-8 h-8 relative flex justify-center items-center rounded-full bg-gray-500 text-white" + (onClick && " cursor-pointer")} onClick={handleClick}>
          <img src={image} alt="user" className="rounded-full" />
        </div>
      );
    }

    let _initials = "?";

    if (initials) {
      _initials = initials;
    } else {
      if (!name) {
        if (firstName && firstName.length > 0) {
          _initials = firstName[0];
        }
        if (lastName && lastName.length > 0) {
          _initials += lastName[0];
        }
      } else {
        _initials = name[0];
      }
    }

    if (_initials === "") _initials = "?";
    let code = _initials.charCodeAt(0);
    if (_initials.length > 1) code += _initials.charCodeAt(1);
    let colorName = Colors[code % Colors.length];
    if (true) {
      return (
        <div className={"select-none w-8 h-8 relative flex justify-center items-center rounded-full bg-" + colorName + "-500  text-white uppercase" + (onClick && " cursor-pointer")} onClick={handleClick}>
          {_initials}
        </div>
      );
    }
  } else {
    return (
      <div className={"select-none p-1 w-8 h-8 inline-flex justify-center items-center cursor-pointer rounded-full bg-" + checkColor + "-500 text-white "} onClick={handleClick}>
        <Icon icon="check" size={20} />
      </div>
    );
  }
};

//display: inline-block; stroke: currentcolor; fill: currentcolor; width: 20px; height: 20px;
export default Avatar;
