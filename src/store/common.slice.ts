import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { QueryParams } from 'types';
import { commonService } from 'services';
import {
  Country,
  DateFormat,
  Language,
  TimeZone,
  Uom,
  IssueStatus,
  IssueDiscipline,
  IssuePriority,
  IssueType,
  AttachmentType,
} from 'model';
interface CommonState {
  countries: Country[];
  dateFormats: DateFormat[];
  languages: Language[];
  timeZones: TimeZone[];
  uoms: Uom[];
  issueStatuses: IssueStatus[];
  issuePriorities: IssuePriority[];
  issueTypes: IssueType[];
  issueDisciplines: IssueDiscipline[];
  attachmentTypes: AttachmentType[];
}

const name = 'common';
const initialState: CommonState = {
  countries: [],
  dateFormats: [],
  languages: [],
  timeZones: [],
  uoms: [],
  issueStatuses: [],
  issuePriorities: [],
  issueTypes: [],
  issueDisciplines: [],
  attachmentTypes: [],
};

export const fetchCountries = createAsyncThunk(
  `${name}/list-of-countries`,
  async (query: QueryParams, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      if (state.common?.countries.length) {
        return state.common.countries;
      }
      const { rows } = await commonService.getCountries(query);
      return rows;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const fetchDateFormats = createAsyncThunk(
  `${name}/list-of-dateFormats`,
  async (query: QueryParams, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      if (state.common?.dateFormats.length) {
        return state.common.dateFormats;
      }
      const response = await commonService.getDateFormat(query);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const fetchLanguages = createAsyncThunk(
  `${name}/list-of-languages`,
  async (query: QueryParams, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      if (state.common?.languages.length) {
        return state.common.languages;
      }
      const response = await commonService.getLanguages(query);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const fetchIssueStatuses = createAsyncThunk(
  `${name}/list-of-issue-statuses`,
  async (query: QueryParams, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      if (state.common?.issueStatuses.length) {
        return state.common.issueStatuses;
      }
      const { rows } = await commonService.getIssueStatuses(query);
      return rows;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const fetchIssueTypes = createAsyncThunk(
  `${name}/list-of-issue-types`,
  async (query: QueryParams, { rejectWithValue }) => {
    try {
      const { rows } = await commonService.getIssueTypes(query);
      return rows;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const fetchIssuePriorities = createAsyncThunk(
  `${name}/list-of-issue-priorities`,
  async (query: QueryParams, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      if (state.common?.issuePriorities.length) {
        return state.common.issuePriorities;
      }
      const { rows } = await commonService.getIssuePriorities(query);
      return rows;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const fetchIssueDisciplines = createAsyncThunk(
  `${name}/list-of-issue-disciplines`,
  async (query: QueryParams, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      if (state.common?.issueDisciplines.length) {
        return state.common.issueDisciplines;
      }
      const { rows } = await commonService.getIssueDisciplines(query);
      return rows;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const fetchAttachmentTypes = createAsyncThunk(
  `${name}/list-of-attachment-types`,
  async (query: QueryParams, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      if (state.common?.attachmentTypes.length) {
        return state.common.attachmentTypes;
      }
      const { rows } = await commonService.getAttachmentTypes(query);
      return rows;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const fetchTimeZones = createAsyncThunk(
  `${name}/list-of-timezones`,
  async (query: QueryParams, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      if (state.common?.timeZones.length) {
        return state.common.timeZones;
      }
      const response = await commonService.getTimeZones(query);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const fetchUoms = createAsyncThunk(
  `${name}/list-of-uoms`,
  async (query: QueryParams, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      if (state.common?.uoms.length) {
        return state.common.uoms;
      }
      const response = await commonService.getUoms(query);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const commonSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.countries = action.payload;
    });
    builder.addCase(fetchDateFormats.fulfilled, (state, action) => {
      state.dateFormats = action.payload;
    });
    builder.addCase(fetchLanguages.fulfilled, (state, action) => {
      state.languages = action.payload;
    });
    builder.addCase(fetchTimeZones.fulfilled, (state, action) => {
      state.timeZones = action.payload;
    });
    builder.addCase(fetchUoms.fulfilled, (state, action) => {
      state.uoms = action.payload;
    });
    builder.addCase(fetchIssueStatuses.fulfilled, (state, action) => {
      state.issueStatuses = action.payload;
    });
    builder.addCase(fetchIssueTypes.fulfilled, (state, action) => {
      state.issueTypes = action.payload;
    });
    builder.addCase(fetchIssuePriorities.fulfilled, (state, action) => {
      state.issuePriorities = action.payload;
    });
    builder.addCase(fetchIssueDisciplines.fulfilled, (state, action) => {
      state.issueDisciplines = action.payload;
    });
    builder.addCase(fetchAttachmentTypes.fulfilled, (state, action) => {
      state.attachmentTypes = action.payload;
    });
  },
});

export const selectCountries = (state: RootState) => state.common.countries;
export const selectDateFormats = (state: RootState) => state.common.dateFormats;
export const selectLanguages = (state: RootState) => state.common.languages;
export const selectTimeZones = (state: RootState) => state.common.timeZones;
export const selectUoms = (state: RootState) => state.common.uoms;
export const selectIssueStatuses = (state: RootState) => state.common.issueStatuses;
export const selectIssueTypes = (state: RootState) => state.common.issueTypes;
export const selectIssuePriorities = (state: RootState) => state.common.issuePriorities;
export const selectIssueDisciplines = (state: RootState) => state.common.issueDisciplines;
export const selectAttachmentTypes = (state: RootState) => state.common.attachmentTypes;

export default commonSlice.reducer;
