type LoadingProps = {
  progress: number;
};

const Loading: React.FC<LoadingProps> = ({ progress }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-lg font-semibold">Loading...</div>
      <div className="w-64 bg-gray-200 h-4 mt-2">
        <div className="bg-blue-500 h-4 text-xs flex justify-center items-center" style={{ width: `${progress}%` }}>
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default Loading;
