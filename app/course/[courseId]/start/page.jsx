"use client";
import React from "react";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";
import { Chapters } from "@/configs/schema";
import { and } from "drizzle-orm";

function CourseStart({ params }) {
  const [course, setCourse] = useState();
  const [selectedChapter, setSelectedChapter] = useState();
  const [chapterContent, setChapterContent] = useState();

  useEffect(() => {
    GetCourse();
  }, []);

  /**
   * Used to get Course Info by Course Id
   */
  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, params?.courseId));

    setCourse(result[0]);
  };

  const GetSelectedChapterContent = async (chapterId) => {
    const result = await db
      .select()
      .from(Chapters)
      .where(
        and(
          eq(Chapters.chapterId, chapterId),
          eq(Chapters.courseId, course?.courseId)
        )
      );
    console.log(result);
    setChapterContent(result[0]);
  };

  return (
    <div>
      {/* Chapter list Side Bar */}
      <div className="fixed md:w-72 hidden md:block h-screen border-r shadow-sm">
        <h2 className="font-medium text-lg bg-primary p-4 text-white ">
          {course?.courseOutput?.course?.name}
        </h2>
        <div>
          {course?.courseOutput?.course?.chapters.map((chapter, index) => (
            // Chapter content here
            <div
              key={index}
              className={`cursor-pointer hover:bg-purple-50 ${
                selectedChapter?.name == chapter?.name && "bg-purple-100"
              }`}
              onClick={() => {
                setSelectedChapter(chapter);
                GetSelectedChapterContent(index);
              }}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Content Div */}
      <div className="md:ml-72">
        {/* Main content here */}
        <ChapterContent chapter={selectedChapter} content={chapterContent} />
      </div>
    </div>
  );
}

export default CourseStart;
