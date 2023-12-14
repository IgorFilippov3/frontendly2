'use client';

import { Lesson } from "@/_core/models/lesson/lesson.model";
import { PartShortInfo } from "@/_core/models/part/part-short-info.model";
import { Part } from "@/_core/models/part/part.model";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

export interface PartProviderProps {
  children: JSX.Element | JSX.Element[];
  lesson: Lesson;
  part: Part;
}

export interface PartContextType {
  isTaskOpen: boolean;
  toggleTaskOpen: () => void;
  navigateToPart: (partId: number) => void;
  navigateToNextPart: () => void;
  navigateToLessonsList: () => void;
  isLastPart: () => boolean;
  parts: PartShortInfo[];
}

const PartContext = createContext<PartContextType | null>(null);

export const PartProvider = ({ children, lesson, part }: PartProviderProps) => {
  const [isTaskOpen, setIsTaskOpen] = useState<boolean>(true);
  const router = useRouter();

  const toggleTaskOpen = () => setIsTaskOpen((isOpen: boolean) => !isOpen);

  const findNextPart = (currentPart: Part, parts: PartShortInfo[]) => {
    for (let p of parts) {
      if (p.order > currentPart.order) {
        return p;
      }
    }

    return parts[0];
  }

  const navigateToPart = (partId: number) => {
    router.push(`/lesson/${lesson.id}/${partId}`);
  }

  const navigateToNextPart = () => {
    if (!lesson.parts) return;

    const nextPart: PartShortInfo = findNextPart(part, lesson.parts);
    router.push(`/lesson/${lesson.id}/${nextPart.id}`);
  }

  const navigateToLessonsList = () => {}
  const isLastPart = () => {
    if (!lesson.parts) return true;
    const last: PartShortInfo = lesson.parts.slice(-1)[0];
    return part.id === last.id;
  };

  return (
    <PartContext.Provider value={{ 
      isTaskOpen, 
      toggleTaskOpen,
      navigateToPart,
      navigateToNextPart,
      navigateToLessonsList,
      isLastPart,
      parts: lesson.parts!,
      }}>
      {children}
    </PartContext.Provider>
  );
};

export const usePart = () => useContext(PartContext);