import React from 'react';
import { name, description, version } from '../../package.json';
import GithubLogo from './github-logo';
import cleanPackageName from '../lib/clean-package-name';
import styles from './header.module.css';

const packageName = cleanPackageName(name);
export const githubUrl = `https://github.com/skratchdot/${packageName}/`;

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>
        {packageName}&nbsp;<small>v{version}</small>
      </h1>
      <h2>{description}</h2>
      <a className={styles.headerLink} href={githubUrl}>
        <GithubLogo />
        <br />
        view docs on github
      </a>
    </header>
  );
};

export default Header;
