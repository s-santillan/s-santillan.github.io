import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {HtmlClassNameProvider} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero--primary', styles.heroBanner)}>
      <div className="container">
        <p className="hero__subtitle">{siteConfig.title}</p>
        <p>Sara Santillan</p>
        <p><a href ='posts/tags/ux-writing'>UX Writer</a> | <a href ='posts/tags/technical-writing'>Tech Writer</a></p>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    // Stamps `landing-page` on <html>, which custom.css uses to hide the
    // navbar. On <html> rather than Layout's `wrapperClassName`, because that
    // class lands on a sibling of <nav class="navbar">, not an ancestor.
    <HtmlClassNameProvider className="landing-page">
      <Layout
        title={`${siteConfig.title}`}
        description="Portfolio site of Sara Santillan<head />">
        <HomepageHeader />
        <main>
        <div className="container">
          <div className="row"><div className="col text--center">
            <h2 text--center>Portfolio</h2>
          </div></div>
          <div className="row">
            <div className="col text--center">
              <h5 className="text--normal"><sub>2010-2014</sub><br />PC Game Dev</h5>
              <p><a href='posts/otherworld1'>Otherworld: Spring of Shadows</a></p>
              <p><a href='posts/otherworld2'>Otherworld: Omens of Summer</a></p>
              <p><a href='posts/otherworld3'>Otherworld: Shades of Fall</a></p>
              <p><a href='posts/awakening7'>Awakening: The Golden Age</a></p>
            </div>
            <div className="col text--center">
              <h5 className="text--normal"><sub>2015-2019</sub><br />Mobile & Web Dev</h5>
              <p><a href='posts/monster-roller'>Monster Roller</a></p>
              <p><a href='posts/maria-health'>Maria Health</a></p>
              <p><a href='posts/relentless'>Relentless</a></p>
            </div>
            <div className="col text--center">
              <h5 className="text--normal"><sub>2020-2026</sub><br />UX & Tech Writing</h5>
              <p><a href='posts/freelance-projects'>Selected Projects</a></p>
            </div>
          </div>
          <div className="row">
            <div className="col text--center">
          {/*<img height='15px' width="128px" src="/img/fleuron1.png" /> */}
              <hr />
              <h2>Posts</h2>
              <p><a href='posts/microcopy-is-a-goldmine'>Microcopy is a goldmine, and sometimes a minefield</a></p>
              {/*<p><a href='posts/microcopy-is-a-goldmine'>The language necessary to drive Claude</a></p> */}
              <p>The language you need to drive Claude<br /><sup>[COMING SOON]</sup></p>
            </div>
          </div>
          <div className="row">
            <div className="col text--center">
          {/*<img height='15px' width="128px" src="/img/fleuron1.png" /> */}
              <hr />
              <h2>Links</h2>
              <p><a href='https://www.linkedin.com/in/sara-s-0463a032/'>LinkedIn</a></p>
             <p><a href='https://github.com/s-santillan'>GitHub</a></p>
            </div>
          </div>
        </div>
        </main>
      </Layout>
    </HtmlClassNameProvider>
  );
}
