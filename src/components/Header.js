import React from "react";
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch,useSelector} from "react-redux";
import {logout} from "../actions/userActions";


const Header = () =>{

  const userLogin = useSelector(state =>state.userLogin)
  const {userInfo} = userLogin
  const dispatch = useDispatch()

  const logouthandler = () =>{
    dispatch(logout())
  }

  return(
    <header>
      <Navbar bg="dark" variant='dark' expand="lg">
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand >Proshop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="ml-auto" >
              <LinkContainer to='/cart'>
              <Nav.Link >Cart<i className="fas fa-shopping-cart"/></Nav.Link>
              </LinkContainer>


              {userInfo ? (
                <NavDropdown id='username' title={userInfo.name}>
                  <LinkContainer to='/profile'><NavDropdown.Item>Profile</NavDropdown.Item></LinkContainer>
                  <NavDropdown.Item onClick={logouthandler}>Logout</NavDropdown.Item>
                </NavDropdown>

              ): (
                 <LinkContainer to='/login'>
                   <Nav.Link href="/login">Login<i className="fas fa-user"/></Nav.Link>
                 </LinkContainer>


              )}

              { !userInfo ? (<LinkContainer to='/register'>
                <Nav.Link href="/register">Sign Up<i className="fas fa-user"/></Nav.Link>
              </LinkContainer>):null}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenue'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>

                </NavDropdown>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;