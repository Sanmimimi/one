import { useBlogPost } from '@docusaurus/plugin-content-blog/client'
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl'
import Link from '@docusaurus/Link'
import { cn } from '@site/src/lib/utils'
import type { Props } from '@theme/BlogPostItem/Container'

export default function BlogPostItemContainer({ children, className }: Props): JSX.Element {
  const { frontMatter, assets, metadata, isBlogPostPage } = useBlogPost()
  const { withBaseUrl } = useBaseUrlUtils()
  const image = assets.image ?? frontMatter.image
  const { permalink } = metadata

  // 如果是博客文章页面，不需要链接包装
  if (isBlogPostPage) {
    return (
      <article
        className={cn('relative px-4 pt-4 pb-3 lg:px-4', className)}
        itemProp="blogPost"
        itemScope
        itemType="http://schema.org/BlogPosting"
      >
        {image && (
          <>
            <meta itemProp="image" content={withBaseUrl(image, { absolute: true })} />
            <div className="z-1 absolute inset-0 h-[224px]">
              <div
                className="size-full rounded-[var(--ifm-pagination-nav-border-radius)] bg-cover bg-center bg-no-repeat"
                style={{
                  WebkitMaskImage: 'linear-gradient(180deg, #fff -17.19%, #00000000 92.43%)',
                  maskImage: 'linear-gradient(180deg, #fff -17.19%, #00000000 92.43%)',
                  backgroundImage: `url("${image}")`,
                }}
              />
            </div>
            <div style={{ height: '120px' }} />
          </>
        )}
        {children}
      </article>
    )
  }

  // 博客列表页面，整个卡片可点击
  return (
    <Link
      to={permalink}
      className="block no-underline hover:no-underline"
      itemProp="url"
    >
      <article
         className={cn('relative px-4 pt-4 pb-3 lg:px-4 cursor-pointer transition-transform hover:scale-[1.02]', className)}
         itemProp="blogPost"
         itemScope
         itemType="http://schema.org/BlogPosting"
       >
        {image && (
          <>
            <meta itemProp="image" content={withBaseUrl(image, { absolute: true })} />
            <div className="z-1 absolute inset-0 h-[224px]">
              <div
                className="size-full rounded-[var(--ifm-pagination-nav-border-radius)] bg-cover bg-center bg-no-repeat"
                style={{
                  WebkitMaskImage: 'linear-gradient(180deg, #fff -17.19%, #00000000 92.43%)',
                  maskImage: 'linear-gradient(180deg, #fff -17.19%, #00000000 92.43%)',
                  backgroundImage: `url("${image}")`,
                }}
              />
            </div>
            <div style={{ height: '120px' }} />
          </>
        )}
        {children}
      </article>
    </Link>
  )
}
