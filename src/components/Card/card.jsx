import React from 'react';


const Card = ({classRoom}) => {
  return (
    <div className="align-middle justify center transition duration-300 ease-in shadow-[rgba(63,_176,_255,_0.39)_0px_3px_8px] hover:shadow-[0px_0px_95px_53px_rgba(63,_176,_255,_0.39)] rounded-xl max-w-xs">
      <div className="max-w-xs rounded-xl overflow-hidden">
      {/* Top section */}
      <div className="bg-white-a700 p-4 relative">

        {/* Text placeholders */}
        <div className="mt-2 flex">
            <div className="w-2/3">
                <div className="bg-blue-200_01 bg-opacity-70 w-44 h-6 rounded-md mb-4 ml-3">{classRoom?.classroomName}</div>
                <div className="bg-blue-200_01 bg-opacity-70 w-28 h-6 rounded-md ml-3">{classRoom?.classroomOwnerName}</div>
                
            </div>
            <div className="w-1/3">
                <div className="bg-blue-200_01 bg-opacity-70 w-16 h-16 rounded-md ml-5 flex justify-center items-center">
                  <h1 className='text-3xl font-black'>
                    {
                      classRoom?.classroomName.charAt(0)
                    }
                  </h1>
                </div>
            </div>
        </div>
      <div className="bg-blue-200_01 bg-opacity-70 h-40 w-50 m-2 rounded-md">{classRoom?.classroomDesc}</div>

      {/* Bottom section */}
      <div className="bg-blue-200_01 bg-opacity-70 h-10 w-50 rounded-md ml-2 mr-2 mt-2">
        No.Student: {classRoom?.classroomMembers?.length}
      </div>
      </div>
      </div>
    </div>
  );
};

export  {Card};
