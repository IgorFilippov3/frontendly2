import { CollectionType } from "../collection-type.model";

export enum FileType {
  html = "html",
  css = "css",
  javascript = "javascript",
}

export type FileTypeItem = CollectionType<FileType>;

export namespace FileType {

  export function getItems(): FileTypeItem[] {
    return items;
  }

  const items: FileTypeItem[] = [
    { value: FileType.html, displayName: 'HTML' },
    { value: FileType.css, displayName: 'CSS' },
    { value: FileType.javascript, displayName: 'Javascript' },
  ];
}