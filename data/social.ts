export type Social = {
  github?: string
  x?: string
  juejin?: string
  qq?: string
  wx?: string
  cloudmusic?: string
  zhihu?: string
  email?: string
  discord?: string
  douyin?: string
  weibo?: string
  bilibili?: string
  xiaohongshu?: string
}

type SocialValue = {
  href?: string
  title: string
  icon: string
  color: string
}

const social: Social = {
  github: 'https://github.com/kuizuo',
  x: 'https://twitter.com/kuizuo',
  juejin: 'https://juejin.cn/user/1565318510545901',
  wx: 'https://img.kuizuo.me/wechat.png',
  // qq: 'https://img.kuizuo.me/qq.png',
  zhihu: 'https://www.zhihu.com/people/kuizuo',
  cloudmusic: 'https://music.163.com',
  email: 'mailto:hi@kuizuo.me',
  discord: 'https://discord.gg/M8cVcjDxkz',
  douyin: 'https://www.douyin.com',
  weibo: 'https://weibo.com',
  bilibili: 'https://space.bilibili.com',
  xiaohongshu: 'https://www.xiaohongshu.com',
}

const socialSet: Record<keyof Social | 'rss', SocialValue> = {
   weibo: {
    href: social.weibo,
    title: '微博',
    icon: 'ri:weibo-line',
    color: '#E6162D',
  },
  ilibili: {
    href: social.bilibili,
    title: '哔哩哔哩',
    icon: 'ri:bilibili-line',
    color: '#00AEEC',
  },
  douyin: {
    href: social.douyin,
    title: '抖音',
    icon: 'simple-icons:tiktok',
    color: '#FF0050',    
  },
  xiaohongshu: {
    href: social.xiaohongshu,
    title: '小红书',
    icon: 'ri:book-line',
    color: '#FF2442',
  },
  wx: {
    href: social.wx,
    title: '微信',
    icon: 'ri:wechat-2-line',
    color: '#07c160',
  },
  qq: {
    href: social.qq,
    title: 'QQ',
    icon: 'ri:qq-line',
    color: '#1296db',
  },
  zhihu: {
    href: social.zhihu,
    title: '知乎',
    icon: 'ri:zhihu-line',
    color: '#1772F6',
  },
  cloudmusic: {
    href: social.cloudmusic,
    title: '网易云',
    icon: 'ri:netease-cloud-music-line',
    color: '#C20C0C',
  },
  juejin: {
    href: social.juejin,
    title: '掘金',
    icon: 'simple-icons:juejin',
    color: '#1E81FF',  
  },
  email: {
    href: social.email,
    title: '邮箱',
    icon: 'ri:mail-line',
    color: '#D44638',
 },
  github: {
    href: social.github,
    title: 'GitHub',
    icon: 'ri:github-line',
    color: '#010409',
 },
  x: {
    href: social.x,
    title: 'X',
    icon: 'ri:twitter-x-line',
    color: '#000',   
 },
  discord: {
    href: social.discord,
    title: 'Discord',
    icon: 'ri:discord-line',
    color: '#5A65F6',  
 },
  rss: {
    href: '/blog/rss.xml',
    title: 'RSS',
    icon: 'ri:rss-line',
    color: '#FFA501',
  },
}

export default socialSet
