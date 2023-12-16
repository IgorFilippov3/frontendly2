import { CollectionType } from "../collection-type.model";

export enum LessonContentType {
  html = "html",
  css = "css",
  javascript = "javascript",
  typescript = 'typescript',
  reactjs = "reactjs",
  reactts = "reactts",
  angular = "angular",
}

export type LessonContentTypeItem = CollectionType<LessonContentType>;

export namespace LessonContentType {

  export function getItems(): LessonContentTypeItem[] {
    return items;
  }

  const items: LessonContentTypeItem[] = [
    { value: LessonContentType.html, displayName: 'HTML' },
    { value: LessonContentType.css, displayName: 'CSS ' },
    { value: LessonContentType.javascript, displayName: 'Javascript' },
    { value: LessonContentType.typescript, displayName: 'Typescript' },
    { value: LessonContentType.reactjs, displayName: 'React Javascript' },
    { value: LessonContentType.reactts, displayName: 'React Typescript' },
    { value: LessonContentType.angular, displayName: 'Angular' },
  ];
}