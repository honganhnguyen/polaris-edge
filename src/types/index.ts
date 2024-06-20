import { LazyExoticComponent } from 'react';
import { USER_STATUSES } from 'utils/contants';
export type Loading = 'idle' | 'pending' | 'succeeded' | 'failed';

export interface DynamicObject<T> {
  [key: string]: T;
}

export interface AppRouteType {
  name: string;
  path: string;
  auth?: boolean;
  component: LazyExoticComponent<() => JSX.Element | null>;
  roles?: number;
  isPublic?: boolean;
  showMenu?: boolean;
  showHeader?: boolean;
  sidebar?: 'workspace-settings' | 'project-settings';
  children?: any;
  parentPath?: string;
}

export type PaginationData<M> = { count: number; rows: M[] };

export type QueryParams = {
  search?: string;
  page?: string | number;
  limit?: string | number | 'unlimited';
  include?: string;
  orderBy?: string;
} & { [key: string]: any };

export type UserStatus = (typeof USER_STATUSES)[keyof typeof USER_STATUSES];

export type UomTypes = 'CURRENCY' | 'MANPOWER_UNITS' | 'MEASUREMENT' | 'MEASURING_SYSTEM' | 'WORKING_DAY'

export type ModalState = boolean | null;