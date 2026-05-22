/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to rich text input component.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 06/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */

import {
  MenuButtonBlockquote,
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonCode,
  MenuButtonCodeBlock,
  MenuButtonEditLink,
  MenuButtonHorizontalRule,
  MenuButtonIndent,
  MenuButtonItalic,
  MenuButtonOrderedList,
  MenuButtonRedo,
  MenuButtonRemoveFormatting,
  MenuButtonStrikethrough,
  MenuButtonUnderline,
  MenuButtonUndo,
  MenuButtonUnindent,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  isTouchDevice,
} from 'mui-tiptap';

/**
 * @description Component to render menu controls for rich text editor.
 * @returns {JSX.Element}
 */
export default function EditorMenuControls() {
  return (
    <MenuControlsContainer>
      <MenuDivider />

      <MenuSelectHeading />

      <MenuDivider />

      <MenuButtonBold />

      <MenuButtonItalic />

      <MenuButtonUnderline />

      <MenuButtonStrikethrough />

      <MenuDivider />

      <MenuButtonEditLink />

      <MenuDivider />

      <MenuButtonOrderedList />

      <MenuButtonBulletedList />

      {/* On touch devices, we'll show indent/unindent buttons, since they're
      unlikely to have a keyboard that will allow for using Tab/Shift+Tab. These
      buttons probably aren't necessary for keyboard users and would add extra
      clutter. */}
      {isTouchDevice() && (
        <>
          <MenuButtonIndent />

          <MenuButtonUnindent />
        </>
      )}

      <MenuDivider />

      <MenuButtonBlockquote />

      <MenuDivider />

      <MenuButtonCode />

      <MenuButtonCodeBlock />

      <MenuDivider />

      <MenuButtonHorizontalRule />

      <MenuDivider />

      <MenuButtonRemoveFormatting />

      <MenuDivider />

      <MenuButtonUndo />
      <MenuButtonRedo />
    </MenuControlsContainer>
  );
}
