import {
  AttachmentType,
  Country,
  DateFormat,
  IssueDiscipline,
  IssuePriority,
  IssueStatus,
  IssueType,
  Language,
  TimeZone,
  Uom,
} from 'model';
import request from 'requesters/core.request';
import { PaginationData } from 'types';

const commonService = {
  getCountries: async (query: any) => {
    return request.get<PaginationData<Country>>(`/countries`, {
      params: query,
    });
  },
  getLanguages: async (query: any) => {
    return request.get<Language[]>('/languages', {
      params: query,
    });
  },
  getDateFormat: async (query: any) => {
    return request.get<DateFormat[]>('/date-formats?orderBy=order,asc', {
      params: query,
    });
  },
  getUoms: async (query: any) => {
    return request.get<Uom[]>('/uoms', {
      params: query,
    });
  },
  getTimeZones: async (query: any) => {
    return request.get<TimeZone[]>('/timezones', {
      params: query,
    });
  },
  getIssueStatuses: async (query: any) => {
    return request.get<PaginationData<IssueStatus>>(`/issue-statuses`, {
      params: query,
    });
  },
  getIssuePriorities: async (query: any) => {
    return request.get<PaginationData<IssuePriority>>(`/issue-priorities`, {
      params: query,
    });
  },
  getIssueTypes: async (query: any) => {
    return request.get<PaginationData<IssueType>>(`/issue-types`, {
      params: query,
    });
  },
  getIssueDisciplines: async (query: any) => {
    return request.get<PaginationData<IssueDiscipline>>(`/issue-disciplines`, {
      params: query,
    });
  },
  getAttachmentTypes: async (query: any) => {
    return request.get<PaginationData<AttachmentType>>(`/attachment-types`, {
      params: query,
    });
  },
};

export default commonService;
