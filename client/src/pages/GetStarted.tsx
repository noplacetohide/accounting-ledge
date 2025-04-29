import React, { useState } from 'react'
import Login from '@/components/auth-flow/Login'
import SignUp from '@/components/auth-flow/SignUp'

export default function GetStarted() {
    const [isLogin, setIsLogin] = useState(false)
    return (
        isLogin ? <Login setIsLogin={setIsLogin} /> : <SignUp setIsLogin={setIsLogin} />
    )
}
