import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)

  useEffect(() => {
    // Check for existing authentication on app load
    const storedToken = localStorage.getItem('coffers_token') || sessionStorage.getItem('coffers_token')
    const storedUser = localStorage.getItem('coffers_user')
    
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
      api.setToken(storedToken)
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    try {
      const response = await api.login(credentials)
      const { accessToken, user: userData } = response
      
      setToken(accessToken)
      setUser(userData)
      api.setToken(accessToken)
      
      // Store in localStorage for persistence
      localStorage.setItem('coffers_token', accessToken)
      localStorage.setItem('coffers_user', JSON.stringify(userData))
      
      return response
    } catch (error) {
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const response = await api.register(userData)
      const { accessToken, user: newUser } = response
      
      setToken(accessToken)
      setUser(newUser)
      api.setToken(accessToken)
      
      // Store in localStorage for persistence
      localStorage.setItem('coffers_token', accessToken)
      localStorage.setItem('coffers_user', JSON.stringify(newUser))
      
      return response
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    api.setToken(null)
    
    // Clear stored data
    localStorage.removeItem('coffers_token')
    localStorage.removeItem('coffers_user')
    localStorage.removeItem('coffers_profile')
    localStorage.removeItem('profilePending')
    localStorage.removeItem('profileBannerDismissed')
    sessionStorage.removeItem('coffers_token')
  }

  const updateUser = (updatedUser) => {
    setUser(updatedUser)
    localStorage.setItem('coffers_user', JSON.stringify(updatedUser))
  }

  const isAuthenticated = () => {
    return !!token && !!user
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
