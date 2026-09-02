/**
 * Swizzled (eject) from @docusaurus/theme-classic.
 *
 * Upstream picks Desktop vs. Mobile by `useWindowSize()`. Since the desktop
 * sidebar container is hidden at every breakpoint (see custom.css), we always
 * render the Mobile variant instead: it renders nothing itself, it just fills
 * the navbar drawer's secondary menu with the sidebar items. Result: the doc
 * sidebar contents live in the hamburger drawer at every breakpoint.
 */
import React, {type ReactNode} from 'react';
import DocSidebarMobile from '@theme/DocSidebar/Mobile';
import type {Props} from '@theme/DocSidebar';

export default function DocSidebar(props: Props): ReactNode {
  return <DocSidebarMobile {...props} />;
}
