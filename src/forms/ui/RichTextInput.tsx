import * as UI from '@@ui';
import { Editor, IAllProps } from '@tinymce/tinymce-react';
import React from 'react';

const apiKey = import.meta.env.VITE_TINY_MCE_API_KEY;

/**
 * A wrapper for the TinyMCE Editor component.
 */
export type RichTextInputProps = IAllProps & {};
export const RichTextInput: React.FC<RichTextInputProps> = (props) => {
  return (
    <UI.Box w="full">
      <Editor
        apiKey={apiKey}
        init={{
          width: '100%',
        }}
        {...props}
      />
    </UI.Box>
  );
};
