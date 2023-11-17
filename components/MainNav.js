import { Container, Button, Form, NavDropdown } from "react-bootstrap";
import { Nav, Navbar } from "react-bootstrap";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";

export default function MainNav(){

    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false)
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

    const search = (e) => {
        e.preventDefault(); 
        const searchField = e.target.elements.search.value;
        let queryString = `title=true&q=${searchField}`
        setSearchHistory((current) => [...current, queryString])
        router.push(`/artwork?title=true&q=${searchField}`);
    };

    return(
        <>
        <Navbar expand="lg" className="navbar-dark-fixed-top">
            <Container fluid>
                <Navbar.Brand>Carmen Lam</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav'
                    onClick={()=>
                        setIsExpanded(!isExpanded)}
                        />
                 <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                        <Nav.Link href="/" passHref legacyBehavior
                            onClick={()=>setIsExpanded(!isExpanded)}
                            
                            active={router.pathname === "/"}
                        >
                          Home
                        </Nav.Link>

                        <Nav.Link href="/search" passHref legacyBehavior
                            onClick={()=>setIsExpanded(!isExpanded)}
                            active={router.pathname === "/search"}
                        >
                          Advanced Search
                        </Nav.Link>
                    </Nav>
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
                        onClick={()=>setIsExpanded(!isExpanded)}
                        >
                            Search
                        </Button>
                    </Form>
                    &nbsp;
                    <Nav>
                      <NavDropdown title="userName" id="basic-nav-dropdown">
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

                      </NavDropdown>
                    </Nav>
                 </Navbar.Collapse>
                    
            </Container>
        </Navbar>
        <br />
        <br />
        </>
    );
}