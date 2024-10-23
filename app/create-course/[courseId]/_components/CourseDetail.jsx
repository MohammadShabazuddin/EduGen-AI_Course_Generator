import React from "react";
import {
  HiOutlineChartBar,
  HiOutlineBookOpen,
  HiOutlineClock,
  HiOutlinePlay,
} from "react-icons/hi";
const CourseDetail = ({ course }) => {
  return (
    <div className="border p-6 rounded-xl shadow-sm mt-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="flex gap-2">
          <HiOutlineChartBar className="text-5xl text-primary" />
          <div>
            <h2>Skill Level</h2>
            <h2 className="font-medium text-lg">{course?.level}</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <HiOutlineClock className="text-5xl text-primary" />
          <div>
            <h2>Duration</h2>
            <h2 className="font-medium text-lg">
              {course?.courseOutput?.course?.duration}
            </h2>
          </div>
        </div>
        <div className="flex gap-2">
          <HiOutlineBookOpen className="text-5xl text-primary" />
          <div>
            <h2>No Of Chapters</h2>
            <h2 className="font-medium text-lg">
              {course?.courseOutput?.course?.noOfChapters}
            </h2>
          </div>
        </div>
        <div className="flex gap-2">
          <HiOutlinePlay className="text-5xl text-primary" />
          <div>
            <h2>Video Includud?</h2>
            <h2 className="font-medium text-lg">{course?.includeVideo}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
