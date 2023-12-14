'use client';

import React from 'react';
import { PartProvider } from './part-provider';
import { Task } from '../task/task';
import { Sandbox } from '../sandbox/sandbox';
import { PartHeader } from './part-header';
import { LessonPartData } from '@/_core/models/lesson/lesson-part-data.model';

export interface LessonPartProps {
  data: LessonPartData
}

export const LessonPart = ({ data }: LessonPartProps) => {
  const { lesson, part, files } = data;

  return (
    <div className="part" style={{ overflow: 'hidden' }}>
      <PartProvider lesson={lesson} part={part}>
        <PartHeader name={lesson.name} />
        <Task task={part.taskHtml} partName={part.name}/>
        <Sandbox files={files}/>
      </PartProvider>
    </div>
  );
};