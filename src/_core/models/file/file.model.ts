import { FileType } from "./file-type.model";

export interface File {
  id: number;
  name: string;
  path: string;
  type: FileType;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}