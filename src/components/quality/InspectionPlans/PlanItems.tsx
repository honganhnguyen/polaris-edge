import { useState } from "react";
import {
  EllipsisOutlined,
  PushpinFilled,
} from "@ant-design/icons";
import {
  Card,
  Col,
  Dropdown,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import { motion } from "framer-motion";
import { Attachment, Plan } from 'model';
import EditInspectionPlan from "./EditInspectionPlan";

const { Text } = Typography;
interface PlanItemProps {
  isHidePin?: boolean;
  planOptionsDropdown?: any;
  plan?: Plan;
  attachment?: Attachment;
  isActive?: boolean;
  size?: 'sm' | 'lg'
}

const PlanItem: React.FC<PlanItemProps> = ({ isHidePin, planOptionsDropdown, attachment, plan, isActive, size='lg' }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);

  const onSubmitEdit = () => {
    setIsEditOpen(false);
    setEditTaskId(null);
  };

  return (
    <motion.div whileHover={{ scale: 1.005, transition: { duration: 0.35 } }}>
      <EditInspectionPlan
        isOpen={isEditOpen}
        setOpen={setIsEditOpen}
        onSubmit={onSubmitEdit}
        editInspectionId={editTaskId}
      />
      <Card
        hoverable
        className={`location-item size-${size} ${isActive ? 'active' : ''}`}
        cover={
          <motion.img
            alt=''
            src={attachment?.filePath ?? plan?.image}
            className='px-3 py-3 plan-img'
          />
        }>
        {!isHidePin &&
          <div className='project-star'>
            <Space size={[0, 8]} wrap className='plan-spin'>
              <Tag icon={<PushpinFilled />} color='#3069C4'>
                {6}
              </Tag>
            </Space>
          </div>
        }
        <Row className='project-card-footer'>
          <Col flex={13} className='project-info'>
            <div className='title'>{attachment?.name ?? plan?.name}</div>
            <Text type='secondary'>{plan?.subname}</Text>
          </Col>
          {planOptionsDropdown &&
            <Col flex={2} className='project-actions'>
              <Dropdown menu={planOptionsDropdown} trigger={['click']}>
                <EllipsisOutlined
                  style={{
                    paddingTop: 14,
                    paddingBottom: 14,
                    color: 'rgba(0,0,0,0.45)',
                  }}
                />
              </Dropdown>
            </Col>
          }
        </Row>
      </Card>
    </motion.div>
  );
};

export default PlanItem;
