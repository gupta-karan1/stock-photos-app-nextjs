"use client";

import Link from "next/link";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  return (
    <Navbar
      bg="primary"
      variant="dark"
      sticky="top"
      expand="sm"
      collapseOnSelect
    >
      <Container>
        <Navbar.Brand as={Link} href="/">
          Stock Photo Gallery
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav>
            <Nav.Link as={Link} href="/static" active={pathname === "/static"}>
              Static
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/dynamic"
              active={pathname === "/dynamic"}
            >
              Dynamic
            </Nav.Link>
            <Nav.Link as={Link} href="/isr" active={pathname === "/isr"}>
              ISR
            </Nav.Link>
            <Nav.Link as={Link} href="/search" active={pathname === "/search"}>
              Search
            </Nav.Link>
            <NavDropdown title="Topics" id="topics-dropdown">
              <NavDropdown.Item
                as={Link}
                href="/topics/health"
                active={pathname === "/topics/[topic]"}
              >
                Health
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                href="/topics/cars"
                active={pathname === "/topics/[topic]"}
              >
                Cars
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                href="/topics/nature"
                active={pathname === "/topics/[topic]"}
              >
                Nature
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
