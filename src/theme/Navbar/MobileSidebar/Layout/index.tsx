/**
 * Swizzled (eject) from @docusaurus/theme-classic.
 *
 * Only change vs. upstream: which panel is showing comes in as a prop instead
 * of from `useNavbarSecondaryMenu().shown`. That hook exposes `hide` but no
 * `show`, so there is no supported way to move *forward* into the secondary
 * panel — upstream only ever gets there as a side effect of content becoming
 * available. MobileSidebar/index.tsx owns the state instead; see the note
 * there.
 */
import React, {version, type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import type {Props as UpstreamProps} from '@theme/Navbar/MobileSidebar/Layout';

type Props = UpstreamProps & {
  readonly showSecondary: boolean;
};

// TODO Docusaurus v4: remove temporary inert workaround
//  See https://github.com/facebook/react/issues/17157
//  See https://github.com/radix-ui/themes/pull/509
function inertProps(inert: boolean) {
  const isBeforeReact19 = parseInt(version!.split('.')[0]!, 10) < 19;
  if (isBeforeReact19) {
    // TODO Docusaurus v4: remove temporary inert workaround
    return {inert: inert ? '' : undefined} as unknown as {inert: boolean};
  }
  return {inert};
}

function NavbarMobileSidebarPanel({
  children,
  inert,
}: {
  children: ReactNode;
  inert: boolean;
}) {
  return (
    <div
      className={clsx(
        ThemeClassNames.layout.navbar.mobileSidebar.panel,
        'navbar-sidebar__item menu',
      )}
      {...inertProps(inert)}>
      {children}
    </div>
  );
}

export default function NavbarMobileSidebarLayout({
  header,
  primaryMenu,
  secondaryMenu,
  showSecondary,
}: Props): ReactNode {
  return (
    <div
      className={clsx(
        ThemeClassNames.layout.navbar.mobileSidebar.container,
        'navbar-sidebar',
      )}>
      {header}
      <div
        className={clsx('navbar-sidebar__items', {
          'navbar-sidebar__items--show-secondary': showSecondary,
        })}>
        <NavbarMobileSidebarPanel inert={showSecondary}>
          {primaryMenu}
        </NavbarMobileSidebarPanel>
        <NavbarMobileSidebarPanel inert={!showSecondary}>
          {secondaryMenu}
        </NavbarMobileSidebarPanel>
      </div>
    </div>
  );
}
