import { File } from "../file/file.model";

export interface Part {
  id: number;
  name: string;
  order: number;
  taskHtml: string;
  taskMarkdown: string;
  createdAt: Date;
  updatedAt: Date;
  files?: File[];
}