/**
 * Swizzled (eject) from @docusaurus/theme-classic.
 *
 * Only change vs. upstream: a `docSidebar` navbar item renders as a button
 * that moves the drawer forward onto the doc sidebar, instead of a link that
 * navigates to the sidebar's first doc. Every other item type is untouched.
 *
 * The forward move is only offered when there is something to move to
 * (`canOpenSidebar`). The doc sidebar's item tree only exists on doc pages —
 * global data carries just `{link: {path, label}}` per sidebar — so off a doc
 * page the item stays upstream's link.
 */
import React, {type ReactNode} from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import {useLayoutDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import NavbarItem, {type Props as NavbarItemConfig} from '@theme/NavbarItem';

type Props = {
  readonly canOpenSidebar: boolean;
  readonly onOpenSidebar: () => void;
};

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items as NavbarItemConfig[];
}

function DocSidebarForwardItem({
  sidebarId,
  docsPluginId,
  label,
  onClick,
}: {
  sidebarId: string;
  docsPluginId?: string;
  label?: string;
  onClick: () => void;
}) {
  // Same label fallback as upstream's DocSidebarNavbarItem.
  const sidebarLink = useLayoutDocsSidebar(sidebarId, docsPluginId).link;
  return (
    <li className="menu__list-item">
      <button
        type="button"
        className="clean-btn menu__link menu__link--sublist-caret navbar-sidebar__forward"
        onClick={onClick}>
        {label ?? sidebarLink.label}
      </button>
    </li>
  );
}

// The primary menu displays the navbar items
export default function NavbarMobilePrimaryMenu({
  canOpenSidebar,
  onOpenSidebar,
}: Props): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();

  // TODO how can the order be defined for mobile?
  // Should we allow providing a different list of items?
  const items = useNavbarItems();

  return (
    <ul className="menu__list">
      {items.map((item, i) =>
        item.type === 'docSidebar' && canOpenSidebar ? (
          <DocSidebarForwardItem
            sidebarId={item.sidebarId}
            docsPluginId={item.docsPluginId}
            label={item.label}
            onClick={onOpenSidebar}
            key={i}
          />
        ) : (
          <NavbarItem
            mobile
            {...item}
            onClick={() => mobileSidebar.toggle()}
            key={i}
          />
        ),
      )}
    </ul>
  );
}
