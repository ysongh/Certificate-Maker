import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Menu } from 'semantic-ui-react';

function Navbar() {
  const [activeItem, setActiveItem] = useState('Home');

  return (
    <Segment color='purple' inverted>
      <Menu inverted secondary>
        <Menu.Item
          as={Link}
          to='/'
          name='Certificate Maker'
          onClick={() => setActiveItem('Home')}
        />
        <Menu.Item
          as={Link}
          to='/'
          name='Home'
          active={activeItem === 'Home'}
          onClick={() => setActiveItem('Home')}
        />
        <Menu.Item
          as={Link}
          to='/add-certificate'
          name='Add Certificate'
          active={activeItem === 'Add Certificate'}
          onClick={() => setActiveItem('Add Certificate')}
        />
      </Menu>
    </Segment>

  );
}

export default Navbar;