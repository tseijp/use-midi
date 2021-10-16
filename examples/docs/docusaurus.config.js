/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'use-midi 🖖',
  tagline: 'use-midi are cool',
  url: 'https://tseijp.github.io',
  baseUrl: '/use-midi/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'tseijp',
  projectName: 'use-midi',
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/vsDark'),
    },
    navbar: {
      title: 'use midi 🖖',
      items: [
        {type: 'doc', docId: 'intro', position: 'left', label: 'Documents'},
        {to: '/examples/intro', label: 'Examples', position: 'left'},
        {
          href: 'https://github.com/tseijp/use-midi',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Pages',
          items: [
            {label: 'Docs', to: '/documents/intro'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/use-midi'},
            {label: 'Twitter', href: 'https://twitter.com/tseijp'},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'GitHub', href: 'https://github.com/tseijp/use-midi'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'documents',
          routeBasePath: 'documents',
          // sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/tseijp/use-midi/edit/master/examples/',
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'examples',
        path: 'examples',
        routeBasePath: 'examples',
      },
    ],
  ],
};
