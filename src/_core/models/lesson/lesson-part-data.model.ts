import { File } from "../file/file.model";
import { Part } from "../part/part.model";
import { Lesson } from "./lesson.model";

export interface LessonPartData {
  lesson: Lesson;
  part: Part;
  files: File[];
}