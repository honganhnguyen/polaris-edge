import { Task } from '../model';
import { ToolOutlined, SketchOutlined } from '@ant-design/icons';
import image from "./../assets/images/plan.png";
import plan3 from "./../assets/images/plan3.png";
import plan4 from "./../assets/images/plan4.png";
import drawing from "./../assets/images/image.png";

const inspectionTask: Task[] = [
  {
    id: '#1234',
    name: 'Testing cooling system for leaks',
    type: 'Quality observation',
    zoning: 'Loading dock',
    company: {
      id: '1',
      name: 'Skyscraper',
      code: 'MYW',
      icon: ToolOutlined,
      iconColor: '#237804',
    },
    user: {
      id: '1',
      firstName: 'John',
      username: 'John Doe',
      icon: ToolOutlined,
      iconColor: '#237804',
    },
    priority: {
      id: '1',
      image: 'https://polaris-edge.atlassian.net/images/icons/priorities/highest.svg',
      name: 'Priority 1'
    },
    status: {
      id: '1',
      name: 'Open',
      code: 'open',
    },
    plan: {
      id: '1',
      image: plan3,
      name: 'Electrical layout',
      subname: 'Electrical high voltage',
      spin: 6
    },
    image: plan3,
    drawing: drawing,
    icon: SketchOutlined,
    iconColor: '#A8071A',
  },
  {
    id: '#2589',
    name: 'Final inspection before handover',
    type: 'Punch',
    zoning: 'Basement',
    company: {
      id: '1',
      name: 'Skyscraper',
      code: 'MYW',
      icon: ToolOutlined,
      iconColor: '#237804',
    },
    user: {
      id: '1',
      firstName: 'John',
      username: 'John Doe',
      icon: ToolOutlined,
      iconColor: '#237804',
    },
    priority: {
      id: '3',
      image: 'https://polaris-edge.atlassian.net/images/icons/priorities/medium.svg',
      name: 'Priority 2'
    },
    status: {
      id: '1',
      name: 'Ready for inspection',
      code: 'ready',
    },
    plan: {
      id: '1',
      image: plan4,
      name: 'Electrical layout',
      subname: 'Electrical high voltage',
      spin: 6
    },
    image: plan4,
    drawing: drawing,
    icon: SketchOutlined,
    iconColor: '#A8071A',
  },
  {
    id: '#1234',
    name: 'Testing cooling system for leaks',
    type: 'Quality observation',
    zoning: 'Loading dock',
    company: {
      id: '1',
      name: 'Skyscraper',
      code: 'MYW',
      icon: ToolOutlined,
      iconColor: '#237804',
    },
    user: {
      id: '1',
      firstName: 'John',
      username: 'John Doe',
      icon: ToolOutlined,
      iconColor: '#237804',
    },
    priority: {
      id: '1',
      code: 'HIGHEST',
      image: 'https://polaris-edge.atlassian.net/images/icons/priorities/highest.svg',
      name: 'Priority 1'
    },
    status: {
      id: '1',
      name: 'Open',
      code: 'open',
    },
    plan: {
      id: '1',
      image: image,
      name: 'Electrical layout',
      subname: 'Electrical high voltage',
      spin: 6
    },
    image: image,
    drawing: drawing,
    icon: SketchOutlined,
    iconColor: '#A8071A',
  },
];

export default inspectionTask;
