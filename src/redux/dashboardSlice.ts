import { createSlice } from "@reduxjs/toolkit";
import { getRandomValue } from "../helpers/helpers";
import { Label } from "../interface/label.interface";

const INITIAL_STATE = {
  dashData: [
    {
      categoryName: "CSPM Executive Dashboard",
      cardData: [
        {
          title: "Cloud Accounts",
          labels: [
            {
              name: "Connected",
              color: "#5578ff",
              value: 2,
            },
            {
              name: "Not Connected",
              color: "#e1ebff",
              value: 2,
            },
          ],
          isEnabled: true,
        },
        {
          title: "Cloud Account Risk Assessment",
          labels: [
            {
              name: "Failed",
              color: "#b9140f",
              value: 1685,
            },
            {
              name: "Warning",
              color: "#fad732",
              value: 681,
            },
            {
              name: "Not available",
              color: "#c8cddc",
              value: 36,
            },
            {
              name: "Passed",
              color: "#19a55a",
              value: 7253,
            },
          ],
          isEnabled: false,
        },
      ],
    },
  ],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: INITIAL_STATE,
  reducers: {
    setNewCard:(state, action) => {
  const { categoryName, cardTitle, labels } = action.payload;
  let category = state.dashData.find(
    (cat) => cat.categoryName === categoryName
  );

  if (!category) {
    // If category doesn't exist, create a new one
    category = {
      categoryName,
      cardData: [],
    };
    state.dashData.push(category);
  }

  const newCard = {
    title: cardTitle,
    labels: labels?.map((label:Label) => ({
      ...label,
      value: getRandomValue(),
    })) || [],
    isEnabled: true,
  };

  category.cardData.push(newCard);
},
    removeCard: (state, action) => {
      const { categoryIndex, cardIndex } = action.payload;
      if (
        state.dashData[categoryIndex] &&
        state.dashData[categoryIndex].cardData[cardIndex]
      ) {
        state.dashData[categoryIndex].cardData.splice(cardIndex, 1);
      }
    },
    setCardStatus: (state, action) => {
      const { categoryIndex, cardIndex, isEnabled } = action.payload;
      if (
        state.dashData[categoryIndex] &&
        state.dashData[categoryIndex].cardData[cardIndex]
      ) {
        state.dashData[categoryIndex].cardData[cardIndex].isEnabled = isEnabled;
      }
    },
  },
});

export const { setNewCard, removeCard, setCardStatus } = dashboardSlice.actions;

export default dashboardSlice.reducer;
