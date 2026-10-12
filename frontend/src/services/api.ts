import axios from 'axios';

const API_BASE = '/api';

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('agri_farmer_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  // Auth
  register: async (data: any) => (await client.post('/auth/register', data)).data,
  login: async (data: any) => (await client.post('/auth/login', data)).data,
  getMe: async () => (await client.get('/auth/me')).data,
  updateProfile: async (data: any) => (await client.put('/auth/profile', data)).data,
  deleteAccount: async () => (await client.delete('/auth/account')).data,

  // Farm
  getFarm: async () => (await client.get('/farm')).data,
  updateFarm: async (data: any) => (await client.put('/farm', data)).data,

  // Soil
  uploadSoilReport: async (formData: FormData) => {
    return (
      await client.post('/soil/reports', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    ).data;
  },
  getSoilReports: async () => (await client.get('/soil/reports')).data,
  verifySoilData: async (data: any) => (await client.post('/soil/verify', data)).data,
  analyzeSoil: async (data: any) => (await client.post('/soil/analyze', data)).data,

  // Soil Labs
  getSoilLabs: async (district?: string) => (await client.get('/labs', { params: { district } })).data,
  getSoilLabById: async (id: string) => (await client.get(`/labs/${id}`)).data,

  // Crops
  getCrops: async () => (await client.get('/crops')).data,
  getCropById: async (id: string) => (await client.get(`/crops/${id}`)).data,
  recommendCrops: async (data: any) => (await client.post('/crops/recommend', data)).data,

  // Fertilizer
  recommendFertilizers: async (data: any) => (await client.post('/fertilizer/recommend', data)).data,

  // Crop Plan
  createCropPlan: async (data: any) => (await client.post('/crop-plans', data)).data,
  getCropPlans: async () => (await client.get('/crop-plans')).data,
  updateTaskStatus: async (taskId: string, status: string) => (await client.put(`/crop-plans/tasks/${taskId}`, { status })).data,

  // Irrigation
  recommendIrrigation: async (data: any) => (await client.post('/irrigation/recommend', data)).data,

  // Profit
  calculateProfit: async (data: any) => (await client.post('/profit/calculate', data)).data,

  // Markets
  getMarkets: async (params?: any) => (await client.get('/markets', { params })).data,
  getMarketPrices: async () => (await client.get('/markets/prices')).data,

  // Buyers
  getBuyers: async (params?: any) => (await client.get('/buyers', { params })).data,

  // AI Assistant
  askAssistant: async (data: any) => (await client.post('/assistant/chat', data)).data,

  // Notifications
  getNotifications: async () => (await client.get('/notifications')).data,
  markNotificationRead: async (id: string) => (await client.put(`/notifications/${id}/read`)).data
};
