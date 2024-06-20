export const MOTION_VARIANTS = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  out: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.4,
    },
  },
};

export const ROLES = {
  WORKSPACE_GUEST: 'WORKSPACE_GUEST',
  WORKSPACE_OWNER: 'WORKSPACE_OWNER',
  PROJECT_GUEST: 'PROJECT_GUEST',
  PROJECT_OWNER: 'PROJECT_OWNER',
};

export const ROLE_TYPES = {
  PROJECT: 'project',
  WORKSPACE: 'workspace',
};

export const USER_STATUSES = {
  PENDING: 'pending',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;

export const TASK_PRIORITY : any = {
  LOWEST: {
    code: 'LOWEST',
    name: 'lowest',
    image:
      'https://polaris-edge.atlassian.net/images/icons/priorities/lowest.svg',
  },
  LOW: {
    code: 'LOW',
    name: 'low',
    image: 'https://polaris-edge.atlassian.net/images/icons/priorities/low.svg',
  },
  MEDIUM: {
    code: 'MEDIUM',
    name: 'medium',
    image:
      'https://polaris-edge.atlassian.net/images/icons/priorities/medium.svg',
  },
  HIGH: {
    code: 'HIGH',
    name: 'high',
    image:
      'https://polaris-edge.atlassian.net/images/icons/priorities/high.svg',
  },
  HIGHEST: {
    code: 'HIGHEST',
    name: 'highest',
    image:
      'https://polaris-edge.atlassian.net/images/icons/priorities/highest.svg',
  },
};

export const TASK_STATUS_COLOR : any = {
  DR: '',
  OP: 'orange',
  OO: 'red',
  RFI: 'blue',
  RIO: 'purple',
  CL: 'green',
};

export const TASK_STATUS_HEADER_COLOR : any = {
  DR: '#7e868b',
  OP: '#FFD591',
  OO: '#FFA39E',
  RFI: '#91CAFF',
  RIO: '#D3ADF7',
  CL: '#52C41A',
};

export const TASK_ATTACHMENT_TYPE : any = {
  IP: 'IP',
  LP: 'LP',
}

export const PROJECT_DEFAULT_IMAGE =
  'https://polaris-edge-dev-public.s3-ap-southeast-1.amazonaws.com/polaris/2024/01/30/demo.jpeg';

export const ATTACHMENT_TYPES = {
  LOCATION_PLAN: 'LP',
  INSPECTION_PHOTO: 'IP',
};

export const ISSUE_STATUSES = {
  OPEN: 'OP',
  DRAFT: 'DR',
  CLOSED: 'CL',
  READY_FOR_INSPECTION: 'RFI',
  READY_FOR_INSPECTION_OVERDUE: 'RIO',
  OPEN_OVERDUE: 'OO',
};

export const ISSUE_PRIORITIES = {
  HIGHEST: 'HIGHEST',
  HIGHT: 'HIGHT',
  LOWEST: 'LOWEST',
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
};

export const DEFAULT_COMPANY_CATEGORIES = [
  {
    name: 'General Contractor',
    code: 'GC',
    isCustom: false,
  },
  {
    name: 'MEP contractor',
    code: 'MC',
    isCustom: false,
  },
  {
    name: 'Design & build Contractor',
    code: 'DBC',
    isCustom: false,
  },
];