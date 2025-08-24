import React from 'react';
import OriginalMDXContent from '@theme-original/MDXContent';
import type { Props } from '@theme/MDXContent';
import EnhancedImage from '@site/src/components/ImageViewer/EnhancedImage';

// MDX组件映射，将img标签替换为我们的EnhancedImage组件
const MDXComponents = {
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <EnhancedImage {...props} />
  ),
};

export default function MDXContent(props: Props): JSX.Element {
  return (
    <OriginalMDXContent {...props} components={MDXComponents} />
  );
}
