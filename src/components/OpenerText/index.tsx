/**
 * OpenerText — the opening paragraph of a post, set larger than body copy.
 *
 * Renders a <p>, so it behaves like any other paragraph: same flow, same
 * margins, same measure. Only the size differs, and the weight stays normal —
 * this is a paragraph that happens to be large, not a heading.
 *
 * The size is --ifm-h4-font-size, Infima's own token, raised from its stock
 * 1rem to 1.25rem in custom.css. Stock would have rendered this identically to
 * body text: 1rem is 18px here, and `.markdown` enlarges only h1, h2 and h3.
 */
import React, {type ReactNode} from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

type Props = {
  children: ReactNode;
  className?: string;
};

export function OpenerText({children, className}: Props): ReactNode {
  return <p className={clsx(styles.opener, className)}>{children}</p>;
}
