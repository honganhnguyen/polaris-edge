import CompanyCategory from './CompanyCategory';
import ProjectCompany from './ProjectCompany';
import User from './User';

export default interface Company {
  workspaceId?: string;
  id: string;
  name: string;
  code?: string;
  companyCode?: string;
  picture?: string;
  role?: string;
  category?: {
    key: string;
    name: string;
    code: string;
  };
  CompanyCategory?: CompanyCategory;
  representative?: User;
  number_of_projects?: number;
  number_of_members?: number;
  icon?: any;
  iconColor?: string;
  logo?: string | null;
  companyCategoryId?: String;
  city?: any;
  countryId?: any;
  contactName?: any;
  contactEmail?: any;
  contactPhone?: any;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: any;
  ProjectCompanies?: ProjectCompany[];
}
