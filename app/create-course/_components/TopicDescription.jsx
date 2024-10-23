import React, { useContext } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserInputContext } from "@/app/_context/UserInputContext";

const TopicDescription = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const handleInputChange = (fieldName, Value) => {
    setUserCourseInput((prev) => ({ ...prev, [fieldName]: Value }));
  };
  return (
    <div className="mx-20 lg:mx-44">
      {/* Input Topic */}
      <div className="mt-5">
        <label className="text-sm font-medium">
          Write the topic for which you want to generate a course (e.g., Python
          Course, Yoga, etc.):
        </label>
        <Input
          placeholder={"Topic"}
          defaultValue={userCourseInput?.topic}
          onChange={(e) => handleInputChange("topic", e.target.value)}
        />
      </div>
      {/* Text area Description */}
      <div className="mt-5">
        <label className="text-sm font-medium">
          Tell us more about your course, what you want to include in the course
          (optional)
        </label>
        <Textarea
          placeholder="About your course"
          defaultValue={userCourseInput?.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </div>
    </div>
  );
};

export default TopicDescription;
