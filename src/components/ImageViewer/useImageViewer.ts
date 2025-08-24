import { useState, useCallback } from 'react';

interface ImageViewerState {
  isOpen: boolean;
  src: string;
  alt: string;
}

interface UseImageViewerReturn {
  isOpen: boolean;
  src: string;
  alt: string;
  openViewer: (src: string, alt?: string) => void;
  closeViewer: () => void;
}

export const useImageViewer = (): UseImageViewerReturn => {
  const [state, setState] = useState<ImageViewerState>({
    isOpen: false,
    src: '',
    alt: ''
  });

  const openViewer = useCallback((src: string, alt: string = '') => {
    setState({
      isOpen: true,
      src,
      alt
    });
  }, []);

  const closeViewer = useCallback(() => {
    setState(prev => ({
      ...prev,
      isOpen: false
    }));
  }, []);

  return {
    isOpen: state.isOpen,
    src: state.src,
    alt: state.alt,
    openViewer,
    closeViewer
  };
};

export default useImageViewer;