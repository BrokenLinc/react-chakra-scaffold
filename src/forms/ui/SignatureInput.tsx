import * as UI from '@chakra-ui/react';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import SignaturePad, {
  ReactSignatureCanvasProps,
} from 'react-signature-canvas';

/**
 * A "signature canvas" input that uses a dataUrl (string) as its value.
 * Note: You can make this component "fluid" but the canvas size will constantly be fluctuating.
 * This means the canvas will constantly be erased, and resulting images will be inconsistent sizes.
 * The default dimensions are meant to fit in a variety of devices.
 */

export type SignatureInputProps = ReactSignatureCanvasProps & {
  onChange?: (dataUrl: string | undefined) => any;
  value?: string;
  width?: number;
  height?: number;
  basic?: boolean;
};
export const SignatureInput: React.FC<SignatureInputProps> = ({
  onChange,
  value,
  width = 350,
  height = 80,
  basic,
  ...restProps
}) => {
  let signatureCanvasRef = React.useRef<SignaturePad>(null);

  // Push new value to canvas when value changes
  React.useEffect(() => {
    // Exit if the value is already on the canvas
    if (value === signatureCanvasRef.current?.toDataURL()) return;

    // Always clear previous value (otherwise transparent images will stack)
    signatureCanvasRef.current?.clear();
    if (value) {
      signatureCanvasRef.current?.fromDataURL(value, { ratio: 1 });
    }
  }, [value]);

  // Call onChange when the user stops drawing
  const handleSignaturePadEnd = () => {
    const dataString = signatureCanvasRef.current?.toDataURL();
    onChange?.(dataString);
  };

  // When clearing, also call onChange
  const clearValue = () => {
    onChange?.(undefined);
    signatureCanvasRef.current?.clear();
  };

  if (basic) {
    return (
      <SignaturePad
        {...restProps}
        ref={signatureCanvasRef}
        onEnd={handleSignaturePadEnd}
        clearOnResize={false}
        canvasProps={{
          width,
          height,
          ...restProps.canvasProps,
        }}
      />
    );
  }

  return (
    <UI.Box w={`${width}px`}>
      <SignaturePad
        {...restProps}
        ref={signatureCanvasRef}
        onEnd={handleSignaturePadEnd}
        clearOnResize={false}
        canvasProps={{
          width,
          height,
          style: {
            backgroundColor: '#edf2f7',
            borderBottom: '1px solid currentcolor',
          },
          ...restProps.canvasProps,
        }}
      />
      <UI.HStack justifyContent="space-between">
        <UI.Text color="gray.600" fontSize="sm" mt="6px">
          Sign here
        </UI.Text>
        <UI.Button
          variant="link"
          colorScheme="purple"
          size="sm"
          onClick={clearValue}
        >
          <FontAwesomeIcon icon={faEraser} />
          <UI.Text ml={1}>Clear</UI.Text>
        </UI.Button>
      </UI.HStack>
    </UI.Box>
  );
};
