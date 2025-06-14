const FullPageLoading = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white bg-opacity-40 flex justify-center items-center">
      <div className="w-14 h-14 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};
export default FullPageLoading;
