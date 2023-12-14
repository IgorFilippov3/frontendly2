import { CollectionType } from "../collection-type.model";

export enum LessonAccessType {
  free = "free",
  paid = "paid",
}

export type LessonAccessTypeItem = CollectionType<LessonAccessType>;

export namespace LessonAccessType {

  export function getItems(): LessonAccessTypeItem[] {
    return items;
  }

  const items: LessonAccessTypeItem[] = [
    { value: LessonAccessType.free, displayName: 'Free' },
    { value: LessonAccessType.paid, displayName: 'Paid' },
  ];
}