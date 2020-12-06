import React from 'react';
import { name, description, version, homepage } from '../../package.json';

const Header = () => {
  return (
    <header>
      <h1>
        {name}&nbsp;<small>v{version}</small>
      </h1>
      <h2>{description}</h2>
      <a href={homepage}>view docs on github</a>
    </header>
  );
};

export default Header;
