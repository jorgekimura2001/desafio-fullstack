import { Route, Routes, Navigate } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Login from "../pages/Login"
import Profile from "../pages/Profile"
import Registration from "../pages/Registration"

const Router = () => {

    return (
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/registration' element={<Registration/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="*" element={<Navigate replace to='/login'/>}/>
        </Routes>
    )
}

export default Router