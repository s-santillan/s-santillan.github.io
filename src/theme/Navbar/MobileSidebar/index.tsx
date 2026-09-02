/**
 * Swizzled (eject) from @docusaurus/theme-classic.
 *
 * Two changes vs. upstream:
 *
 * 1. The `shouldRender` gate is dropped. Upstream computes
 *    `shouldRender = !disabled && windowSize === 'mobile'`, so the drawer
 *    never mounts on desktop. We keep the `disabled` check (no navbar items
 *    and no secondary menu => nothing to show) but render at every
 *    breakpoint. `.navbar__toggle` is un-hidden on desktop in custom.css.
 *
 * 2. This component owns which panel is showing, rather than reading
 *    `useNavbarSecondaryMenu().shown`. That hook exposes `hide` but no
 *    `show`, so upstream has no way to move *forward* into the doc sidebar —
 *    it only ever lands there as a side effect of content becoming available.
 *    Owning the state lets a `docSidebar` navbar item in the primary menu
 *    push the drawer forward. The effect below mirrors upstream's arming
 *    rule exactly, so opening the drawer on a post still goes straight to
 *    that post's list.
 *
 * Note: the provider still force-closes the drawer when the viewport crosses
 * into desktop, which only matters on resize.
 */
import React, {useEffect, useState, type ReactNode} from 'react';
import {
  useLockBodyScroll,
  useNavbarMobileSidebar,
  useNavbarSecondaryMenu,
} from '@docusaurus/theme-common/internal';
import NavbarMobileSidebarHeader from '@theme/Navbar/MobileSidebar/Header';
// Imported relatively, not through `@theme/*`: these three take props that
// upstream's declared types don't have.
import NavbarMobileSidebarLayout from './Layout';
import NavbarMobileSidebarPrimaryMenu from './PrimaryMenu';
import NavbarMobileSidebarSecondaryMenu from './SecondaryMenu';

export default function NavbarMobileSidebar(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();
  const secondaryMenu = useNavbarSecondaryMenu();
  useLockBodyScroll(mobileSidebar.shown);

  const hasSecondaryContent = secondaryMenu.content !== undefined;
  const [showSecondary, setShowSecondary] = useState(hasSecondaryContent);

  // Upstream's arming rule, on our own state: while the drawer is closed, the
  // secondary panel is pre-selected whenever there's contextual content, so
  // opening it on a doc page lands on the doc sidebar.
  useEffect(() => {
    if (!hasSecondaryContent) {
      setShowSecondary(false);
    } else if (!mobileSidebar.shown) {
      setShowSecondary(true);
    }
  }, [hasSecondaryContent, mobileSidebar.shown]);

  if (mobileSidebar.disabled) {
    return null;
  }
  return (
    <NavbarMobileSidebarLayout
      header={<NavbarMobileSidebarHeader />}
      primaryMenu={
        <NavbarMobileSidebarPrimaryMenu
          canOpenSidebar={hasSecondaryContent}
          onOpenSidebar={() => setShowSecondary(true)}
        />
      }
      secondaryMenu={
        <NavbarMobileSidebarSecondaryMenu
          onBack={() => setShowSecondary(false)}
        />
      }
      showSecondary={showSecondary}
    />
  );
}
