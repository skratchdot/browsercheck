import React from 'react';
import { name, description, version, homepage } from '../../package.json';
import GithubLogo from './github-logo';
import cleanPackageName from '../lib/clean-package-name';
import styles from './header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>
        {cleanPackageName(name)}&nbsp;<small>v{version}</small>
      </h1>
      <h2>{description}</h2>
      <a className={styles.headerLink} href={homepage}>
        <GithubLogo />
        <br />
        view docs on github
      </a>
    </header>
  );
};

export default Header;
