import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: localStorage.getItem("idToken"),
};
const initialExpenseState = {
  expense: [],
};


const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    ongetToken(state, action) {
      state.token = action.payload;
    },
  },
});

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpenseState,
  reducers: {
    onAddOrGetExpense(state, action) {
      if (action.payload == null) {
      } else {
        state.expense = action.payload;
      }
    },
  },
});
const initialthemeState = {
  darktheme: false,
};
const themeSlice=createSlice({
  name:'theme',
  initialState: initialthemeState,
  reducers:{
    changetheme(state){
      state.darktheme=!state.darktheme;
    }
  }
})


const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    expense: expenseSlice.reducer,
    theme:themeSlice.reducer,
  },
});

export const authActions = authSlice.actions;
export const expenseActions = expenseSlice.actions;
export const themeActions = themeSlice.actions;


export default store;
