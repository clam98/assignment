import { Container, Button, Form, NavDropdown } from "react-bootstrap";
import { Nav, Navbar } from "react-bootstrap";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from '@/lib/authenticate';



export default function MainNav(){

    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false)
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    console.log(searchHistory)

    let token = readToken();

    function logout() {
      setIsExpanded(false)
      removeToken()
      router.push("/login")
    }

    const search = async (e) => {
        e.preventDefault(); 
        const searchField = e.target.elements.search.value;
        setSearchHistory(await addToHistory(`title=true&q=${searchField}`)) 
        router.push(`/artwork?title=true&q=${searchField}`);
    };

    const toggleNavbar = () => {
      console.log('Toggling Navbar:', !isExpanded); // Debugging line
      setIsExpanded(!isExpanded);
    };
    
    return(
        <>
        <Navbar expand="lg" expanded={isExpanded} className="navbar-dark-fixed-top">
            <Container fluid>
                <Navbar.Brand>Carmen Lam</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav'
                    onClick={toggleNavbar}/>
                 <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                        <Nav.Link href="/" passHref legacyBehavior
                            onClick={()=>setIsExpanded(false)}
                            active={router.pathname === "/"}
                        >
                          Home
                        </Nav.Link>

                        <Nav.Link href="/search" passHref legacyBehavior
                            onClick={()=>setIsExpanded(false)}
                            active={router.pathname === "/search"}
                        >
                          Advanced Search
                        </Nav.Link>
                    </Nav>
                    &nbsp;
                    {!token && (
                      <Nav>
                        <Nav.Link href="/register" passHref legacyBehavior 
                          onClick={()=> setIsExpanded(false)}
                          active={router.pathname==="/register"}>
                            Register 
                            </Nav.Link>
                        <Nav.Link href="/login" passHref legacyBehavior
                          onClick={()=>setIsExpanded(false)}
                          active={router.pathname==="/login"}>
                          Login
                        </Nav.Link>
                      </Nav>
                    )}
                    &nbsp;
                    <Form className="d-flex" onSubmit={search}>
                        <Form.Control
                        type="search"
                        name="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        />
                        <Button variant="outline-success" type="submit" 
                        onClick={()=>setIsExpanded(false)}
                        >
                            Search
                        </Button>
                    </Form>
                    &nbsp;
                    <Nav>
                      {token && (
                        <NavDropdown title={token.userName} id="basic-nav-dropdown">
                        <Link href="/favourites" passHref legacyBehavior>
                          <NavDropdown.Item 
                            active={router.pathname === "/favourites"}
                            onClick={()=>setIsExpanded(false)}>
                              Favourites
                            </NavDropdown.Item>
                        </Link>

                        <Link href="/history" passHref legacyBehavior>
                          <NavDropdown.Item 
                            active={router.pathname === "/history"}
                            onClick={()=>setIsExpanded(false)}>
                              History
                            </NavDropdown.Item>
                        </Link>
                        <Link href="" passHref legacyBehavior>
                          <NavDropdown.Item onClick={() => logout()}>
                            Logout
                          </NavDropdown.Item>
                        </Link>

                      </NavDropdown>
                      )}
                      
                    </Nav>
                 </Navbar.Collapse>
                    
            </Container>
        </Navbar>
        <br />
        <br />
        </>
    );
}