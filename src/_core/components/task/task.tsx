'use client';

import React, { useEffect } from 'react';
import './task.css';
import '../../utils/prism/prism.css';
import classNames from 'classnames';
import { PartContextType, usePart } from '../part/part-provider';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../part/state/hooks';


declare var Prism: any;

export interface TaskProps {
  task: string;
  partName: string;
  isLastPart: boolean;
  nextPartUrl: string;
}

export const Task = ({ task, partName }: TaskProps) => {
  const open: boolean = useAppSelector(state => state.taskOpen.value);

  const className = classNames({
    'task': true,
    'hidden': !open,
  });

  // const defineNextButton = () => {
  //   return ctx?.isLastPart()
  //     ? (
  //       <button
  //         className="task-button"
  //         onClick={ctx?.navigateToLessonsList}>
  //         Finish
  //       </button>
  //     )
  //     : (
  
  //     );
  // }

  return (
    <div className={className}>
      <div className="task-name">{partName}</div>
      <div
        className="task-content"
        dangerouslySetInnerHTML={{ __html: task }}>
      </div>
      <div className="task-bottom">
        {/* {defineNextButton()} */}
      </div>
    </div>
  );
};