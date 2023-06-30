// Need to use the React-specific entry point to allow generating React hooks
import {createApi} from '@reduxjs/toolkit/query/react';
import {authUrl} from '../baseUrlConstant';

export const medicineApi = createApi({
  reducerPath: 'medicineApi',
  baseQuery: authUrl,
  endpoints: build => ({
    getMedicineNotification: build.query({
      query: token => ({
        url: 'get-medicine-notification',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    getDiseases: build.query({
      query: () => ({
        url: 'get-diseases',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    getAllMedicines: build.query({
      query: () => ({
        url: 'get-all-medicines',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    medicineDetail: build.query({
      query: id => ({
        url: `medicine-detail/${id}`,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    medicineStores: build.query({
      query: ({id, longitude, latitude}) => ({
        url: `medicine-stores/${id}`,
        params: {
          longitude,
          latitude,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    getMedicinesByDisease: build.query({
      query: id => ({
        url: `get-medicines-by-disease/${id}`,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    uploadPrescription: build.mutation({
      query: image => ({
        url: 'upload-prescription',
        method: 'POST',
        body: {
          image,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const {
  useGetMedicineNotificationQuery,
  useGetDiseasesQuery,
  useGetAllMedicinesQuery,
  useMedicineDetailQuery,
  useMedicineStoresQuery,
  useGetMedicinesByDiseaseQuery,
  useUploadPrescriptionMutation,
} = medicineApi;
