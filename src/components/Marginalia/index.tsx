/**
 * Tufte-style sidenotes: notes set in the margin beside the text that
 * references them.
 *
 * Phase 4 — responsive collapse. Above 996px the note floats into the margin
 * and the marker is inert text; at or below 996px the note becomes a
 * disclosure and the marker becomes the control that opens it.
 *
 * Markup note: the note is a <span>, not an <aside>, even though <aside> is
 * what it means. A block-level element inside a <p> makes the HTML parser
 * close the paragraph early, which desynchronises SSR markup from React's
 * tree and breaks hydration. Floats compute `display: block` anyway, so the
 * span lays out identically; `role="note"` carries the semantics instead.
 * (Tufte CSS uses a span for the same reason.)
 *
 * The same constraint is why the collapsed note interrupts its paragraph at
 * the marker rather than opening beneath it: the node cannot be moved. Place
 * markers at the end of a sentence, since that is where the break lands.
 *
 * Both markers are rendered and CSS picks one. The alternative, choosing in
 * JS, means useWindowSize(), which returns 'ssr' on the first render
 * unconditionally — so it would buy a hydration branch and a flash of the
 * wrong marker, in exchange for one DOM node per note.
 *
 * The note sits immediately after its markers in the DOM, so screen-reader
 * order already matches reading order.
 */
import React, {useId, useState, type ReactNode} from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

type Props = {
  children: ReactNode;
  /** Extra class on the note box — e.g. a wider one holding a figure. */
  className?: string;
};

/** A numbered note. Increments the page counter. */
export function Sidenote({children, className}: Props): ReactNode {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span className={styles.anchor}>
      {/* Wide screens and print: inert, because the note is already visible.
          A button advertising aria-expanded there would describe a control
          that does nothing. */}
      <sup className={styles.marker} aria-hidden="true" />
      {/* Narrow screens: the real control. The name is static and repeats
          across notes — nothing requires accessible names to be unique, and
          the number lives in a CSS counter precisely so that React never has
          to know a note's index. */}
      <button
        type="button"
        className={styles.toggle}
        aria-label="Show note"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
      />
      <span
        id={id}
        role="note"
        className={clsx(styles.note, open && styles.isOpen, className)}>
        {children}
      </span>
    </span>
  );
}

/**
 * An unnumbered note — asides, glosses, figure captions.
 *
 * It renders no marker, so there is nothing for a reader to activate and it
 * cannot collapse to a disclosure. Below the breakpoint it simply falls into
 * flow as a visible block; the styles exempt it from the hidden-until-open
 * rule.
 */
export function MarginNote({children, className}: Props): ReactNode {
  return (
    <span>
      <span role="note" className={clsx(styles.note, styles.plain, className)}>
        {children}
      </span>
    </span>
  );
}
