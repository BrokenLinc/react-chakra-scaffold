import * as UI from '@@ui';
import React from 'react';
import { useIdle } from 'react-use';
import { CountdownBar } from './CountdownBar';

const TIME_TO_GO_IDLE = 5 * 1000;
const TIME_TO_RESPOND = 5 * 1000;

export const IdleModal: React.FC<
  Partial<UI.ModalProps> & { onTimeout: () => any; onRestart: () => any }
> = ({ children, onTimeout, onRestart, ...restProps }) => {
  const idle = useIdle(TIME_TO_GO_IDLE);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();
  const modal = UI.useDisclosure({
    onClose: () => {
      clearTimeout(timeoutRef.current);
    },
  });

  // Open the modal when starting to go idle
  React.useEffect(() => {
    if (idle && !modal.isOpen) {
      modal.onOpen();
      timeoutRef.current = setTimeout(() => {
        onTimeout();
        modal.onClose();
      }, TIME_TO_RESPOND);
    }
  }, [idle]);

  // Clear timeout when unmounting, just in case
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleRestartPressed = () => {
    onRestart();
    modal.onClose();
  };

  return (
    <UI.LightMode>
      <UI.Modal
        size="xs"
        closeOnOverlayClick={false}
        closeOnEsc={false}
        {...restProps}
        {...modal}
      >
        <UI.ModalOverlay />
        <UI.ModalContent>
          <UI.ModalHeader textAlign="center">
            Are you still there?
          </UI.ModalHeader>
          <UI.ModalBody textAlign="center">
            <UI.VStack alignItems="center">
              <UI.Text fontSize="sm">
                Please reply in the next {TIME_TO_RESPOND / 1000} seconds.
              </UI.Text>
              <CountdownBar
                durationSeconds={TIME_TO_RESPOND / 1000}
                bg="orange.400"
                mb={8}
              />
              {children}
              <UI.ButtonGroup>
                <UI.Button
                  size="lg"
                  preset="secondary"
                  onClick={handleRestartPressed}
                >
                  Restart
                </UI.Button>
                <UI.Button size="lg" preset="primary" onClick={modal.onClose}>
                  Continue
                </UI.Button>
              </UI.ButtonGroup>
            </UI.VStack>
          </UI.ModalBody>
        </UI.ModalContent>
      </UI.Modal>
    </UI.LightMode>
  );
};
