import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { Layout, Header, Button , Drawer } from 'react-mdl';

const App = (props) => {
  return (
    <Layout className="mdl-layout__fixed-header">
      <Header>
        <Button href="/">Home</Button>
        <Button href="/About">About</Button>
      </Header>
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
