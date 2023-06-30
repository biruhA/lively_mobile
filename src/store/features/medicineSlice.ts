import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {medicineApi} from '../services';

interface medicineState {
  selectedMedicineId: string;
  selectedDiseaseId: string;
}

const initialState: medicineState = {
  selectedMedicineId: '',
  selectedDiseaseId: '',
};

export const medicineSlice = createSlice({
  name: 'medicine',
  initialState,
  reducers: {
    setSelectedMedicineId: (state, action: PayloadAction<string>) => {
      state.selectedMedicineId = action.payload;
    },
    setSelectedDiseaseId: (state, action: PayloadAction<string>) => {
      state.selectedDiseaseId = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      medicineApi.endpoints.getMedicineNotification.matchFulfilled,
      (state, action) => {
        console.log('🚀 ~ file: medicineSlice.ts:25 ~ action:', action.payload);
      },
    );
  },
});

export const {setSelectedMedicineId, setSelectedDiseaseId} =
  medicineSlice.actions;
export default medicineSlice.reducer;
