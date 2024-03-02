import { ActionFlowProvider } from '@@dialogs/actionFlow';
import { ConfirmationProvider } from '@@dialogs/confirmation';

export const CommonLayoutProviders: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <ConfirmationProvider>
      <ActionFlowProvider>{children}</ActionFlowProvider>
    </ConfirmationProvider>
  );
};
