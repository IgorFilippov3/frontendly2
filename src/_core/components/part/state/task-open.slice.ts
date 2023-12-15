import { createSlice } from "@reduxjs/toolkit";

export interface TaskOpenState {
  value: boolean;
}

const initialState: TaskOpenState = {
  value: true,
}

const taskOpenSlice = createSlice({
  name: 'task-open',
  initialState,
  reducers: {
    toggle(state) {
      return {
        value: !state.value
      }
    }
  }
});

export const { toggle } = taskOpenSlice.actions;
export default taskOpenSlice.reducer;