import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

export default {
  docs: [
    {
      label: '说说',
      type: 'category',
      link: {
        type: 'doc',
        id: 'hi/hi-guides',
      },
      items: [
        'hi/hi-config',
        'hi/hi-style',
        'hi/hi-component',
        'hi/hi-plugin',
        'hi/hi-search',
        'hi/hi-comment',
        'hi/hi-deploy',
      ],
    },
  ],
} satisfies SidebarsConfig
