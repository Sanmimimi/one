import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

interface ImageViewerProps {
  src: string;
  alt?: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ src, alt = '', isOpen, onClose }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 重置图片状态
  const resetImage = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // 处理键盘事件
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case '+':
        case '=':
          e.preventDefault();
          setScale(prev => Math.min(prev * 1.2, 5));
          break;
        case '-':
          e.preventDefault();
          setScale(prev => Math.max(prev / 1.2, 0.1));
          break;
        case '0':
          e.preventDefault();
          resetImage();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, resetImage]);

  // 处理鼠标滚轮缩放
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale(prev => Math.max(0.1, Math.min(5, prev * delta)));
  }, []);

  // 处理鼠标拖拽
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === imageRef.current) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 放大
  const zoomIn = useCallback(() => {
    setScale(prev => Math.min(prev * 1.2, 5));
  }, []);

  // 缩小
  const zoomOut = useCallback(() => {
    setScale(prev => Math.max(prev / 1.2, 0.1));
  }, []);

  // 下载图片
  const downloadImage = useCallback(async () => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = alt || 'image';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('下载图片失败:', error);
    }
  }, [src, alt]);

  // 全屏切换
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // 监听全屏状态变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // 组件打开时重置状态
  useEffect(() => {
    if (isOpen) {
      resetImage();
    }
  }, [isOpen, resetImage]);

  if (!isOpen) return null;

  const viewer = (
    <div 
      ref={containerRef}
      className={styles.overlay}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* 高斯模糊背景 */}
      <div className={styles.blurBackground} />
      
      {/* 关闭按钮 */}
      <button className={styles.closeButton} onClick={onClose}>
        <Icon icon="mdi:close" width={24} height={24} />
      </button>

      {/* 工具栏 */}
      <div className={styles.toolbar}>
        <button className={styles.toolButton} onClick={zoomOut} title="缩小 (-)">
          <Icon icon="mdi:magnify-minus" width={20} height={20} />
        </button>
        <span className={styles.scaleText}>{Math.round(scale * 100)}%</span>
        <button className={styles.toolButton} onClick={zoomIn} title="放大 (+)">
          <Icon icon="mdi:magnify-plus" width={20} height={20} />
        </button>
        <button className={styles.toolButton} onClick={resetImage} title="重置 (0)">
          <Icon icon="mdi:refresh" width={20} height={20} />
        </button>
        <button className={styles.toolButton} onClick={downloadImage} title="下载">
          <Icon icon="mdi:download" width={20} height={20} />
        </button>
        <button className={styles.toolButton} onClick={toggleFullscreen} title="全屏 (F)">
          <Icon icon={isFullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"} width={20} height={20} />
        </button>
      </div>

      {/* 图片容器 */}
      <div 
        className={styles.imageContainer}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className={styles.image}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          draggable={false}
        />
      </div>

      {/* 操作提示 */}
      <div className={styles.hints}>
        <div>滚轮缩放 • 拖拽移动 • ESC关闭 • F全屏</div>
      </div>
    </div>
  );

  return createPortal(viewer, document.body);
};

export default ImageViewer;