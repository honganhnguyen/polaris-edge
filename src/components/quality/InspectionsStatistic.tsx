import { CSSProperties } from 'react';
import {
  Typography,
  Flex,
  Tag,
  Statistic,
  Card,
  Collapse,
  CollapseProps,
  theme,
} from 'antd';
import {
  CaretUpOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

type InspectionsStatisticProps = {
  kpiData: {
    draft: number;
    open: number;
    closed: number;
    readyForInspection: number;
    readyForInspectionOverdue: number;
    openOverdue: number;
  };
};

export default function InspectionsStatistic(props: InspectionsStatisticProps) {
  const { kpiData } = props;
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
    {
      key: '1',
      children: (
        <Flex className="mb-3 " wrap="wrap" gap="large">
          <Card bordered={false} className='inspection-card'>
            <Statistic title={<Tag>{t('Draft')}</Tag>} value={kpiData?.draft} />
            {/* <Typography.Text className="mt-2 mb-1 task-up"><ArrowUpOutlined /> 12 new (+12%)</Typography.Text> */}
          </Card>

          <Card bordered={false} className='inspection-card open'>
            <Statistic title={<Tag>{t('Open')}</Tag>} value={kpiData?.open} />
            {/* <Typography.Text className="mt-2 mb-1 task-up"><ArrowUpOutlined /> 12 new (+12%)</Typography.Text> */}
          </Card>

          <Card bordered={false} className='inspection-card overdue'>
            <Statistic title={<Tag>{t('Open overdue')}</Tag>} value={kpiData?.openOverdue} />
            {/* <Typography.Text className="mt-2 mb-1 task-nochange"> = No change</Typography.Text> */}
          </Card>

          <Card bordered={false} className='inspection-card inspection'>
            <Statistic title={<Tag>{t('Ready for review')}</Tag>} value={kpiData?.readyForInspection} />
            {/* <Typography.Text className="mt-2 mb-1 task-less"><ArrowDownOutlined /> 12 less (+12%)</Typography.Text> */}
          </Card>

          <Card bordered={false} className='inspection-card inspection-overdue'>
            <Statistic title={<Tag>{t('Ready for inspection overdue')}</Tag>} value={kpiData?.readyForInspectionOverdue} />
            {/* <Typography.Text className="mt-2 mb-1 task-nochange"> = No change</Typography.Text> */}
          </Card>

          <Card bordered={false} className='inspection-card closed'>
            <Statistic
              title={<Tag>{t('Closed')}</Tag>}
              value={kpiData?.closed}
            />
            {/* <Typography.Text className="mt-2 mb-1 task-less"><ArrowUpOutlined /> 12 new (+12%)</Typography.Text> */}
          </Card>
        </Flex>
      ),
      style: panelStyle,
    },
  ];

  return (
    <Collapse
      className="inspection-collapse"
      ghost
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <CaretUpOutlined rotate={isActive ? 0 : 180} width={20} style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: '20px' }} />}
      expandIconPosition="end"
      style={{ background: 'transparent' }}
      items={getItems(panelStyle)}
    />
  );
}
