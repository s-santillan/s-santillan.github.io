/**
 * Swizzled (eject) from @docusaurus/theme-classic.
 *
 * Only change vs. upstream: the back button calls the `onBack` prop instead of
 * `useNavbarSecondaryMenu().hide()`, because MobileSidebar/index.tsx owns
 * which panel is showing. The panel *content* still comes from upstream's
 * secondary-menu portal, which DocSidebar/Mobile fills.
 */
import React, {type ComponentProps, type ReactNode} from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {useNavbarSecondaryMenu} from '@docusaurus/theme-common/internal';
import Translate from '@docusaurus/Translate';

type Props = {
  readonly onBack: () => void;
};

function SecondaryMenuBackButton(props: ComponentProps<'button'>) {
  return (
    <button {...props} type="button" className="clean-btn navbar-sidebar__back">
      <Translate
        id="theme.navbar.mobileSidebarSecondaryMenu.backButtonLabel"
        description="The label of the back button to return to main menu, inside the mobile navbar sidebar secondary menu (notably used to display the docs sidebar)">
        ← Back to main menu
      </Translate>
    </button>
  );
}

// The secondary menu slides from the right and shows contextual information
// such as the docs sidebar
export default function NavbarMobileSidebarSecondaryMenu({
  onBack,
}: Props): ReactNode {
  const isPrimaryMenuEmpty = useThemeConfig().navbar.items.length === 0;
  const secondaryMenu = useNavbarSecondaryMenu();
  return (
    <>
      {/* edge-case: prevent returning to the primaryMenu when it's empty */}
      {!isPrimaryMenuEmpty && <SecondaryMenuBackButton onClick={onBack} />}
      {secondaryMenu.content}
    </>
  );
}
