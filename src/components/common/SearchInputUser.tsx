import React, { useState, useEffect, useMemo } from 'react';
import { Select, message } from 'antd';
import { t } from 'i18next';
import { User } from 'model';
import { issueService } from 'services';
import { STATUS_CODES } from 'http';
import { ISSUE_STATUSES } from 'utils/contants';
const { Option } = Select;

type SearchInputProps = {
  users: User[];
  dynamicClassName?: string;
  refreshUser: () => void;
  refreshIssues: () => void;
  workspaceId: string;
  projectId: string;
  issueId: string;
  companyId?: string;
  assigneeName?: string;
  value?: string;
  reporterId: string;
  profileId: string | undefined;
  assigneeId: string;
  status: string;
};
const SearchInputUser: React.FC<SearchInputProps> = (props) => {
  const {
    users,
    dynamicClassName,
    workspaceId,
    projectId,
    issueId,
    companyId,
    refreshUser,
    assigneeName,
    refreshIssues,
    reporterId,
    profileId,
    assigneeId,
    status,
  } = props;
  const isDisabledAssignee =
    profileId === reporterId
      ? status === ISSUE_STATUSES.CLOSED
      : profileId === assigneeId
      ? status === ISSUE_STATUSES.OPEN ||
        status === ISSUE_STATUSES.READY_FOR_INSPECTION ||
        status === ISSUE_STATUSES.CLOSED 
      : false;
  const [value, setValue] = useState<string | undefined>(assigneeName);

  const [inputValue, setInputValue] = useState<any>();
  const options = useMemo(() => {
    return companyId
      ? users?.filter((user) => user?.WorkspaceUser?.Company?.id === companyId)
      : users;
  }, [users, companyId]);

  useEffect(() => {
    setValue(assigneeName);
  }, [assigneeName]);

  const handleChange = async (assigneeId: string) => {
    try {
      const companyId = options.find((user) => user.id === assigneeId)
        ?.WorkspaceUser?.Company?.id;
      const submitData = {
        isSaveAsDraft: true,
        assigneeId: assigneeId,
        companyId,
      };
      await issueService.updateIssue(
        workspaceId,
        projectId,
        issueId,
        submitData
      );
      refreshUser();
      refreshIssues();
    } catch (error) {
      console.log(error);
      message.error(t('Oop! Something wrong'));
    }
  };

  const getNameInitials = (name: string): String => {
    const words = name.trim().split(' ');

    if (words?.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    } else {
      return (
        words[0].substring(0, 1).toUpperCase() +
        words[1].substring(0, 1).toUpperCase()
      );
    }
  };

  return (
    <Select
      disabled={isDisabledAssignee}
      showSearch
      value={value || assigneeName}
      placeholder={t('Assign')}
      // style={props.style}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      optionFilterProp='children'
      filterOption={false}
      onSearch={(e) => setInputValue(e)}
      onChange={handleChange}
      notFoundContent={null}
      optionLabelProp='label'
      // defaultOpen={true}
      className={dynamicClassName}
      popupMatchSelectWidth={false}
    >
      {(options || [])
        ?.filter(
          (o) =>
            (!inputValue ||
              o?.fullName?.toString().toLowerCase().includes(inputValue)) &&
            o.id !== reporterId
        )
        .map((d) => (
          <Option key={d.id} value={d.id} label={d.fullName}>
            <div key={d.id} className='search-input-user'>
              {/* <img src={d.avatar} alt='' width={24} height={24} /> */}
              <span className='circle-fill'>
                {getNameInitials(d.fullName ? d.fullName : '')}
              </span>
              <div className='ml-1'>
                <div className='ttl'>{d.fullName}</div>
                <div className='desc'>{d?.WorkspaceUser?.Company?.name}</div>
              </div>
            </div>
          </Option>
        ))}
    </Select>
  );
};

export default SearchInputUser;
