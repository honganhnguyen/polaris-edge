import {
  Menu,
  MenuProps,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[] | null,
  disabled?: boolean,
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    disabled,
  } as MenuItem;
}
export default function MenuInspections() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = useParams();
  const lastSegment = location.pathname.substring(
    location.pathname.lastIndexOf('/') + 1
  );

  const itemsProject: MenuProps['items'] = [
    getItem(t('Zoning'), 'zoning'),
    getItem(t('Inspections'), 'inspections'),
    getItem(t('Analytics'), 'analytics'),

  ];
  const onClick: MenuProps['onClick'] = (e) => {
    const path = e.key === 'quality' ? `/project-settings/${projectId}/quality` : `/project-settings/${projectId}/quality/${e.key}`;
    navigate(path);
  };

  return (
    <Menu
      className="inspection-menu"
      onClick={onClick}
      defaultSelectedKeys={[lastSegment]}
      mode='horizontal'
      items={itemsProject}
    />
  );
}
