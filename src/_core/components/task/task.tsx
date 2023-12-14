'use client';

import React, { useEffect } from 'react';
import './task.css';
import '../../utils/prism/prism.css';
import classNames from 'classnames';
import { PartContextType, usePart } from '../part/part-provider';


declare var Prism: any;

export interface TaskProps {
  task: string;
  partName: string;
}

export const Task = ({ task, partName }: TaskProps) => {
  const ctx: PartContextType | null = usePart();

  const className = classNames({
    'task': true,
    'hidden': !ctx?.isTaskOpen
  });

  const defineNextButton = () => {
    return ctx?.isLastPart()
      ? (
        <button
          className="task-button"
          onClick={ctx?.navigateToLessonsList}>
          Finish
        </button>
      )
      : (
        <button
          className="task-button"
          onClick={ctx?.navigateToNextPart}>
          Next
        </button>
      );
  }

  return (
    <div className={className}>
      <div className="task-name">{partName}</div>
      <div
        className="task-content"
        dangerouslySetInnerHTML={{ __html: task }}>
      </div>
      <div className="task-bottom">{defineNextButton()}</div>
    </div>
  );
};