import { useState } from 'react';
import { Icon } from './Icons';

/**
 * Image component that falls back gracefully when an image is unavailable.
 */
export default function ImageWithFallback({
  src,
  alt = 'Memory moment',
  className = '',
  title = '',
  aspectRatio = '4/3',
  type = 'photo',
  ...props
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const isPlaceholderArtwork = typeof src === 'string' && /\.svg(?:$|\?)/i.test(src);
  const showFallback = !src || hasError || isPlaceholderArtwork;

  return (
    <div
      className={`image-with-fallback ${className}`}
      style={{ aspectRatio }}
    >
      {!showFallback ? (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-contain transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          {...props}
        />
      ) : null}

      {showFallback && (
        <div className="image-placeholder" role="img" aria-label={`Photo placeholder: ${alt}`}>
          <div className="image-placeholder__paper">
            <span className="image-placeholder__icon">
              <Icon name={type === 'video' ? 'play' : 'camera'} size={23} color="currentColor" />
            </span>
            <span className="image-placeholder__title">
              {title || alt}
            </span>
            <span className="image-placeholder__note">
              Personal photo goes here
            </span>
          </div>
          <span className="image-placeholder__heart" aria-hidden="true">♡</span>
        </div>
      )}
    </div>
  );
}
