import axios from 'axios'

class ApiService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    this.token = null
    
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor to handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          this.token = null
          localStorage.removeItem('coffers_token')
          sessionStorage.removeItem('coffers_token')
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  setToken(token) {
    this.token = token
  }

  // Authentication methods
  async login(credentials) {
    const response = await this.client.post('/api/auth/login', credentials)
    return response.data
  }

  async register(userData) {
    const response = await this.client.post('/api/auth/register', userData)
    return response.data
  }

  // Company methods
  async getCompanies(filters = {}) {
    const response = await this.client.get('/api/companies', { params: filters })
    return response.data
  }

  async getCompany(symbol) {
    const response = await this.client.get(`/api/companies/${symbol}`)
    return response.data
  }

  // Search methods
  async search(query, type = null) {
    const params = { q: query }
    if (type) params.type = type
    const response = await this.client.get('/api/search', { params })
    return response.data
  }

  // Events methods
  async getEvents(filters = {}) {
    const response = await this.client.get('/api/events', { params: filters })
    return response.data
  }

  // Watchlist methods
  async getWatchlists() {
    const response = await this.client.get('/api/watchlists')
    return response.data
  }

  async createWatchlist(data) {
    const response = await this.client.post('/api/watchlists', data)
    return response.data
  }

  // Profile methods
  async getProfile() {
    const response = await this.client.get('/api/user/profile')
    return response.data
  }

  async updateProfile(data) {
    const response = await this.client.post('/api/user/profile', data)
    return response.data
  }
}

const api = new ApiService()
export default api
