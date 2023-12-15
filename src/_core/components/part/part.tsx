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

export interface LessonPartProps {
  data: LessonPartData
  userKey: string;
}

export const LessonPart = ({ data, userKey }: LessonPartProps) => {
  const { lesson, part, files } = data;
  
  const nextPart: PartShortInfo | undefined = getNextPart(part, lesson.parts!);
  const nextUrl: string = getNextUrl(nextPart, lesson.key, userKey);
  const isLastPart: boolean = typeof nextPart === 'undefined';

  return (
    <div className="part" style={{ overflow: 'hidden' }}>
      <Provider store={store}>
        <PartHeader name={lesson.name} parts={lesson.parts!} />
        <Task 
          task={part.taskHtml} 
          partName={part.name} 
          nextUrl={nextUrl}
          isLastPart={isLastPart} 
        />
        <Sandbox files={files} nextUrl={nextUrl} isLastPart={isLastPart} />
      </Provider>
    </div>
  );
};

const getNextPart = (currentPart: Part, shortInfo: PartShortInfo[]): PartShortInfo | undefined => {
  return shortInfo
    .find((si: PartShortInfo) => si.order > currentPart.order);
}

const getNextUrl = (nextPart: PartShortInfo | undefined, lessonKey: string, userKey: string): string => {
  if (typeof nextPart === 'undefined') return '/';

  return `/${userKey}/${lessonKey}/${nextPart.order}`;
}