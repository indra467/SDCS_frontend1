import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>SDCS <span className="nowrap">Cranes!</span></h1>
            </header>
            <main className="public__main">
                <p>This is the landing page</p>
                <address className="public__addr">
                    
                </address>
                <br />
                <p></p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public