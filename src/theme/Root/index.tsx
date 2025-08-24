import React from 'react';
import { ImageViewerProvider } from '@site/src/components/ImageViewer/ImageViewerProvider';

// Root组件是Docusaurus应用的最顶层组件
// 在这里集成ImageViewerProvider，使其在整个应用中可用
export default function Root({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <ImageViewerProvider>
      {children}
    </ImageViewerProvider>
  );
}