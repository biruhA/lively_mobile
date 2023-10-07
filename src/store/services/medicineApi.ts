// Need to use the React-specific entry point to allow generating React hooks
import {createApi} from '@reduxjs/toolkit/query/react';
import {authUrl} from '../baseUrlConstant';

export const medicineApi = createApi({
  reducerPath: 'medicineApi',
  baseQuery: authUrl,
  endpoints: build => ({
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
    getSymptoms: build.query({
      query: id => ({
        url: `get-symptoms/${id}`,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    getMedicinesBySymptom: build.query({
      query: id => ({
        url: `get-medicines-by-symptom/${id}`,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),

    medicineNotificationDetail: build.query({
      query: ({id, token}) => ({
        url: `medicine-notification-detail/${id}`,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    getClaimedDetail: build.query({
      query: ({id, token, longitude, latitude}) => ({
        url: `get-claimed-detail/${id}`,
        params: {
          longitude,
          latitude,
        },
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    uploadPrescription: build.mutation({
      query: ({formData, token}) => ({
        url: 'upload-prescription',
        method: 'POST',
        body: formData,
        headers: {
          accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetMedicinesBySymptomQuery,
  useMedicineNotificationDetailQuery,
  useGetDiseasesQuery,
  useGetAllMedicinesQuery,
  useMedicineDetailQuery,
  useMedicineStoresQuery,
  useGetMedicinesByDiseaseQuery,
  useGetSymptomsQuery,
  useGetClaimedDetailQuery,
  useUploadPrescriptionMutation,
} = medicineApi;
