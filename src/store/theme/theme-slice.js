import { createSlice } from "@reduxjs/toolkit";

// Initial state for theme
const initialState = {
  theme: localStorage.getItem('theme') || 'light', // Default to 'light' if not set
};

// Theme slice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    switchTheme(state, action) {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
      document.querySelector("html").setAttribute("data-bs-theme", action.payload);
    },
  },
});

// Redux thunk to update the state
export const setTheme = (currentDate, sunrise, sunset) => (dispatch) => {
  const currentTime = currentDate.getTime();
  const sunriseTime = sunrise.getTime();
  const sunsetTime = sunset.getTime();

  if (currentTime >= sunriseTime && currentTime < sunsetTime) {
    dispatch(themeSlice.actions.switchTheme("light"));
  } else {
    dispatch(themeSlice.actions.switchTheme("dark"));
  }
};

// Action to manually set the theme
export const manuallySetTheme = (theme) => (dispatch) => {
  dispatch(themeSlice.actions.switchTheme(theme));
};

export const { switchTheme } = themeSlice.actions;
export default themeSlice.reducer;