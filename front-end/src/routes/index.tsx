import { Route, Routes, Navigate } from "react-router-dom"
import Login from "../pages/Login"
import Registration from "../pages/Registration"

const Router = () => {

    return (
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/registration' element={<Registration/>}/>
            <Route path="/dashboard" element={<></>}/>
            <Route path="/profile" element={<></>}/>
            <Route path="*" element={<Navigate replace to='/login'/>}/>
        </Routes>
    )
}

export default Router