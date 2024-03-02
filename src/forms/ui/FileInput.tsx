import * as UI from '@chakra-ui/react';
import { useRef } from 'react';

export type FileInputProps = Omit<UI.InputProps, 'value' | 'onChange'> & {
  value?: FileList | null;
  onChange?: (files?: FileList | null) => any;
};

/**
 * A file input that masks the raw HTML5 input[type=file] with
 * Chakra UI's Input component.
 * It expects a FileList as its value, and emits a FileList.
 */
export const FileInput = (props: FileInputProps) => {
  const { children, accept, multiple, value, onChange, ...restProps } = props;
  const isEditable = !restProps.isDisabled && !restProps.isReadOnly;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleBrowseClick = () => {
    // simulate a click on the hidden file input
    inputRef.current?.click();
  };

  const handleClearClick = () => {
    if (inputRef.current) {
      // clear the input so that onChange will fire again if the same file is re-selected
      inputRef.current.value = '';
    }
    props.onChange?.();
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    // onChange will be called with undefined if the user cancels the file selection dialog
    if (e.target.files?.length) {
      onChange?.(e.target.files);
    }
  };

  return (
    <UI.InputGroup>
      {/* This fake input simply shows the file list label, and gives the user something pretty to click on. */}
      <UI.Input
        cursor="pointer"
        onClick={handleBrowseClick}
        placeholder="Browse..."
        value={getFilesLabel(value)}
        textOverflow="ellipsis"
        {...restProps}
        isReadOnly
      />
      {value && isEditable ? (
        <UI.InputRightElement>
          <UI.CloseButton aria-label="Remove file" onClick={handleClearClick} />
        </UI.InputRightElement>
      ) : null}

      {/* This hidden file input applies the file selection rules and opens the system dialog. */}
      <input
        ref={inputRef}
        type="file"
        hidden
        onChange={handleInputChange}
        accept={accept}
        multiple={multiple}
      />
    </UI.InputGroup>
  );
};

const getFilesLabel = (fileList?: FileList | null) => {
  if (!fileList) {
    return '';
  }

  const count = fileList.length;
  if (count === 1) {
    return fileList[0].name;
  }
  return `${count} files selected`;
};
