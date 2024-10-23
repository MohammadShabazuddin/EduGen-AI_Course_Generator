"use client";
import { db } from "@/configs/db";
import { CourseList, Chapters } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenerateChapterContent_AI } from "@/configs/AiModel";
import LoadingDialog from "../_components/LoadingDialog";
import service from "@/configs/service";
import { useRouter } from "next/navigation";

function CourseLayout({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    params && GetCourse();
  }, [params, user]);
  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList.courseId, params?.courseId),
          eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    setCourse(result[0]);
    // console.log(result);
  };

  const GenerateChapterContent = () => {
    setLoading(true);
    const chapters = course?.courseOutput?.course?.chapters;
    chapters.forEach(async (chapter, index) => {
      const PROMPT =
        "Explain the concept in Detail on Topic: " +
        course?.name +
        ", Chapter: " +
        chapter?.name +
        ", in JSON Format with list of array with field as title, explanation on give chapter in detail, Code Example (Code field in <precode> format) if applicable";
      console.log(PROMPT);
      // if (index < 3) {
      try {
        let videoId = "";

        //Generate Video URL
        await service
          .getVideos(course?.name + ":" + chapter?.name)
          .then((resp) => {
            videoId = resp[0]?.id?.videoId;
            console.log(resp);
          });
        //generate chapter content
        const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
        // console.log(result.response?.text());
        const content = JSON.parse(result?.response?.text());

        //Save chapter content and Video URL in DB
        await db.insert(Chapters).values({
          chapterId: index,
          courseId: course?.courseId,
          content: content,
          videoId: videoId,
        });

        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
      await db.update(CourseList).set({ publish: true });
      router.replace("/create-course/" + course?.courseId + "/finish");
      // }
    });
  };
  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44 ">
      <h2 className="font-bold text-center text-4xl">Course Layout</h2>
      <LoadingDialog loading={loading} />
      {/* Basic Information */}
      <CourseBasicInfo course={course} refreshData={() => GetCourse()} />
      {/* Course Detail */}
      <CourseDetail course={course} />
      {/* List of Lessons */}
      <ChapterList course={course} refreshData={() => GetCourse()} />

      <div class="flex justify-center">
        <Button onClick={GenerateChapterContent} className="my-10">
          Generate Course Content
        </Button>
      </div>
    </div>
  );
}

export default CourseLayout;
