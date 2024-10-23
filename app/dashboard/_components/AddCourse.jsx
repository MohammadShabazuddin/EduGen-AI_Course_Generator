"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useContext } from "react";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";

const AddCourse = () => {
  const { user } = useUser();
  const { userCourseList, setUserCourseList } = useContext(
    UserCourseListContext
  );
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-3xl">
          Hello,
          <span className="font-bold"> {user?.fullName}</span>
        </h2>
        <p>Create new course with AI, Share with friends and earn from it</p>
      </div>
      <Link
        href={
          userCourseList?.length < 5 ? "/create-course" : "dashboard/upgrade"
        }
      >
        <Button className="bg-blue-500 text-white hover:bg-blue-600">
          Create Course
        </Button>
      </Link>
    </div>
  );
};

export default AddCourse;
