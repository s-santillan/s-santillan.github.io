/**
 * Contact Sheet — up to four images as a grid of CSS-sized thumbnails,
 * opening into a lightbox.
 *
 * Phase 5 — complete.
 *
 * No thumbnails are generated. A tile is the original file, cropped to the
 * tile ratio by `object-fit: cover` and scaled down by the browser. That costs
 * full-size bytes for a small picture, which is the accepted trade, and buys
 * one thing back — the full image is already decoded by the time anyone opens
 * the lightbox, so it appears with no request and no placeholder.
 *
 * A gallery inside a <Sidenote> is unsupported and deliberately undetected:
 * a grid inside a paragraph breaks hydration, and the block-level grid has no
 * business in a marginal note anyway.
 *
 * Images are a prop rather than children. The natural-looking MDX form,
 * markdown images written inside <Gallery>…</Gallery>, arrives as
 * <p><img></p> nodes rather than images, and whether it does depends on the
 * blank lines around them. Reading `props.src` off whatever shape turned up is
 * brittle in the way that fails on one post and not another.
 */
import React, {useState, type CSSProperties, type ReactNode} from 'react';
import clsx from 'clsx';

import {Lightbox} from './Lightbox';
import styles from './styles.module.css';

export type GalleryImage = {
  /** Path under `static/`, e.g. `/img/gs1-dialog.png`. Served verbatim. */
  src: string;
  /** Describes the image. Empty or missing falls back to a positional name. */
  alt?: string;
};

type Props = {
  images: GalleryImage[];
  /**
   * Tile aspect ratio, as any valid CSS `aspect-ratio` value. Defaults to
   * `16 / 9`, which matches the screenshots exactly. A sheet of nothing but
   * portrait art can pass something taller to stop cropping it.
   */
  ratio?: string;
  className?: string;
};

export function Gallery({images, ratio, className}: Props): ReactNode {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Dev-only, and on the same principle as the sidenote frontmatter warning:
  // the page still renders, the author is told. A sheet of five falls back to
  // the two-column rule, which is a reasonable picture and a silent departure
  // from the four the layouts are drawn for.
  if (process.env.NODE_ENV === 'development' && images.length > 4) {
    console.warn(
      `[contact sheet] a gallery has ${images.length} images; the layouts are ` +
        `defined for 1-4 and this falls back to two columns. ` +
        `First image: ${images[0]?.src}`,
    );
  }

  return (
    <>
      {/* The count drives the column rule from CSS rather than being computed
          here, so the layout stays inspectable in the stylesheet. */}
      <div
        className={clsx(styles.sheet, className)}
        data-count={images.length}
        style={ratio ? ({'--gal-ratio': ratio} as CSSProperties) : undefined}>
        {images.map((image, index) => (
          <button
            // src alone is not a safe key: a sheet may legitimately repeat one.
            key={`${index}:${image.src}`}
            type="button"
            className={styles.tile}
            onClick={() => setOpenIndex(index)}
            // A button whose only content is an image has no accessible name,
            // and most images in posts/ still have no alt. The positional
            // fallback is useless in the same way the content is, rather than
            // pretending: a filename like gs1_wall3_1366x768-1.jpg reads as a
            // description while carrying none.
            aria-label={
              image.alt || `View image ${index + 1} of ${images.length}`
            }>
            <img
              className={styles.tileImage}
              src={image.src}
              // Decorative here: the button carries the name, so announcing
              // the image too would say everything twice.
              alt=""
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>

      <Lightbox
        images={images}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </>
  );
}
