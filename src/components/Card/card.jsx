import React from 'react';
import { Heading } from '../Heading';
import { useNavigate } from 'react-router-dom';

const Card = ({ classRoom }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    console.log("Card clicked:", classRoom._id); 
  if (classRoom._id) {
    navigate(`/class-management/${classRoom._id}`);
  } else {
    console.error("classRoom._id is undefined");
  }
  console.log("end");
  };

  return (
    <div onClick={() => handleCardClick(classRoom._id)} className="align-middle justify-center transition duration-300 ease-in shadow-[rgba(63,_176,_255,_0.39)_0px_3px_8px] hover:shadow-[0px_0px_95px_53px_rgba(63,_176,_255,_0.39)] rounded-xl max-w-xs cursor-pointer">
      <h3>{classRoom.name}</h3>
      <div className="max-w-xs rounded-xl overflow-hidden">
        {/* Top section */}
        <div className="bg-white-a700 p-4 relative">
          {/* Text placeholders */}
          <div className="mt-2 flex">
            <div className="w-2/3">
              <div className="bg-blue-200_01 w-44 h-6 rounded-md mb-4 ml-3 flex items-center pl-2 py-4">
                <Heading as='h2' size="headinglg" className='text-black-900'>
                  {typeof classRoom?.classroomName === 'string' && classRoom.classroomName.length > 10
                    ? classRoom.classroomName.slice(0, 10) + "..."
                    : classRoom?.classroomName}
                </Heading>
              </div>
              <div className="bg-blue-200_01 w-28 h-6 rounded-md ml-3 flex items-center p-2">
                <Heading as='h2' className='text-black-900 text-[1.00rem] font-semibold'>
                  {typeof classRoom?.classroomOwnerName === 'string' && classRoom?.classroomOwnerName.length > 20
                    ? classRoom.classroomOwnerName.slice(0, 20) + "..."
                    : classRoom?.classroomOwnerName}
                </Heading>
              </div>
            </div>
            <div className="w-1/3">
              <div className="bg-blue-200_01 w-16 h-16 rounded-md ml-5 flex justify-center items-center">
                <h1 className='text-3xl font-black'>
                  {classRoom?.classroomOwnerName.charAt(0)}
                </h1>
              </div>
            </div>
          </div>
          <div className="bg-blue-200_01 h-40 w-50 m-2 rounded-md p-2">
            <Heading as='h4' size='textmd' className='text-black-900'>
              {typeof classRoom?.classroomDesc === 'string' && classRoom?.classroomDesc.length > 50
                ? classRoom.classroomDesc.slice(0, 100) + "..."
                : classRoom?.classroomDesc}
            </Heading>
          </div>
          {/* Bottom section */}
          <div className="bg-blue-200_01 h-10 w-50 rounded-md ml-2 mr-2 mt-2 flex items-center p-2">
            <Heading as='h4' size='textmd' className='text-black-900'>
              No.Student: {classRoom?.classroomMembersID?.length}
            </Heading>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Card };