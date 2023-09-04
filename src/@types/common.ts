import { ReactNode } from 'react';

export type FileTypes = 'file' | 'image' | 'video' | 'audio';
export type KeyboardBehavior = "padding" | "position" | "height" | undefined;

export type WithChildren<T = {}> = T & {
  children?: ReactNode
};

export interface ImagePickerType {
  uri: string;
  width: number;
  height: number;
  base64?: string;
  type?: 'image' | 'video';
  exif?: {
    [key: string]: any;
  };
};

export interface UploadFileSchema {
  uri: string
  name: string
  type: string | undefined
}

export interface UploadDocType {
  uri: string;
  type: string;
  name: string;
}

export interface UploadProgress {
  total: number;
  loaded: number;
  isTrusted: boolean;
  lengthComputable: boolean,
}