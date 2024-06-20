import { useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Row,
  Select,
  SelectProps,
  Space,
} from "antd";
import { useTranslation } from "react-i18next";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import SelectOption from "components/common/SelectOption";
import image from '../../../assets/images/plan2.png';
import close from '../../../assets/images/icons/close-circle-filled.png';

import userData from 'mock-data/user-data';
import { WarningOutlined } from "@ant-design/icons";

export default function InspectionDetail() {
  const { t } = useTranslation();
  const [valueDescription, setValueDescription] = useState(
    "Enter the inspection description"
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
    { value: "p", label: "Parking" },
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

  const onSaveClick = () => {}

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
                required: true,
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
            label={t("Inspection type") + ' :'}
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
            label={t("Inspection discipline") + ' :'}
            rules={[{ required: true, message: "" }]}
          >
            <SelectOption
              value={defaultDiscipline}
              defaultValue={t('Select')}
              onChange={(valueCreatedBy) => setValueCreatedBy(valueCreatedBy)}
              placeholder={t('Select')}
              disabled={false}
              options={disciplineOptions}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="priority"
            label={t("Priority") + ' :'}
            rules={[{ required: true, message: "" }]}
          >
            <Select
              style={{ width: '100%' }}
              placeholder="Select priority"
              defaultValue={t('Select priority')}            
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
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="observation"
            label={t("Inspection date") + ' :'}
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
        <Col span={12}>
          <Form.Item
            name="effective"
            label={t("Start date") + ' :'}
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
        <Col span={12}>
          <Form.Item
            name="enddate"
            label={t("End date") + ' :'}
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
        <Col span={12}>
          <Form.Item
            name="company"
            label={t("Company assignee") + ' :'}
            rules={[{ required: true, message: "" }]}
          >
            <SelectOption
              value={defaultCompany}
              defaultValue={t('Select')}
              onChange={(valueCompany) => setValueCompany(valueCompany)}
              placeholder={t('Select')}
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
              defaultValue={t('Select')}
              onChange={(valueAssignee) => setValueAssignee(valueAssignee)}
              placeholder={t('Select')}
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

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="zoning"
            label={t("Zoning") + ' :'}
            rules={[{ required: true, message: "" }]}
          >
            <SelectOption
              value={defaultZoning}
              defaultValue="p"
              onChange={(valueZoning) => setValueZoning(valueZoning)}
              placeholder={""}
              disabled={false}
              options={zoningOptions}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16} className="inspection-picture mx-0">
        <Col span={24}>
          <img src={image} alt="" />
          <img src={close} alt="" className="btn-close"/>
        </Col>
      </Row>

      <Divider className="customize-divider mt-4" />

      <Row gutter={16} justify="space-between" align="middle">
      <Col span={12}>
        <Button danger type="primary" icon={<WarningOutlined />}>
          {t("Delete inspection")}
        </Button>
      </Col>
      <Col span={12} style={{ textAlign: 'right'}}>
        <Button type="primary" onClick={onSaveClick}>
          {t("Save")}
        </Button>
      </Col>
    </Row>
  </Form>
  );
}
