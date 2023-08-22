import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'

const Sales_welcome = () => {

    const { username, isManager, isAdmin, isSales_Employee } = useAuth()

    useTitle(`techNotes: ${username}`)

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome {username}!</h1>
            {(isSales_Employee) && <div className="left-sidebar">
            <p><Link to="/dash/notes">Manage RFQ</Link></p>
            <b className=" sort-list">Sort order list</b>
            <p><Link to="/dash/users">Deal Quality Calculation</Link></p>
            
                <p><Link to="/dash/drafts">Manage Equipped Occupancy</Link></p>
                <p><Link to="/dash/drafts/new">Manage Work Order</Link></p>
            </div>}
            

        </section>
    )

    return content
}
export default Sales_welcome
