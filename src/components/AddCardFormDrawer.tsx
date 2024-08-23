import { PlusOutlined } from '@ant-design/icons';
import { AutoComplete, Button, ColorPicker, Drawer, Form, Input, Space, Tooltip } from 'antd';
import { useState } from 'react'
import { setNewCard } from '../redux/dashboardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../redux/store';

interface AddCardFormDrawerProps {
  onClose: () => void;
  isOpen: boolean;
}

function AddCardFormDrawer({ onClose, isOpen }: AddCardFormDrawerProps) {
  const [labels, setLabels] = useState([{ name: "", color: "" }]);
  const dispatch = useDispatch();
  const dashData = useSelector((state: rootState) => state.dashboard.dashData);
  const [form] = Form.useForm();
  const handleAddLabel = () => {
    setLabels([...labels, { name: "", color: "" }]);
  };

  const handleSubmit = (values: {
    categoryName: string;
    cardTitle: string;
  }) => {
      const { categoryName, cardTitle } = values;
      dispatch(setNewCard({ categoryName, cardTitle, labels }));
      onClose();
  };

  const handleChangeLabel = (
    index: number,
    key: "color" | "name",
    value: string
  ) => {
    if (key === "color" && value) {
      const updatedLabels = [...labels];
      updatedLabels[index][key] = `#${value}`;

      setLabels(updatedLabels);
    } else {
      const updatedLabels = [...labels];
      updatedLabels[index][key] = value;
      setLabels(updatedLabels);
    }
  };

  return (
    <Drawer
      size="large"
      title="Add Card"
      placement="right"
      onClose={onClose}
      open={isOpen}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{ labels }}
      >
        <Form.Item
          name="categoryName"
          label="Category Name"
          rules={[
            { required: true, message: "Please input the category name!" },
          ]}
        >
          <AutoComplete
            style={{ marginBottom: 0 }}
            options={dashData.map((data) => ({ value: data.categoryName }))}
            placeholder="Select or Enter New Category"
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          >
            <Input />
          </AutoComplete>
        </Form.Item>

        <Form.Item
          name="cardTitle"
          label="Card Title"
          rules={[{ required: true, message: "Please input the card title!" }]}
        >
          <Input placeholder="Card Title" />
        </Form.Item>

        {labels.map((label, index) => (
          <Form.Item key={index} label={`Label ${index + 1}`}>
            <Space direction="horizontal" style={{ width: "100%" }}>
              <Form.Item
                name={["labels", index, "name"]}
                rules={[
                  { required: true, message: "Please input the label name!" },
                ]}
                style={{ marginBottom: 0 }}
              >
                <Input
                  placeholder="Label Name"
                  value={label.name}
                  onChange={(e) =>
                    handleChangeLabel(index, "name", e.target.value)
                  }
                />
              </Form.Item>

              <Tooltip title="Choose a color">
                <Form.Item
                  name={["labels", index, "color"]}
                  rules={[
                    {
                      required: true,
                      message: "Please select the label color!",
                    },
                  ]}
                  style={{ marginBottom: 0 }}
                >
                  <ColorPicker
                    format="hex"
                    onChange={(color) => {
                      handleChangeLabel(index, "color", color.toHex()); // Pass HEX value directly
                    }}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Tooltip>
            </Space>
          </Form.Item>
        ))}

        <Form.Item>
          <Button
            type="dashed"
            onClick={handleAddLabel}
            icon={<PlusOutlined />}
          >
            Add Label
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default AddCardFormDrawer