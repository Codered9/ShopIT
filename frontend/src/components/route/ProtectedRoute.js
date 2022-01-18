import React from 'react'
import {Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const ProtectedRoute = ({ children }) => {

    const { isAuthenticated, loading } = useSelector(state => state.auth)

    return ( (loading===false && isAuthenticated=== true) ? children :
    <Navigate to='/login' replace />    )
}

export default ProtectedRoute