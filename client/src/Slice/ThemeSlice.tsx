export const toggleTheme = () => ({
  type: "TOGGLE_THEME",
});

const initialState = {
  isDarkTheme: false, // Default theme is light
};

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { ...state, isDarkTheme: !state.isDarkTheme };
    default:
      return state;
  }
};

export const selectTheme = (state) => state.theme.isDarkTheme;
