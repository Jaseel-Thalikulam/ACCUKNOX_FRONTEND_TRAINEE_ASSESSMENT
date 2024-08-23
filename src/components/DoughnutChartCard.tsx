
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem } from "chart.js";
import "../styles/chart.scss";
import { CardData } from "../interface/cardData.interface";
import { centerTextPlugin, getRandomValue } from "../helpers/helpers";
import { Switch } from "antd";
import { useDispatch } from "react-redux";
import { setCardStatus } from "../redux/dashboardSlice";

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChartCard({
  cardData,
  categoryIndex,
  cardIndex,
  isDrawer = false,
}: {
  cardData: CardData;
  isDrawer?: Boolean;
  categoryIndex?: number;
  cardIndex?: number;
}) {
  const dispatch = useDispatch();
  const data = {
    labels: cardData?.labels?.map((label) => label.name),
    datasets: [
      {
        data: cardData.labels.map((label) =>
          label.value ? label.value : getRandomValue()
        ),
        backgroundColor: cardData?.labels?.map((label) => label?.color),
        borderWidth: 1,
      },
    ],
  };

  function handleSwitchChange() {
    dispatch(
      setCardStatus({
        categoryIndex,
        cardIndex,
        isEnabled: !cardData.isEnabled,
      })
    );
  }

  const options = {
    responsive: true,
    cutout: "70%",
    plugins: {
      legend: {
        display: false, // Disable the default legend
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"doughnut">) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
      centerText: true, // Enable the centerText plugin
    },
  };

  return (
    <div className="card-container">
      <div
        className="card-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h5>{cardData.title}</h5>
        {isDrawer && (
          <Switch checked={cardData.isEnabled} onChange={handleSwitchChange} />
        )}
      </div>
      <div className="doughnut--chart--container">
        <div className="doughnut--chart">
          <Doughnut
            data={data}
            options={options}
            plugins={[centerTextPlugin]}
          />
        </div>

        {/* Right Side: Labels */}
        <div className="doughnut--labels">
          <ul>
            {data.labels.map((label, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
                    backgroundColor: data.datasets[0].backgroundColor[index],
                    marginRight: "8px",
                  }}
                ></span>
                {label} ({data.datasets[0].data[index]})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DoughnutChartCard;
