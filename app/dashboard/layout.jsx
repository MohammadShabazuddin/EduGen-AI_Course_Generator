"use client";
import React from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";
import { useState, useEffect } from "react";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";

const DashboardLayout = ({ children }) => {
  const [userCourseList, setUserCourseList] = useState([]);

  // Ensure data is only fetched/set on the client-side
  useEffect(() => {
    // Initialize userCourseList here if needed
    // Example: setUserCourseList(fetchedCourses);
  }, []);

  return (
    <UserCourseListContext.Provider
      value={{ userCourseList, setUserCourseList }}
    >
      <div>
        <div className="md:w-64 hidden md:block">
          <SideBar />
        </div>
        <div className="md:ml-64">
          <Header />
          <div className="p-10"> {children}</div>
        </div>
      </div>
    </UserCourseListContext.Provider>
  );
};

export default DashboardLayout;
