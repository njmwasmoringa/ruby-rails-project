import { Container, Navbar } from "react-bootstrap";
import "./layout.css";
export default function Layout({ children }) {
    return <>

        <header className="w-100">
            <Navbar>
                <Container>
                    <Navbar.Brand href="/">Members Application</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <a href="#login">Julius</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
        <section className="content-container">
            {children}
        </section>
        <footer>
            Footer
        </footer>
    </>
}