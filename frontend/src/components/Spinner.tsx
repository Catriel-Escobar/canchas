const Spinner = () => {
  return (
    <div className='z-50 inset-0 backdrop-blur-md fixed '>
      <div className=' w-full h-full flex justify-center items-center'>
        <div className='flex items-center justify-center'>
          <div className='w-8 h-8 border-4 border-t-transparent border-gray-500 rounded-full animate-spin-custom'></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
