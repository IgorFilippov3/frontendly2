import { SandpackPredefinedTemplate } from "@codesandbox/sandpack-react";
import { LessonContentType } from "../models/lesson/lesson-content-type.model";

export function getSandboxTemplate(
  contentType: LessonContentType
): SandpackPredefinedTemplate {
  switch (contentType) {
    case LessonContentType.html:
    case LessonContentType.css:
      return 'static';
    case LessonContentType.javascript:
      return 'vanilla';
    case LessonContentType.typescript:
      return 'vanilla-ts';
    case LessonContentType.reactjs:
      return 'react';
    case LessonContentType.reactts:
      return 'react-ts';
    case LessonContentType.angular:
      return 'angular';
    default:
      throw new Error('Invalid lesson content type');
  }
}