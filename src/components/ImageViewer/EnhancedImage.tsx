import React from 'react';
import ImageViewer from './index';
import { useImageViewer } from './useImageViewer';
import styles from './EnhancedImage.module.css';

interface EnhancedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  className?: string;
  enableViewer?: boolean;
}

const EnhancedImage: React.FC<EnhancedImageProps> = ({ 
  src, 
  alt = '', 
  className = '', 
  enableViewer = true,
  onClick,
  ...props 
}) => {
  const { isOpen, src: viewerSrc, alt: viewerAlt, openViewer, closeViewer } = useImageViewer();

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (enableViewer) {
      e.preventDefault();
      openViewer(src, alt);
    }
    
    // 如果有自定义的onClick处理函数，也要调用它
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <>
      <img
        {...props}
        src={src}
        alt={alt}
        className={`${enableViewer ? styles.clickableImage : ''} ${className}`}
        onClick={handleClick}
      />
      
      {enableViewer && (
        <ImageViewer
          src={viewerSrc}
          alt={viewerAlt}
          isOpen={isOpen}
          onClose={closeViewer}
        />
      )}
    </>
  );
};

export default EnhancedImage;