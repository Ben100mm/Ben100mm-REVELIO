import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:6002';

// Create axios instance
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: { email: string; password: string; role: string; creatorData?: any; brandData?: any }) =>
    api.post('/auth/register', data),
  
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  
  logout: () =>
    api.post('/auth/logout'),
  
  getProfile: () =>
    api.get('/auth/profile'),
};

// Creators API
export const creatorsAPI = {
  getCreators: (params?: any) =>
    api.get('/creators', { params }),
  
  getCreator: (id: string) =>
    api.get(`/creators/${id}`),
  
  updateCreator: (id: string, data: any) =>
    api.put(`/creators/${id}`, data),
  
  getCreatorContent: (id: string, params?: any) =>
    api.get(`/creators/${id}/content`, { params }),
  
  getCreatorEarnings: (id: string, params?: any) =>
    api.get(`/creators/${id}/earnings`, { params }),
  
  getCreatorPerformance: (id: string, params?: any) =>
    api.get(`/creators/${id}/performance`, { params }),
};

// Content API
export const contentAPI = {
  getContent: (params?: any) =>
    api.get('/content', { params }),
  
  getContentById: (id: string) =>
    api.get(`/content/${id}`),
  
  createContent: (data: any) =>
    api.post('/content', data),
  
  updateContent: (id: string, data: any) =>
    api.put(`/content/${id}`, data),
  
  deleteContent: (id: string) =>
    api.delete(`/content/${id}`),
  
  publishContent: (id: string) =>
    api.post(`/content/${id}/publish`),
  
  getContentPerformance: (id: string, params?: any) =>
    api.get(`/content/${id}/performance`, { params }),
  
  distributeContent: (id: string, platforms: string[]) =>
    api.post(`/content/${id}/distribute`, { platforms }),
};

// Brands API
export const brandsAPI = {
  getBrands: (params?: any) =>
    api.get('/brands', { params }),
  
  getBrand: (id: string) =>
    api.get(`/brands/${id}`),
  
  updateBrand: (id: string, data: any) =>
    api.put(`/brands/${id}`, data),
  
  getBrandCampaigns: (id: string, params?: any) =>
    api.get(`/brands/${id}/campaigns`, { params }),
};

// Campaigns API
export const campaignsAPI = {
  getCampaigns: (params?: any) =>
    api.get('/campaigns', { params }),
  
  getCampaign: (id: string) =>
    api.get(`/campaigns/${id}`),
  
  createCampaign: (data: any) =>
    api.post('/campaigns', data),
  
  updateCampaign: (id: string, data: any) =>
    api.put(`/campaigns/${id}`, data),
  
  deleteCampaign: (id: string) =>
    api.delete(`/campaigns/${id}`),
  
  getCampaignPerformance: (id: string, params?: any) =>
    api.get(`/campaigns/${id}/performance`, { params }),
};

// Analytics API
export const analyticsAPI = {
  getPlatformAnalytics: (params?: any) =>
    api.get('/analytics/platform', { params }),
  
  getCreatorAnalytics: (id: string, params?: any) =>
    api.get(`/analytics/creator/${id}`, { params }),
  
  getBrandAnalytics: (id: string, params?: any) =>
    api.get(`/analytics/brand/${id}`, { params }),
  
  getContentAnalytics: (id: string, params?: any) =>
    api.get(`/analytics/content/${id}`, { params }),
  
  getRevenueAnalytics: (params?: any) =>
    api.get('/analytics/revenue', { params }),
};

export default api;
