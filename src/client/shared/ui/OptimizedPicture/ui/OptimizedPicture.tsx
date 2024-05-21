import cn from 'classnames';
import type { ReactNode } from 'react';

import { isProduction } from 'shared/lib/isProduction';

import styles from './OptimizedPicture.module.scss';

type TFit = 'cover' | 'contain' | 'scale-down' | 'crop' | 'pad';

interface IOptimizedPicture {
  img: ReactNode;
  alt: string;
  fit?: TFit;
  width?: number;
  height?: number;
  cropWidth?: number;
  cropHeight?: number;
  imgClassName?: string | undefined;
  quality?: number;
  isJpeg?: boolean;
}

export const OptimizedPicture: FC<IOptimizedPicture> = ({
  className,
  img,
  alt,
  fit = 'cover',
  width,
  height,
  cropWidth,
  cropHeight,
  quality = 95,
  imgClassName,
  isJpeg,
  ...otherProps
}) => {
  const link = 'https://sravni.ru/cdn-cgi/image';

  const widthImage = cropWidth || width ? `width=${cropWidth || width},` : '';
  const heightImage = cropHeight || height ? `height=${cropHeight || height},` : '';
  const imgFormat = isJpeg ? 'jpeg' : 'png';
  const isProd = isProduction();

  return (
    <picture
      {...otherProps}
      className={className}
    >
      {isProd && (
        <source
          srcSet={`${link}/quality=${quality},${widthImage}${heightImage}format=avif,fit=${fit}/${img}`}
          type="image/avif"
        />
      )}
      {isProd && (
        <source
          srcSet={`${link}/quality=${quality},${widthImage}${heightImage}format=webp,fit=${fit}/${img}`}
          type="image/webp"
        />
      )}

      <img
        className={cn(imgClassName, styles.img)}
        style={{ width, height }}
        alt={alt}
        src={
          isProd
            ? `${link}/quality=${quality},${widthImage}${heightImage}format=${imgFormat},fit=${fit}/${img}`
            : `${img}`
        }
        loading="lazy"
      />
    </picture>
  );
};
