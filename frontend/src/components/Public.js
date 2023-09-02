import { Link } from 'react-router-dom'
import Styles from "./Public.module.css"
import { Container } from 'react-bootstrap'
import Crane from './Crane.js'
const Public = () => {
    const content = (
        <div className={`${Styles.public} m-0 p-0`}>
            {/* <header>
                <h1>SDCS <span className="nowrap">Cranes!</span></h1>
            </header>
            <main className={`${Styles.public__main}`}>
                <p>This is the landing page</p>
                <address className={`${Styles.public__addr}`}>
                    
                </address>
                <br />
                <p></p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer> */}
            <Crane />
        </div>

    )
    return content
}
export default Public