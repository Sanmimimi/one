import React, { createContext, useContext, ReactNode } from 'react';
import ImageViewer from './index';
import { useImageViewer } from './useImageViewer';

interface ImageViewerContextType {
  openViewer: (src: string, alt?: string) => void;
  closeViewer: () => void;
  isOpen: boolean;
}

const ImageViewerContext = createContext<ImageViewerContextType | undefined>(undefined);

interface ImageViewerProviderProps {
  children: ReactNode;
}

export const ImageViewerProvider: React.FC<ImageViewerProviderProps> = ({ children }) => {
  const { isOpen, src, alt, openViewer, closeViewer } = useImageViewer();

  const contextValue: ImageViewerContextType = {
    openViewer,
    closeViewer,
    isOpen
  };

  return (
    <ImageViewerContext.Provider value={contextValue}>
      {children}
      <ImageViewer
        src={src}
        alt={alt}
        isOpen={isOpen}
        onClose={closeViewer}
      />
    </ImageViewerContext.Provider>
  );
};

export const useImageViewerContext = (): ImageViewerContextType => {
  const context = useContext(ImageViewerContext);
  if (context === undefined) {
    throw new Error('useImageViewerContext must be used within an ImageViewerProvider');
  }
  return context;
};

export default ImageViewerProvider;