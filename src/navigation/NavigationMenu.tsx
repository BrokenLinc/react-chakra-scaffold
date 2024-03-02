import { useAppArea } from '@@routing/appAreas';
import * as UI from '@@ui';
import { faChildren, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import React from 'react';

export const NavigationMenu: React.FC<UI.BoxProps> = (props) => {
  /**
   * Set the order of the tabs in the navigation menu.
   * To adjust titles and menu items refer to the appArea definitions in appArea.ts.
   */
  const appArea = useAppArea();

  return (
    <UI.Flex direction="column" overflow="hidden" {...props}>
      <UI.Flex flex="1 1 0" direction="column" overflowY="auto" pb={16}>
        <UI.Accordion allowMultiple variant="navMenu">
          <UI.AccordionToggler
            position="absolute"
            zIndex="navigationMenu"
            bottom={0}
            left={1}
            right={1}
            m={4}
            mt={0}
            itemCount={
              appArea.navigationMenuGroups?.length
                ? appArea.navigationMenuGroups?.length + 1
                : 0
            }
          />
          <UI.AccordionController>
            {(accordion) => (
              <React.Fragment>
                {_.map(
                  appArea.navigationMenuGroups,
                  (group, accordionIndex) => (
                    <React.Fragment key={group.label}>
                      <UI.AccordionItem>
                        {(accordionItem) => {
                          return (
                            <React.Fragment>
                              <UI.AccordionButton>
                                <UI.Box
                                  display="flex"
                                  flex="1"
                                  textAlign="left"
                                  alignItems="center"
                                >
                                  <FontAwesomeIcon icon={faChildren} />
                                  <UI.Box
                                    as="span"
                                    flex="1"
                                    textAlign="left"
                                    pl="2"
                                  >
                                    {group.label}
                                  </UI.Box>
                                  {accordionItem.isExpanded ? (
                                    <FontAwesomeIcon icon={faMinus} />
                                  ) : (
                                    <FontAwesomeIcon icon={faPlus} />
                                  )}
                                </UI.Box>
                              </UI.AccordionButton>
                              <UI.AccordionPanel>
                                <UI.UnorderedList
                                  spacing="3.5"
                                  styleType="none"
                                  ml="0"
                                >
                                  {_.map(group.routes, (route) => (
                                    <UI.ListItem
                                      key={route.path}
                                      lineHeight={'shorter'}
                                    >
                                      <UI.RouteLink
                                        route={route}
                                        color={'purple.400'}
                                        fontSize={'sm'}
                                        fontFamily={'heading'}
                                        activeProps={{
                                          color: 'purple.500',
                                          fontWeight: 'bold',
                                        }}
                                        onActive={() => {
                                          accordion.openByIndex(accordionIndex);
                                        }}
                                        activateOnChild
                                      />
                                    </UI.ListItem>
                                  ))}
                                </UI.UnorderedList>
                              </UI.AccordionPanel>
                            </React.Fragment>
                          );
                        }}
                      </UI.AccordionItem>
                    </React.Fragment>
                  )
                )}
              </React.Fragment>
            )}
          </UI.AccordionController>
        </UI.Accordion>
      </UI.Flex>
    </UI.Flex>
  );
};
