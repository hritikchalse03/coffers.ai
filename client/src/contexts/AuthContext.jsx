import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'
import { PROTOTYPE_CONFIG } from '../config/prototype'

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
    if (PROTOTYPE_CONFIG.enabled) {
      // In prototype mode, check for localStorage auth and profile
      const storedAuth = localStorage.getItem(PROTOTYPE_CONFIG.storageKeys.auth)
      const storedProfile = localStorage.getItem(PROTOTYPE_CONFIG.storageKeys.profile)
      
      if (storedAuth === '1' && storedProfile) {
        const profile = JSON.parse(storedProfile)
        setUser({ firstName: profile.firstName })
        setToken('prototype-token')
        api.setToken('prototype-token')
      }
    } else {
      // Normal auth flow
      const storedToken = localStorage.getItem('coffers_token') || sessionStorage.getItem('coffers_token')
      const storedUser = localStorage.getItem('coffers_user')
      
      if (storedToken && storedUser) {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
        api.setToken(storedToken)
      }
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    if (PROTOTYPE_CONFIG.enabled) {
      // In prototype mode, only require firstName
      const { firstName } = credentials
      if (!firstName || !firstName.trim()) {
        throw new Error('First name is required')
      }
      
      const trimmedFirstName = firstName.trim().substring(0, 50)
      const profile = { firstName: trimmedFirstName }
      
      setUser({ firstName: trimmedFirstName })
      setToken('prototype-token')
      api.setToken('prototype-token')
      
      // Store in localStorage
      localStorage.setItem(PROTOTYPE_CONFIG.storageKeys.auth, '1')
      localStorage.setItem(PROTOTYPE_CONFIG.storageKeys.profile, JSON.stringify(profile))
      
      return { message: 'Login successful', user: { firstName: trimmedFirstName } }
    } else {
      // Normal auth flow
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
  }

  const register = async (userData) => {
    if (PROTOTYPE_CONFIG.enabled) {
      // In prototype mode, only require firstName
      const { firstName } = userData
      if (!firstName || !firstName.trim()) {
        throw new Error('First name is required')
      }
      
      const trimmedFirstName = firstName.trim().substring(0, 50)
      const profile = { firstName: trimmedFirstName }
      
      setUser({ firstName: trimmedFirstName })
      setToken('prototype-token')
      api.setToken('prototype-token')
      
      // Store in localStorage
      localStorage.setItem(PROTOTYPE_CONFIG.storageKeys.auth, '1')
      localStorage.setItem(PROTOTYPE_CONFIG.storageKeys.profile, JSON.stringify(profile))
      
      return { message: 'Registration successful', user: { firstName: trimmedFirstName } }
    } else {
      // Normal auth flow
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
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    api.setToken(null)
    
    if (PROTOTYPE_CONFIG.enabled) {
      // Clear prototype mode data
      localStorage.removeItem(PROTOTYPE_CONFIG.storageKeys.auth)
      localStorage.removeItem(PROTOTYPE_CONFIG.storageKeys.profile)
    } else {
      // Clear normal auth data
      localStorage.removeItem('coffers_token')
      localStorage.removeItem('coffers_user')
      localStorage.removeItem('coffers_profile')
      localStorage.removeItem('profilePending')
      localStorage.removeItem('profileBannerDismissed')
      sessionStorage.removeItem('coffers_token')
    }
  }

  const updateUser = (updatedUser) => {
    setUser(updatedUser)
    if (PROTOTYPE_CONFIG.enabled) {
      localStorage.setItem(PROTOTYPE_CONFIG.storageKeys.profile, JSON.stringify(updatedUser))
    } else {
      localStorage.setItem('coffers_user', JSON.stringify(updatedUser))
    }
  }

  const isAuthenticated = () => {
    return !!token && !!user
  }

  const setFirstName = (firstName) => {
    if (!firstName || !firstName.trim()) {
      throw new Error('First name is required')
    }
    
    const trimmedFirstName = firstName.trim().substring(0, 50)
    const profile = { firstName: trimmedFirstName }
    
    setUser({ firstName: trimmedFirstName })
    setToken('prototype-token')
    api.setToken('prototype-token')
    
    // Store in localStorage
    localStorage.setItem(PROTOTYPE_CONFIG.storageKeys.auth, '1')
    localStorage.setItem(PROTOTYPE_CONFIG.storageKeys.profile, JSON.stringify(profile))
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated,
    setFirstName
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
