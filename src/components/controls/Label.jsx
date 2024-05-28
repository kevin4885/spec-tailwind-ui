const Label = ({ className, htmlFor, children }) => {
  return (
    <label className={"block  " + className} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default Label;
