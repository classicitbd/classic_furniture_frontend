const PreLoader = () => {
  return (
    <div className="relative min-h-screen flex justify-center items-center bg-primaryColor">
      <div className="absolute rounded-full h-32 w-32"></div>
      <img
        alt="loader"
        src="/assets/images/logo/logo.png"
        className="rounded-full h-28 w-28"
      />
    </div>
  );
};

export default PreLoader;
