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

  return (
    <div className={className}>
      <div className="task-name">{partName}</div>
      <div
        className="task-content"
        dangerouslySetInnerHTML={{ __html: task }}>
      </div>
    </div>
  );
};