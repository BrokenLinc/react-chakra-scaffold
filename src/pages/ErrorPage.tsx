import { routes } from '@@routing/routes';
import * as UI from '@@ui';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();

  let title = 'Oops!';
  let message = 'Something went wrong.';

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      message = "This page doesn't exist. (Error 404)";
    }
  }

  return (
    <UI.Flex
      h="100vh"
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <UI.Box
        bg="orange.100"
        borderRadius="lg"
        w="100%"
        maxW="480px"
        p={8}
        textAlign="center"
      >
        <UI.Heading size="3xl" fontWeight="light" mb={4}>
          {title}
        </UI.Heading>
        <UI.Text fontWeight="bold" mb={4}>
          {message}
        </UI.Text>
        <UI.RouteButton colorScheme="purple" route={routes.home()} size="sm">
          Return Home
        </UI.RouteButton>
      </UI.Box>
    </UI.Flex>
  );
};
