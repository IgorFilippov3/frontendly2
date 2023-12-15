'use client';

import React from 'react';
import './task.css';
import '../../utils/prism/prism.css';
import classNames from 'classnames';
import { useAppSelector } from '../part/state/hooks';
import { useRouter } from 'next/navigation';


export interface TaskProps {
  task: string;
  partName: string;
  isLastPart: boolean;
  nextUrl: string;
}

export const Task = ({ task, partName, isLastPart, nextUrl }: TaskProps) => {
  const router = useRouter();
  const open: boolean = useAppSelector(state => state.taskOpen.value);

  const className = classNames({
    'task': true,
    'hidden': !open,
  });

  const navigateNext = (url: string) => {
    router.push(url);
  }
  
  return (
    <div className={className}>
      <div className="task-name">{partName}</div>
      <div
        className="task-content"
        dangerouslySetInnerHTML={{ __html: task }}>
      </div>
      <div className="task-bottom">
        <button
          className="task-button"
          onClick={() => navigateNext(nextUrl)}>
          {isLastPart ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};