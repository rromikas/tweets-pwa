import React from "react";

const ImageViewer = () => {
  return (
    <div
      className={`w-full m-auto flex flex-col bg-blue-900 h-full fixed left-0 top-0 overflow-auto`}
    >
      <div className="text-center py-1 text-lg text-white font-bold">
        Images Appear Here Once Detected
      </div>
      <div className="flex-grow rounded-2xl bg-blue-700 mx-8 mb-8 mt-3"></div>
    </div>
  );
};

export default ImageViewer;
