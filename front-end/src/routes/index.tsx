import { Route, Routes, Navigate } from "react-router-dom"

const Router = () => {

    return (
        <Routes>
            <Route path='/login' element={<></>}/>
            <Route path='/registration' element={<></>}/>
            <Route path="/dashboard" element={<></>}/>
            <Route path="/profile" element={<></>}/>
            <Route path="*" element={<Navigate replace to='/login'/>}/>
        </Routes>
    )
}

export default Router