import * as UI from '@@ui';
import { motion } from 'framer-motion';
import React from 'react';

const MotionUI = {
  Box: motion(UI.Box),
};

export const CountdownBar: React.FC<
  UI.BoxProps & {
    durationSeconds: number;
  }
> = ({ durationSeconds, ...restProps }) => {
  return (
    <MotionUI.Box
      h={1}
      bg="black"
      w="100%"
      borderRadius="full"
      initial={{ width: '100%' }}
      animate={{ width: 0 }}
      transition={{ duration: durationSeconds, ease: 'linear' }}
      {...restProps}
    />
  );
};
