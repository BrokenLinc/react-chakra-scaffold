import { resizeAndCropProportionally } from '@@helpers/imageHelpers';
import * as UI from '@@ui';
import _ from 'lodash';
import React from 'react';
import { useMediaDevices } from 'react-use';
import Webcam from 'react-webcam';
import UAParser from 'ua-parser-js';

/**
 * A custom form input that allows the user to take a photo with their camera.
 */

const getFriendlyErrorMessage = (error: string) => {
  if (['NotFoundError', 'DevicesNotFoundError'].includes(error)) {
    return "We couldn't find a camera to take the photo. Make sure your camera is connected and turned on, and try again.";
  }

  if (['NotReadableError', 'TrackStartError'].includes(error)) {
    return 'It looks like your camera may be in use by another app. Close any other apps that may be using your camera and try again.';
  }

  if (
    [
      'OverconstrainedError',
      'ConstraintNotSatisfiedError',
      'TypeError',
    ].includes(error)
  ) {
    return "It looks like your camera isn't compatible with this site. You can try switching your camera below, or you can try again.";
  }

  if (
    [
      'NotAllowedError',
      'PermissionDeniedError',
      'PermissionDismissedError',
    ].includes(error)
  ) {
    return "It looks like this site isn't allowed to access your camera. Please allow access to your camera and try again.";
  }

  return 'Something went wrong accessing your camera. You can try switching your camera below, or you can try again.';
};

const FriendlyCameraError: React.FC<{ error: string } & UI.StackProps> = ({
  error,
  ...restProps
}) => {
  let additionalElement: React.ReactNode;
  if (
    [
      'NotAllowedError',
      'PermissionDeniedError',
      'PermissionDismissedError',
    ].includes(error)
  ) {
    const parser = new UAParser(window.navigator.userAgent);
    const browser = parser.getBrowser();
    const os = parser.getOS();
    const terms = _.compact([
      'allow',
      'site',
      'camera',
      'access',
      browser.name,
      browser.version?.split('.')[0],
      os.name,
    ]);

    const url = `https://www.google.com/search?q=${terms.join('+')}`;
    additionalElement = (
      <UI.Link href={url} target="_blank">
        Search for instructions on how to allow camera access in your browser.
      </UI.Link>
    );
  }

  return (
    <UI.VStack {...restProps}>
      <UI.Text>{getFriendlyErrorMessage(error)}</UI.Text>
      {additionalElement}
    </UI.VStack>
  );
};

export type CameraInputProps = Omit<UI.InputProps, 'value'> & {
  value: string | undefined;
  onChange(str: string | undefined): any;
  renderExtraButtons?: React.FC<{ value: string | undefined }>;
};
export const CameraInput = React.forwardRef<HTMLInputElement, CameraInputProps>(
  ({ value, onChange, renderExtraButtons }, ref) => {
    const [error, setError] = React.useState<
      string | DOMException | undefined
    >();
    const webcamRef = React.useRef<Webcam>();
    const { devices } = useMediaDevices() as {
      devices: {
        deviceId: string;
        groupId: string;
        kind: string;
        label: string;
      }[];
    };
    const videoDevices = React.useMemo(
      () => _.filter(devices, (d) => d.kind === 'videoinput'),
      [devices]
    );
    const [deviceId, setDeviceId] = React.useState<string>(
      _.first(videoDevices)?.deviceId || 'user'
    );

    const handleCaptureClick = async () => {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (!imageSrc) return;

      const resized = await resizeAndCropProportionally(imageSrc, 1000, 1000);
      onChange(resized);
    };

    return (
      <UI.HStack alignItems="start" spacing={6}>
        <UI.VStack alignItems="start">
          <UI.Flex
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.300"
            maxW="full"
            overflow="hidden"
            bg="black"
            w="340px"
            h="340px"
          >
            {error ? (
              <UI.Flex
                w="full"
                h="full"
                alignItems="center"
                justifyContent="center"
                px={4}
                py={3}
              >
                <UI.VStack fontSize="sm" textAlign="center" spacing={6}>
                  <FriendlyCameraError color="white" error={error.toString()} />
                  <UI.Button onClick={() => setError(undefined)} size="sm">
                    Retry Camera
                  </UI.Button>
                </UI.VStack>
              </UI.Flex>
            ) : (
              <Webcam
                /* @ts-ignore: untyped ref */
                ref={webcamRef}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  deviceId: deviceId || 'user',
                }}
                onUserMediaError={(e) => {
                  setError(e);
                }}
              />
            )}
          </UI.Flex>
          <UI.HStack w="full">
            <UI.Select
              value={deviceId}
              onChange={(e) => {
                setDeviceId(e.target.value);
                setError(undefined);
              }}
              flex="1 1 auto"
              placeholder="Change camera"
            >
              {_.map(videoDevices, (d) => (
                <option key={d.deviceId} value={d.deviceId}>
                  {d.label.split('(')[0].trim()}
                </option>
              ))}
            </UI.Select>
            <UI.Button preset="primary" w={28} onClick={handleCaptureClick}>
              Capture
            </UI.Button>
          </UI.HStack>
        </UI.VStack>
        <UI.VStack alignItems="start">
          <UI.Flex
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.300"
            maxW="full"
            overflow="hidden"
            w="340px"
            h="340px"
          >
            {value ? (
              <UI.Image
                src={value}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            ) : (
              <UI.Flex
                w="full"
                h="full"
                alignItems="center"
                justifyContent="center"
                px={4}
                py={3}
              >
                <UI.Text color="gray.400" fontWeight="bold" fontSize="sm">
                  Camera capture will appear here.
                </UI.Text>
              </UI.Flex>
            )}
          </UI.Flex>

          <UI.HStack w="full" justifyContent="end">
            <UI.Button
              onClick={() => onChange(undefined)}
              isDisabled={!value}
              preset="secondary"
            >
              Remove
            </UI.Button>
            {renderExtraButtons?.({ value })}
          </UI.HStack>
        </UI.VStack>
      </UI.HStack>
    );
  }
);
