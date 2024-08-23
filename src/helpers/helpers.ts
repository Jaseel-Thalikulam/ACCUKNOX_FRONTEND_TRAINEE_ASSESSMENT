import { Plugin } from "chart.js";

export const getRandomValue = () =>
  Math.floor(Math.random() * (100 - 10 + 1)) + 10;
// export const centerTextPlugin = {
//   id: "centerText",
//   beforeDraw: function (chart: Chart) {
//     const { width, height, ctx } = chart;

//     // Ensure ctx is available and datasets is defined
//     if (!ctx || !chart.data.datasets || chart.data.datasets.length === 0) {
//       return;
//     }

//     ctx.restore();

//     // Extract data safely
//     const dataset = chart.data.datasets[0];
//     if (!dataset || !Array.isArray(dataset.data)) {
//       return;
//     }

//     // Filter and sum numeric values only
//     const count =
//       dataset.data
//         .filter((item) => typeof item === "number") // Filter out non-numeric values
//         .reduce(
//           (a, b) =>
//             typeof a === "number" && typeof b === "number" ? a + b : a,
//           0
//         ) ?? 0;

//     const text1 = `${count}`; // Display count
//     const text2 = `Total`; // Display "Total"

//     // Set font and text alignment
//     ctx.textBaseline = "middle";
//     ctx.textAlign = "center";

//     // Draw bold count text
//     const fontSizeBold = (height / 120).toFixed(2);
//     ctx.font = `bold ${fontSizeBold}em sans-serif`;
//     const textX = Math.round(width / 2);
//     const textY = Math.round(height / 2) - 10;
//     ctx.fillText(text1, textX, textY);

//     // Draw regular "Total" text
//     const fontSizeRegular = (height / 150).toFixed(2);
//     ctx.font = `${fontSizeRegular}em sans-serif`;
//     ctx.fillText(text2, textX, textY + 20); // Adjusted for spacing
//     ctx.save();
//   },
// };

export const centerTextPlugin: Plugin<"doughnut"> = {
  id: "centerText",
  beforeDraw(chart) {
    const { width, height, ctx } = chart;

    if (!ctx || !chart.data.datasets || chart.data.datasets.length === 0) {
      return;
    }

    ctx.restore();

    const dataset = chart.data.datasets[0];
    if (!dataset || !Array.isArray(dataset.data)) {
      return;
    }

    const count =
      dataset.data
        .filter((item) => typeof item === "number")
        .reduce(
          (a, b) =>
            typeof a === "number" && typeof b === "number" ? a + b : a,
          0
        ) ?? 0;

    const text1 = `${count}`;
    const text2 = `Total`;

    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    const fontSizeBold = (height / 120).toFixed(2);
    ctx.font = `bold ${fontSizeBold}em sans-serif`;
    const textX = Math.round(width / 2);
    const textY = Math.round(height / 2) - 10;
    ctx.fillText(text1, textX, textY);

    const fontSizeRegular = (height / 150).toFixed(2);
    ctx.font = `${fontSizeRegular}em sans-serif`;
    ctx.fillText(text2, textX, textY + 20);

    ctx.save();
  },
};
