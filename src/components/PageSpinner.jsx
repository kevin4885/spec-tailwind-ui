import Spinner from "./Spinner";

const PageSpinner = () => {
  return (
    <div className="flex items-center justify-center py-8 h-full">
      <div className="h-20 w-20">
        <Spinner></Spinner>
      </div>
    </div>
  );
};

export default PageSpinner;
