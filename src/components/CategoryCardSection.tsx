import React from "react";
import DoughnutChartCard from "./DoughnutChartCard";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { rootState } from "../redux/store";

function CategoryCardSection({
  onAddWidthClick,
}: {
  onAddWidthClick: () => void;
}) {
  const dashData = useSelector((state: rootState) => state.dashboard.dashData);

  return (
    <div className="dashboard--category--container">
      {dashData.map((data, index) => (
        <React.Fragment key={index}>
          <h5>{data.categoryName}</h5>
          <div className="dashboard--cards--container">
            {data.cardData.map(
              (card, cardIndex) =>
                card.isEnabled && (
                  <DoughnutChartCard
                    key={cardIndex}
                    cardData={card}
                    cardIndex={cardIndex}
                    categoryIndex={index}
                  />
                )
            )}

            <div className="card-container">
              <div className="btn--container">
                <Button onClick={onAddWidthClick}>Add Width +</Button>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default CategoryCardSection;
