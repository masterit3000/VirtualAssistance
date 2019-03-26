import { ITeacherDocument } from 'app/shared/model/teacher-document.model';
import { IDocumentType } from 'app/shared/model/document-type.model';

export const enum Status {
  EXIST = 'EXIST',
  DELETED = 'DELETED'
}

export interface IDocument {
  id?: number;
  name?: string;
  description?: string;
  uRL?: string;
  size?: number;
  tag?: string;
  status?: Status;
  isShared?: boolean;
  documents?: ITeacherDocument[];
  documentTypes?: IDocumentType[];
}

export const defaultValue: Readonly<IDocument> = {
  isShared: false
};
