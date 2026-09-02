import type {Config} from '@docusaurus/types';
import {flexokiDark, flexokiLight} from './src/prism/flexoki';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'I think therefore I communicate',
  tagline: '',
  favicon: 'img/favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://s-santillan.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 's-santillan', // Usually your GitHub org/user name.
  projectName: 's-santillan.github.io', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Google Fonts — Rubik. Self-hosting would avoid the third-party
  // request, but the CDN copy keeps the face identical across devices
  // (phones otherwise fall back to a local sans).
  headTags: [
    {
      tagName: 'link',
      attributes: {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
  ],

  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap',
    'https://fonts.googleapis.com/css2?family=Datatype:wght@100..900&display=swap',
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          // Content lives in posts/; served at /posts/*.
          path: 'posts',
          routeBasePath: 'posts',
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        // Blog disabled. The `blog/` directory is left in place; flip this
        // back to an options object to re-enable it.
        blog: false,
        theme: {
          // flexoki.css defines the raw palette; custom.css maps it onto Infima.
          customCss: ['./src/css/flexoki.css', './src/css/custom.css'],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/s-santillan-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'I think therefore I communicate',
      logo: {
        alt: 'I think therefore I communicate logo',
        src: 'img/favicon.png',
        // Only the backdrop panel differs: it tracks the page ground so it
        // stays invisible, the way the original white panel did on white.
        srcDark: 'img/favicon.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'postsSidebar',
          position: 'left',
          label: 'Posts',
        },
        {
          href: 'https://github.com/s-santillan',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    /* footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Posts',
              to: '/posts/otherworld-1',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    */
    prism: {
      theme: flexokiLight,
      darkTheme: flexokiDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
