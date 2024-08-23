import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Tabs } from 'antd';
import DoughnutChartCard from './DoughnutChartCard';
import { useSelector } from 'react-redux';
import { rootState } from '../redux/store';

interface AddCardFormDrawerProps {
  onClose: () => void;
  isOpen: boolean;
  onAddCardClick:()=>void
}

function AddCategoryDrawer({
  onClose,
  isOpen,
  onAddCardClick,
}: AddCardFormDrawerProps) {
  const dashData = useSelector((state: rootState) => state.dashboard.dashData);

  return (
    <Drawer
      size="large"
      title="Add Widget"
      placement="right"
      onClose={onClose}
      open={isOpen}
    >
      <Tabs
        tabBarExtraContent={
          <Button onClick={onAddCardClick} icon={<PlusOutlined />}>
            Add Card
          </Button>
        }
        defaultActiveKey="1"
        items={dashData.map((data, index) => ({
          key: String(index + 1),
          label: data.categoryName,
          children: (
            <>
              {data.cardData.map((card, cardIndex) => (
                <DoughnutChartCard
                  key={cardIndex}
                  cardData={card}
                  isDrawer={true}
                  cardIndex={cardIndex}
                  categoryIndex={index}
                />
              ))}
            </>
          ),
        }))}
      />
    </Drawer>
  );
}

export default AddCategoryDrawer