import React from 'react';


const Card = () => {
  return (
    <div className="align-middle justify center ">
    <div className="max-w-xs bg-gray-900 rounded-lg shadow-md overflow-hidden">
      {/* Top section */}
      <div className="bg-blue-300_01 p-4 relative">

        {/* Text placeholders */}
        <div className="mt-2 flex">
            <div className="w-2/3">
                <div className="bg-gray-700 w-44 h-6 rounded-md mb-4 ml-3"></div>
                <div className="bg-gray-700 w-28 h-6 rounded-md ml-3">vishal</div>
                
            </div>
            <div className="w-1/3">
                <div className="bg-gray-700 w-16 h-16 rounded-md ml-5"></div>
            </div>
        </div>
      <div className="bg-gray-700 h-40 w-50 m-2 rounded-md"></div>

      {/* Bottom section */}
      <div className="bg-gray-700 h-10 w-50 rounded-md ml-2 mr-2 mt-2"></div>
    </div>
    </div>
    </div>
  );
};

export  {Card};
