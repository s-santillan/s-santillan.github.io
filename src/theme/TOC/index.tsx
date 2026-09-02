/**
 * Swizzled (eject) from @docusaurus/theme-classic.
 *
 * Upstream renders the TOC items straight into the sticky container. We add a
 * labelled toggle button and wrap the items in <Collapsible> so the desktop
 * TOC can be folded down to just its header. Collapse state is per-page: it
 * resets on navigation, matching upstream's mobile TOCCollapsible.
 *
 * Note: <Collapsible> writes `overflow` inline, so the scroll container has to
 * stay on the outer div (as upstream had it) rather than moving inside.
 */
import React, {type ReactNode, useId} from 'react';
import clsx from 'clsx';
import {Collapsible, useCollapsible} from '@docusaurus/theme-common';
import TOCItems from '@theme/TOCItems';
import type {Props} from '@theme/TOC';

import styles from './styles.module.css';

// Using a custom className
// This prevents TOCInline/TOCCollapsible getting highlighted by mistake
const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

export default function TOC({className, ...props}: Props): ReactNode {
  const {collapsed, toggleCollapsed} = useCollapsible({initialState: false});
  const contentId = useId();

  return (
    <div className={clsx(styles.tableOfContents, 'thin-scrollbar', className)}>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={!collapsed}
        aria-controls={contentId}
        onClick={toggleCollapsed}>
        On this page
        <svg
          className={clsx(styles.chevron, collapsed && styles.chevronCollapsed)}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <Collapsible lazy={false} collapsed={collapsed}>
        <div id={contentId}>
          <TOCItems
            {...props}
            linkClassName={LINK_CLASS_NAME}
            linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
          />
        </div>
      </Collapsible>
    </div>
  );
}
