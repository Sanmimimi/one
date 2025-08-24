import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import MDXContent from '@theme-original/MDXContent';
import { EnhancedImage } from '@site/src/components/ImageViewer/EnhancedImage';

// MDX组件映射，将img标签替换为我们的EnhancedImage组件
const MDXComponents = {
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <EnhancedImage {...props} />
  ),
};

export default function MDXContentWrapper(props: any): JSX.Element {
  return (
    <MDXProvider components={MDXComponents}>
      <MDXContent {...props} />
    </MDXProvider>
  );
}