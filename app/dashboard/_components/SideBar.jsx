"use client";
import Image from "next/image";
import React from "react";
import { HiOutlineHome, HiOutlineGlobeAlt } from "react-icons/hi";
import { GiArmorUpgrade } from "react-icons/gi";
import { AiOutlineLogout } from "react-icons/ai";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { useContext } from "react";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";

const SideBar = () => {
  const { userCourseList, setUserCourseList } = useContext(
    UserCourseListContext
  );
  const Menu = [
    {
      id: 1,
      name: "Home",
      icon: <HiOutlineHome />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Explore",
      icon: <HiOutlineGlobeAlt />,
      path: "/dashboard/explore",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: <GiArmorUpgrade />,
      path: "/dashboard/upgrade",
    },
    {
      id: 4,
      name: "Logout",
      icon: <AiOutlineLogout />,
      path: "/dashboard/logout",
    },
  ];
  const Path = usePathname();
  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md">
      <Image src={"/logo.png"} alt="logo" width={120} height={100} />
      <hr className="my-5" />
      <ui>
        {Menu.map((item, index) => (
          <Link href={item.path}>
            <div
              className={`flex item-center gap-2 text-gray-600 p-3 mb-2 curser-pointer hover:bg-gray-100 hover:text-black rounded-lg 
            ${item.path === Path && "bg-gray-100 text-black"}`}
            >
              <div className="text-2xl">{item.icon}</div>
              <h2>{item.name}</h2>
            </div>
          </Link>
        ))}
      </ui>
      <hr className="my-5" />
      <div className="absolute bottom-10 w-[80%]">
        <Progress value={(userCourseList?.length / 5) * 100} />
        <h2 className="text-sm my-2">
          {userCourseList?.length} out of 5 course completed
        </h2>
        <h2 className="text-sx text-gray-500">
          Upgrade your plan for unlimited courses
        </h2>
      </div>
    </div>
  );
};

export default SideBar;
