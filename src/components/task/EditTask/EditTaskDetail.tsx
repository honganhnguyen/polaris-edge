import { useState } from "react";
import {
  Col,
  DatePicker,
  Divider,
  Form,
  Row,
  Select,
  SelectProps,
  Space,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import SelectOption from "components/common/SelectOption";
import CustomButtonEdit from "components/task/EditTask/ButtonEdit";

import userData from 'mock-data/user-data';

export default function TaskDetail() {
  const { t } = useTranslation();
  const [valueDescription, setValueDescription] = useState(
    "The cooling system needs to be checked for leaks. Thanks for completing asap and notifying me"
  );
  const defaultCreatedBy = "js";
  const defaultType = "qo";
  const defaultDiscipline = "cv";
  const defaultPriority = "p1";
  const defaultZoning = "b";
  const defaultCompany = "s";
  const defaultAssignee = "jd";
  const defaultWatcher = "ms";
  const defaultCreateDate = dayjs("2024-01-15T08:59");
  const defaultValueDeadline = dayjs("2024-01-15");
  const [valueCreatedBy, setValueCreatedBy] = useState<string | undefined>(
    undefined
  );
  const [valueType, setValueType] = useState<string | undefined>(undefined);
  const [valueDiscipline, setValueDiscipline] = useState<string | undefined>(
    undefined
  );
  const [valuePriority, setValuePriority] = useState<string | undefined>(
    undefined
  );
  const [valueZoning, setValueZoning] = useState<string | undefined>(undefined);
  const [valueCompany, setValueCompany] = useState<string | undefined>(
    undefined
  );
  const [valueAssignee, setValueAssignee] = useState<string | undefined>(
    undefined
  );
  const [valueWatcher, setValueWatcher] = useState<string | undefined>(
    undefined
  );

  const createByOptions = [
    { value: "js", label: "Jack Smith" },
    { value: "jd", label: "John Doe" },
  ];

  const typeOptions = [
    { value: "qo", label: "Quality observation" },
    { value: "punch", label: "Punch" },
  ];

  const disciplineOptions = [{ value: "cv", label: "Civil (CV)" }];

  const priorityOptions = [
    { value: "p1", label: "Priority 1 - immediate action" },
  ];

  const zoningOptions = [
    { value: "b", label: "Basement" },
    { value: "l", label: "Loading dock" },
  ];

  const options: SelectProps['options'] = [
    {
      label: t('Highest'),
      value: 'highest',
      image:
        'https://polaris-edge.atlassian.net/images/icons/priorities/highest.svg',
    },
    {
      label: t('High'),
      value: 'high',
      image:
        'https://polaris-edge.atlassian.net/images/icons/priorities/high.svg',
    },
    {
      label: t('Medium'),
      value: 'medium',
      image:
        'https://polaris-edge.atlassian.net/images/icons/priorities/medium.svg',
    },
    {
      label: t('Low'),
      value: 'low',
      image:
        'https://polaris-edge.atlassian.net/images/icons/priorities/low.svg',
    },
    {
      label: t('Lowest'),
      value: 'lowest',
      image:
        'https://polaris-edge.atlassian.net/images/icons/priorities/lowest.svg',
    },
  ];

  const companyOptions = [{ value: "s", label: "Skyscraper" }];

  const assigneeOptions = [{ value: "jd", label: "John Do" }];

  const watcherOptions = [{ value: "ms", label: "Mary Smith" }];

  const handleChange = () => {}

  return (
    <Form layout="vertical" hideRequiredMark={false}>
      <Row>
        <Col span={24}>
          <Form.Item
            name="description"
            label={t("Description") + ' :'}
            rules={[
              {
                required: false,
                message: t('Please enter url description')
              },
            ]}
          >
            <TextArea
              defaultValue={valueDescription}
              value={valueDescription}
              onChange={(e) => setValueDescription(e.target.value)}
              placeholder=""
              autoSize={{ minRows: 1, maxRows: 6 }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="type"
            label={t("Task type") + ' :'}
            rules={[{ required: true, message: "" }]}
          >
            <SelectOption
              value={defaultType}
              defaultValue="qo"
              onChange={(valueType) => setValueType(valueType)}
              placeholder={""}
              disabled={false}
              options={typeOptions}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="discipline"
            label={t("Task Discipline") + ' :'}
            rules={[{ required: true, message: "" }]}
          >
            <SelectOption
              value={defaultDiscipline}
              defaultValue=""
              onChange={(valueCreatedBy) => setValueCreatedBy(valueCreatedBy)}
              placeholder={""}
              disabled={false}
              options={disciplineOptions}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="priority"
            label={t("Priority") + ' :'}
            rules={[{ required: false, message: "" }]}
          >
            <Select
              style={{ width: '100%' }}
              placeholder=""
              defaultValue={t('Highest')}            
              onChange={handleChange}
              optionLabelProp="label"
              options={options}
              optionRender={(option) => (
                <Space>
                  <span role="img" aria-label={option.data.label}>
                    <img src={option.data.image} alt='' width={16} height={16} className='mr-2' />
                    {option.data.label}
                  </span>
                </Space>
              )}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="deadline"
            label={t("Deadline") + ' :'}
            rules={[{ required: false, message: "" }]}
          >
            <DatePicker
              disabled={false}
              style={{ width: "100%" }}
              defaultValue={defaultValueDeadline}
              format="YYYY-MM-DD"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="zoning"
            label={t("Zoning") + ' :'}
            rules={[{ required: true, message: "" }]}
          >
            <SelectOption
              value={defaultZoning}
              defaultValue="b"
              onChange={(valueZoning) => setValueZoning(valueZoning)}
              placeholder={""}
              disabled={false}
              options={zoningOptions}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="company"
            label={t("Company assignee") + ' :'}
            rules={[{ required: false, message: "" }]}
          >
            <SelectOption
              value={defaultCompany}
              defaultValue="s"
              onChange={(valueCompany) => setValueCompany(valueCompany)}
              placeholder={""}
              disabled={false}
              options={companyOptions}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="assignee"
            label={t("Assignee") + ' :'}
            rules={[{ required: false, message: "" }]}
          >
            <SelectOption
              value={defaultAssignee}
              defaultValue="jd"
              onChange={(valueAssignee) => setValueAssignee(valueAssignee)}
              placeholder={""}
              disabled={false}
              options={assigneeOptions}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="watcher"
            label={t("Watcher(s)") + ' :'}
            rules={[{ required: false, message: "" }]}
          >
            <Select
            showSearch
            mode='multiple'
            allowClear
            style={{ width: '100%' }}
            maxTagCount='responsive'
            placeholder={t('Add watcher(s)')}
            defaultValue={[userData[0].id, userData[1].id]}
            onChange={handleChange}
            options={userData?.map((option) => ({
              value: option.id,
              label: option.email,
            }))}
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
          />
          </Form.Item>
        </Col>
      </Row>
      <Typography.Text type="secondary" className="text-muted mt-16">
        {`${t('Task created by')} John Smith ${t('on')} 2024-01-15 @ 08:15`}
      </Typography.Text>
      <Divider className="customize-divider mt-4" />
      <CustomButtonEdit
        onDraftClick={() => {
        }}
        onPublishClick={() => {
        }}
      />
    </Form>
  );
}
