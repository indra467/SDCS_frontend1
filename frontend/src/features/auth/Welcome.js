import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'

const Welcome = () => {

    const { username, isManager, isAdmin, isSales_Employee } = useAuth()

    useTitle(`techNotes: ${username}`)

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome {username}!</h1>
            {(isSales_Employee) && <div className="left-sidebar">
a                <button><a className="message" href="https://in.search.yahoo.com/search;_ylt=AwrPpPbzCdpkxo0UsGC7HAx.;_ylc=X1MDMjExNDcyMzAwMwRfcgMyBGZyA21jYWZlZQRmcjIDc2ItdG9wBGdwcmlkA3hjWW5LOHlLVGZTcGVpLkhMeWlmdkEEbl9yc2x0AzAEbl9zdWdnAzMEb3JpZ2luA2luLnNlYXJjaC55YWhvby5jb20EcG9zAzAEcHFzdHIDBHBxc3RybAMwBHFzdHJsAzQyBHF1ZXJ5A2NoYXRib3QlMjBhZGQlMjBrYXIlMjBkdW5nYSUyMGxhdWRlJTIwY2hpbnRhJTIwbWF0JTIwa2FyBHRfc3RtcAMxNjkyMDExMDIz?p=chatbot+add+kar+dunga+laude+chinta+mat+kar&fr2=sb-top&fr=mcafee&vm=r&type=E210IN826G0" target="_blank" rel="noopener noreferrer">Message</a></button>
                <label Classname="Notifications"><p><Link to="/dash/users">Notifications</Link></p></label>
                <p><Link to="/dash/notes/sales">Functions</Link></p>
            </div>}
            {/* <p><Link to="/dash/notes">View techNotes</Link></p>

            <p><Link to="/dash/notes/new">Add New techNote</Link></p>*/}

            {(isManager || isAdmin) && <p><Link to="/dash/users">View User Settings</Link></p>}

            {(isManager || isAdmin) && <p><Link to="/dash/users/new">Add New User</Link></p>}

        </section>
    )

    return content
}
export default Welcome
