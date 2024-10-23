"use client";
import React from "react";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { HiClipboardDocumentCheck } from "react-icons/hi2";
import { BsStack } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useContext } from "react";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";
import { UserInputContext } from "../_context/UserInputContext";
import { GenerateCourseLayout_AI } from "@/configs/AiModel";
import LoadingDialog from "./_components/LoadingDialog";
import { db } from "@/configs/db";
import { uuid4 } from "uuid4";
import { useUser } from "@clerk/nextjs";
import { CourseList } from "@/configs/schema";
import { useRouter } from "next/navigation";
const CreateCourse = () => {
  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <BsStack />,
    },
    {
      id: 2,
      name: "Topic & Description",
      icon: <HiMiniSquares2X2 />,
    },
    {
      id: 3,
      name: "Options",
      icon: <HiClipboardDocumentCheck />,
    },
  ];
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);
  // Used to check next buttin enabled or disablesd
  const checkSatus = () => {
    if (activeIndex == 0 && userCourseInput?.category) {
      return false;
    } else if (activeIndex == 1 && userCourseInput?.topic) {
      return false;
    } else if (
      activeIndex == 2 &&
      userCourseInput?.level &&
      userCourseInput?.duration &&
      userCourseInput?.displayVideo &&
      userCourseInput?.noOfChapters
    ) {
      return false;
    } else {
      return true;
    }
  };
  const GenerateCourseLayout = async () => {
    setLoading(true);
    const BASIC_PROMPT =
      "Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration:";
    const USER_INPUT_PROMPT =
      "Category: " +
      userCourseInput?.category +
      ", Topic: " +
      userCourseInput?.topic +
      ", Level: " +
      userCourseInput?.level +
      ", Duration: " +
      userCourseInput?.duration +
      ", NoOf Chapters:" +
      userCourseInput?.noOfChapters +
      ", in JSON format.";
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
    console.log(FINAL_PROMPT);
    const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
    console.log(result.response?.text());
    console.log(JSON.parse(result.response?.text()));
    setLoading(false);
    SaveCourseLayoutInDb(JSON.parse(result.response?.text()));
  };

  const SaveCourseLayoutInDb = async (courseLayout) => {
    // Save course layout to database
    var id = uuid4();
    setLoading(true);
    const result = await db.insert(CourseList).values({
      courseId: id, //course id
      name: userCourseInput?.topic,
      category: userCourseInput?.category,
      level: userCourseInput?.level,
      courseOutput: courseLayout,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      UserProfileImage: user?.imageUrl,
    });
    router.replace("/create-course/" + id);
    setLoading(false);
  };

  return (
    <div>
      {/* Stepper*/}
      <div className="flex flex-col justify-center mt-10 items-center">
        <h2 className="text-4xl text-primary font-medium">Create Course</h2>
        <div className="flex mt-10">
          {StepperOptions.map((item, index) => (
            <div className="flex items-center">
              <div className="flex flex-col items-center w-[50px] md:w-[150px]">
                <div
                  className={`bg-gray-200 p-3 rounded-full text-white ${
                    activeIndex >= index && "bg-purple-500"
                  }`}
                >
                  {item.icon}
                </div>
                <h2 className="hidden md:block md:text-sm">{item.name}</h2>
              </div>
              {index != StepperOptions?.length - 1 && (
                <div
                  className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${
                    activeIndex - 1 >= index && "bg-purple-500"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="px-10 md:px-20 lg:px-44 mt-10">
        {/* component */}
        {activeIndex == 0 ? (
          <SelectCategory />
        ) : activeIndex == 1 ? (
          <TopicDescription />
        ) : activeIndex == 2 ? (
          <SelectOption />
        ) : null}
        {/* next and Previos Button */}
        <div className="flex justify-between items-center mt-10">
          <Button
            disabled={activeIndex == 0}
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            Previous
          </Button>
          {activeIndex < 2 && (
            <Button
              disabled={checkSatus()}
              onClick={() => setActiveIndex(activeIndex + 1)}
            >
              Next
            </Button>
          )}
          {activeIndex == 2 && (
            <Button
              disabled={checkSatus()}
              onClick={() => GenerateCourseLayout()}
            >
              Generatre Course Layout
            </Button>
          )}
        </div>
      </div>
      <LoadingDialog loading={loading} />
    </div>
  );
};

export default CreateCourse;
