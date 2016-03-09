import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { Layout, Button , Drawer } from 'react-mdl';
import HeaderContainer from './../containers/HeaderContainer/HeaderContainer';

const App = (props) => {
  return (
    <Layout className="mdl-layout__fixed-header">
      <HeaderContainer />
      <Drawer>
        <div onClick={Link.handleClick} href="/About">About</div>
        <div onClick={Link.handleClick} to="/About">About</div>
        <div onClick={Link.handleClick} to="/About">About</div>
        </Drawer>
      <div>
        <br/>
        {props.children}
      </div>
    </Layout>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
