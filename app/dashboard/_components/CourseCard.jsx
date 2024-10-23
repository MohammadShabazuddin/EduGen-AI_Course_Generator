import React from "react";
import Image from "next/image";
import { HiOutlineBookOpen, HiEllipsisVertical } from "react-icons/hi2";
import DropDownOptions from "./DropDownOption";
import { CourseList } from "@/configs/schema";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { useUser } from "@clerk/clerk-react";

const CourseCard = ({ course, refreshData, displayUser = false }) => {
  const handleOnDelete = async () => {
    const resp = await db
      .delete(CourseList)
      .where(eq(CourseList.id, course?.id))
      .returning({ id: CourseList?.id });

    if (resp) {
      refreshData();
    }
  };
  return (
    <div className="shadow-md rounded-lg mt-4 p-2 hover:scale-105 transition-transform cursor-pointer">
      <Link href={"/course/" + course?.courseId}>
        <Image
          src={course?.courseBanner ? course?.courseBanner : "/placeholder.png"}
          alt="AI Course"
          width={300}
          height={200}
          className="w-full h-[200px] object-cover rounded-lg"
        />
      </Link>
      <div className="p-2">
        <h2 className="font-medium text-lg flex justify-between items-center">
          {course?.courseOutput?.course?.name}
          {!displayUser && (
            <DropDownOptions handleOnDelete={() => handleOnDelete()}>
              <HiEllipsisVertical />
            </DropDownOptions>
          )}
        </h2>

        <p className="text-sm text-gray-400 my-1">{course?.category}</p>
        <div className="flex items-center justify-between">
          <h2 className="flex gap-2 items-center p-1 bg-purple-50 text-primary text-sm rounded-sm">
            <HiOutlineBookOpen />
            {course?.courseOutput?.course?.noOfChapters} Chapters
          </h2>
          <h2 className="text-sm bg-purple-50 p-1 rounded-sm">
            {course?.level}
          </h2>
        </div>
        {displayUser && (
          <div className="flex items-center gap-3 mt-2">
            <Image
              src={"/Avatar.jpg"}
              width={30}
              height={30}
              className="rounded-full"
            />
            <h2 className="text-sm">{course?.userName}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
