'use client';

import React from 'react';
import { Task } from '../task/task';
import { Sandbox } from '../sandbox/sandbox';
import { PartHeader } from './part-header';
import { LessonPartData } from '@/_core/models/lesson/lesson-part-data.model';
import { Provider } from 'react-redux'
import { store } from './state/store';
import { Part } from '@/_core/models/part/part.model';
import { PartShortInfo } from '@/_core/models/part/part-short-info.model';
import { Lesson } from '@/_core/models/lesson/lesson.model';

export interface LessonPartProps {
  data: LessonPartData
}

export const LessonPart = ({ data }: LessonPartProps) => {
  const { lesson, part, files } = data;
  const isLastPart: boolean = getIsLastPart(part, lesson.parts);
  const nextPartUrl: string = getNextPartUrl(part, lesson);

  return (
    <div className="part" style={{ overflow: 'hidden' }}>
      <Provider store={store}>
        <PartHeader name={lesson.name} />
        <Task 
          task={part.taskHtml} 
          partName={part.name} 
          nextPartUrl={nextPartUrl} 
          isLastPart={isLastPart} 
        />
        <Sandbox files={files} />
      </Provider>
    </div>
  );
};

const getIsLastPart = (currentPart: Part, shortInfo: PartShortInfo[] | undefined) => {
  if (!shortInfo) return true;
  const last: PartShortInfo = shortInfo.slice(-1)[0];
  return currentPart.id === last.id;
}

const getNextPartUrl = (currentPart: Part, lesson: Lesson) => {
  const nextPart = findNextPart(currentPart, lesson.parts);
  return `/lesson/${lesson.id}/${nextPart.id}`;
}

const findNextPart = (currentPart: Part, parts: PartShortInfo[] | undefined) => {
  if (!parts) return currentPart;

  for (let p of parts) {
    if (p.order > currentPart.order) {
      return p;
    }
  }
  return currentPart;
}