/**
 * The overlay a contact sheet opens into.
 *
 * Phase 5 — complete.
 *
 * Two announcement details worth keeping. The visible counter reads "3 / 4",
 * which some screen readers voice as "three slash four", so it is marked
 * decorative and a visually-hidden live region carries the spoken form
 * instead. And that region stays empty until the reader actually pages: on
 * opening, the dialog's own label already names the image, and a region
 * populated on mount would say it twice.
 *
 * Built on the native <dialog> element, which supplies nearly all of it:
 * rendering in the top layer (so no z-index contest with the sticky navbar),
 * a ::backdrop to style, a focus trap, Escape to close, inertness of the page
 * behind, and focus returning to the thumbnail that opened it. The only gap is
 * background scroll, which useLockBodyScroll covers — the same hook the mobile
 * sidebar swizzle uses for the same reason.
 *
 * THE RULE: never render the `open` attribute from React state. React writing
 * `open` produces a NON-MODAL dialog — no top layer, no backdrop, no focus
 * trap, no inertness — while still appearing on screen and looking roughly
 * correct. State is the source of truth here and an effect syncs the DOM
 * through showModal()/close(), so the two can never disagree.
 */
import React, {useEffect, useRef, useState, type ReactNode} from 'react';
import clsx from 'clsx';
import {useLockBodyScroll} from '@docusaurus/theme-common/internal';

import type {GalleryImage} from './index';
import styles from './styles.module.css';

type Props = {
  images: GalleryImage[];
  /** Index of the image to show, or null when closed. */
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

export function Lightbox({
  images,
  index,
  onIndexChange,
  onClose,
}: Props): ReactNode {
  const ref = useRef<HTMLDialogElement>(null);
  const isOpen = index !== null;
  const canPage = images.length > 1;

  // Gates the live region: nothing is announced until the reader moves.
  const [hasPaged, setHasPaged] = useState(false);

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) {
      setHasPaged(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) {
      return;
    }
    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Escape closes the dialog without going through React, so the DOM would
  // otherwise be closed while state still said open — and the next click on
  // the same tile would set an index it already held and open nothing.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) {
      return undefined;
    }
    dialog.addEventListener('close', onClose);
    return () => dialog.removeEventListener('close', onClose);
  }, [onClose]);

  const image = index === null ? undefined : images[index];
  const last = images.length - 1;

  const goTo = (next: number) => {
    setHasPaged(true);
    onIndexChange(next);
  };

  // Paging wraps at both ends. With at most four images, someone who reaches
  // the end wants the other end rather than a key that does nothing.
  const step = (delta: number) => {
    if (index === null) {
      return;
    }
    goTo((index + delta + images.length) % images.length);
  };

  const position =
    index === null ? '' : `Image ${index + 1} of ${images.length}`;

  // The dialog names itself by what it holds, falling back to position for the
  // same reason the tile buttons do: a filename is not a description.
  const dialogLabel = image?.alt || (canPage ? position : 'Image');

  return (
    <dialog
      ref={ref}
      className={styles.lightbox}
      aria-label={dialogLabel}
      // The dialog box fills the viewport and the frame inside it is only as
      // large as its contents, so a click that lands on the dialog itself is a
      // click outside the image. Comparing against currentTarget keeps clicks
      // on the image, the caption or the controls from dismissing.
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      // Focus is trapped inside the dialog, so a handler here catches every
      // key without a global listener. Escape is left to the browser.
      onKeyDown={(event) => {
        if (index === null) {
          return;
        }
        if (event.key === 'ArrowLeft' && canPage) {
          event.preventDefault();
          step(-1);
        } else if (event.key === 'ArrowRight' && canPage) {
          event.preventDefault();
          step(1);
        } else if (event.key === 'Home' && canPage) {
          event.preventDefault();
          goTo(0);
        } else if (event.key === 'End' && canPage) {
          event.preventDefault();
          goTo(last);
        }
      }}>
      {image ? (
        <>
          <div className={styles.frame}>
            <img
              className={styles.full}
              src={image.src}
              alt={image.alt ?? ''}
              decoding="async"
            />
            {/* Omitted entirely rather than rendered empty: a sheet of one
                image needs no counter, and an image with no alt has no
                caption to show. */}
            {image.alt || canPage ? (
              <div className={styles.meta}>
                {image.alt ? (
                  <p className={styles.caption}>{image.alt}</p>
                ) : null}
                {canPage ? (
                  // Decorative: the same information reaches assistive tech
                  // through the live region below, in a form that reads aloud.
                  <p className={styles.counter} aria-hidden="true">
                    {index + 1} / {images.length}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>

          {canPage ? (
            <>
              <button
                type="button"
                className={clsx(styles.nav, styles.prev)}
                onClick={() => step(-1)}
                aria-label="Previous image">
                <Chevron direction="left" />
              </button>
              <button
                type="button"
                className={clsx(styles.nav, styles.next)}
                onClick={() => step(1)}
                aria-label="Next image">
                <Chevron direction="right" />
              </button>
            </>
          ) : null}

          {canPage ? (
            <p className={styles.announcement} aria-live="polite">
              {hasPaged
                ? [image.alt, position].filter(Boolean).join('. ')
                : ''}
            </p>
          ) : null}

          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </>
      ) : null}
    </dialog>
  );
}

function Chevron({direction}: {direction: 'left' | 'right'}): ReactNode {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <path
        d={direction === 'left' ? 'M14 4L7 11l7 7' : 'M8 4l7 7-7 7'}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
