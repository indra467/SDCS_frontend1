import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isManager = false
    let isAdmin = false
    let isSales_Employee = false
    let isOperation_Employee = false
    let status = "Employee"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles } = decoded.UserInfo

        isManager = roles.includes('Manager')
        isAdmin = roles.includes('Admin')
        isSales_Employee = roles.includes('Sales_Employee')
        isOperation_Employee = roles.includes('Operation_Employee')

        if (isManager) status = "Manager"
        if (isAdmin) status = "Admin"
        if (isSales_Employee) status = "Sales_Employee"
        if(isOperation_Employee) status = "Operation_Employee"

        return { username, roles, status, isManager, isAdmin, isSales_Employee, isOperation_Employee }
    }

    return { username: '', roles: [], isManager, isAdmin, isSales_Employee, status, isOperation_Employee }
}
export default useAuth