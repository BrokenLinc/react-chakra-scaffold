import * as UI from '@@ui';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useMeasure, useScroll } from 'react-use';

export const ScrollingBox: React.FC<UI.BoxProps> = ({ children, ...props }) => {
  const [contentRef, { height: contentHeight }] = useMeasure<HTMLDivElement>();
  const scrollRef = React.useRef(null);
  const { y: scrollY } = useScroll(scrollRef);

  const viewportHeight = 255;
  const scrollRemaining = contentHeight - viewportHeight - scrollY;
  const opacity = Math.min(1, scrollRemaining / 100);

  return (
    <UI.Box position="relative" h={viewportHeight} {...props}>
      <UI.Box ref={scrollRef} h="100%" overflowY="auto" fontSize="sm">
        <UI.Box ref={contentRef}>
          <UI.Box pr={4} pb={4}>
            {children}
          </UI.Box>
        </UI.Box>
      </UI.Box>
      {scrollRemaining ? (
        <UI.Flex
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          borderBottom="1px solid"
          borderColor="gray.300"
          alignItems="end"
          justifyContent="center"
          h="72px"
          bg="linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))"
          pointerEvents="none"
          opacity={opacity}
        >
          <UI.Box position="relative" color="gray.500" fontSize="sm" top="26px">
            <FontAwesomeIcon icon={faChevronDown} />
          </UI.Box>
        </UI.Flex>
      ) : null}
    </UI.Box>
  );
};
