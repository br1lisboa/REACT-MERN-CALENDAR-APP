import { Navigate, Route, Routes } from "react-router-dom"

import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar"

export const AppRouter = () => {

    const authStatus = 'not-auth'

    return (
        <Routes>

            {
                (authStatus === 'not-auth')
                    ? <Route path="/auth/*" element={<LoginPage />} />
                    : <Route path="/*" element={<CalendarPage />} />

            }

            <Route path="/*" element={<Navigate to='/auth/login' />} />

        </Routes>
    )
}
