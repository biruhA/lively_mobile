import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface medicineState {
  selectedMedicineId: string;
  selectedDiseaseId: string;
  selectedSymptomId: string;
  selectedNotificationId: string;
}

const initialState: medicineState = {
  selectedMedicineId: '',
  selectedDiseaseId: '',
  selectedSymptomId: '',
  selectedNotificationId: '',
};

export const medicineSlice = createSlice({
  name: 'medicine',
  initialState,
  reducers: {
    setSelectedMedicineId: (state, action: PayloadAction<string>) => {
      state.selectedMedicineId = action.payload;
    },
    setSelectedNotificationId: (state, action: PayloadAction<string>) => {
      state.selectedNotificationId = action.payload;
    },
    setSelectedDiseaseId: (state, action: PayloadAction<string>) => {
      state.selectedDiseaseId = action.payload;
    },
    setSelectedSymptomId: (state, action: PayloadAction<string>) => {
      state.selectedSymptomId = action.payload;
    },
  },
  extraReducers: builder => {
    // builder.addMatcher(
    //   medicineApi.endpoints.getMedicineNotification.matchFulfilled,
    //   (state, action) => {},
    // );
  },
});

export const {
  setSelectedMedicineId,
  setSelectedDiseaseId,
  setSelectedSymptomId,
  setSelectedNotificationId,
} = medicineSlice.actions;
export default medicineSlice.reducer;
