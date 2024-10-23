import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { HiPencilSquare } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { CourseList } from "@/configs/schema";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";

const EditChapters = ({ course, index, refreshData }) => {
  const Chapters = course?.courseOutput?.course.chapters;
  const [name, setName] = useState();
  const [about, setAbout] = useState();

  useEffect(() => {
    setName(Chapters[index].name);
    setAbout(Chapters[index].about);
  }, [course]);

  const onUpdateHandler = async () => {
    course.courseOutput.course.chapters[index].name = name;
    course.courseOutput.course.chapters[index].about = about;
    const result = await db
      .update(CourseList)
      .set({ courseOutput: course?.courseOutput })
      .where(eq(CourseList?.id, course?.id))
      .returning({ id: CourseList.id });
    refreshData(true);
    console.log(result);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <HiPencilSquare />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>
          <DialogDescription>
            <div className="mt-3">
              <label>Course Title</label>
              <Input
                defaultValue={Chapters[index].name}
                onChange={(event) => setName(event?.target.value)}
              />
            </div>
            <div>
              <label>Course Description</label>
              <Textarea
                className="h-40"
                defaultValue={Chapters[index].about}
                onChange={(event) => setAbout(event?.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button onClick={onUpdateHandler}>Update</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditChapters;
