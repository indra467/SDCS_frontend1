import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'
import { Layout } from 'antd'
import Sidebar from '../../components/Sidebar'

const Welcome = () => {

    const { username, isManager, isAdmin, isSales_Employee } = useAuth()

    useTitle(`techNotes: ${username}`)

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <h1>Welcome {username}!</h1>
            {(isSales_Employee || isAdmin) && <div className="left-sidebar">
               <button><a className="message" href="https://indra467.github.io/NLP-Implemented-Chatbot/">Message</a></button>
                <label Classname="Notifications"><p><Link to="/dash/users">Notifications</Link></p></label>
                <p><Link to="/dash/notes/sales">Functions</Link></p>
            </div>}
           {/* <p><Link to="/dash/notes">View techNotes</Link></p>

            <p><Link to="/dash/notes/new">Add New techNote</Link></p>*/}

            {(isManager || isAdmin) && <p><Link to="/dash/users">View User Settings</Link></p>}

            {(isManager || isAdmin) && <p><Link to="/dash/users/new">Add New User</Link></p>}

        </section>
    )

    // return content
    return(
        <div className='bg-warning'>
            
        </div>
    );
}
export default Welcome
