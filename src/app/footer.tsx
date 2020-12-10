import React from 'react';
import { name, description } from '../../package.json';
import GithubLogo from './github-logo';
import cleanPackageName from '../lib/clean-package-name';
import { githubUrl } from './header';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Thanks for visiting!</p>
      <p>
        <a className={styles.footerLink} href={githubUrl}>
          {cleanPackageName(name)}
        </a>
        &nbsp; is {description}
      </p>
      <p>
        <a href={githubUrl}>
          <GithubLogo />
        </a>
      </p>
      <p>
        Copyright &copy; {new Date().getFullYear()}
        <br />
        <a className={styles.footerLink} href="https://www.skratchdot.com/">
          skratchdot.com
        </a>
      </p>
    </footer>
  );
};

export default Footer;
