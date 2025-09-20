import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

export default {
  docs: [
    {
      label: '说说',
      type: 'category',
      link: {
        type: 'doc',
        id: 'hi/hi-nihao',
      },
      items: [
        'hi/hi-comment',
        
      ],          
    },
  ],
} satisfies SidebarsConfig
