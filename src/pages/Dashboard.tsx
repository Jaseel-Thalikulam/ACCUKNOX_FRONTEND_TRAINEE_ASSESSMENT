
import "../styles/dashboard.scss";
import { useState } from "react";
import AddCardFormDrawer from "../components/AddCardFormDrawer";
import AddCategoryDrawer from "../components/AddCategoryDrawer";
import CategoryCardSection from "../components/CategoryCardSection";
import DashboardMenuBar from "../components/DashboardMenuBar";

function DashboardPage() {

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isCategoryDrawerVisible, setCategoryDrawerVisible] = useState(false);

  const changeDrawerStatus = () => {
    setDrawerVisible(!drawerVisible);
  };

  function addCategoryDrawer() {
    setDrawerVisible(false);
    setCategoryDrawerVisible(!isCategoryDrawerVisible);
  }

  return (
    <>

      <DashboardMenuBar onAddWidthClick={changeDrawerStatus} />

      <CategoryCardSection onAddWidthClick={changeDrawerStatus} />

      <AddCategoryDrawer
        onClose={changeDrawerStatus}
        isOpen={drawerVisible}
        onAddCardClick={addCategoryDrawer}
      />

      <AddCardFormDrawer
        onClose={addCategoryDrawer}
        isOpen={isCategoryDrawerVisible}
      />
    </>
  );
}

export default DashboardPage;
