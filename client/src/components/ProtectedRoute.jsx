import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { PROTOTYPE_CONFIG } from '../config/prototype'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div className="skeleton" style={{ 
          width: '200px', 
          height: '20px', 
          borderRadius: '4px' 
        }} />
      </div>
    )
  }

  // In prototype mode, always allow access to protected routes
  if (PROTOTYPE_CONFIG.enabled) {
    return children
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
