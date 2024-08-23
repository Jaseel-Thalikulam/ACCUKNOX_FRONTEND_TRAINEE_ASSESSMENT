import {
  ClockCircleFilled,
  DownOutlined,
  MoreOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { MenuItemType } from "antd/es/menu/interface";
import { useState } from "react";

function DashboardMenuBar({
  onAddWidthClick,
}: {
  onAddWidthClick: () => void;
}) {
  const [selectedMenu, setSelectedMenu] = useState("Last 2 days");
  const items: MenuProps["items"] = [
    {
      label: "Last 2 days",
      key: "1",
    },
    {
      label: "Last week",
      key: "2",
    },
    {
      label: "Last month",
      key: "3",
    },
    {
      label: "Last Year",
      key: "4",
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const selectedItem = items.find((item) => item?.key === e.key);
    if (selectedItem) {
      setSelectedMenu((selectedItem as MenuItemType).label as string);
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div className="dashboard--menu--container">
      <div className="dashboard--title--container">
        <h3 className="dashboard--title">CNAPP Dashboard</h3>
      </div>
      <div className="dashboard--buttons--group">
        <Button onClick={onAddWidthClick}>Add Width +</Button>
        <Button>
          <ReloadOutlined />
        </Button>
        <Button>
          <MoreOutlined />
        </Button>
        <div>
          <Dropdown.Button
            menu={menuProps}
            placement="bottom"
            icon={<DownOutlined />}
            className="dark-bright-blue-text"
          >
            <ClockCircleFilled />
            {selectedMenu}
          </Dropdown.Button>
        </div>
      </div>
    </div>
  );
}

export default DashboardMenuBar;
