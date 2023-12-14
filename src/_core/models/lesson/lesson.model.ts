import { PartShortInfo } from "../part/part-short-info.model";
import { LessonAccessType } from "./lesson-access-type.model";
import { LessonContentType } from "./lesson-content-type.model";

export interface Lesson {
  id: number;
  name: string;
  key: string;
  published: boolean;
  contentType: LessonContentType;
  accessType: LessonAccessType;
  createdAt: Date;
  updatedAt: Date;
  posterImage: string | null;
  parts?: PartShortInfo[];
  user?: {
    name: string;
    key: string;
  }
}