import { Flex, IconButton, useBreakpointValue , Icon } from '@chakra-ui/react';
import { Profile } from './Profile';
import { SearchBox } from './SearchBox';
import { Logo } from './Logo';
import { NotificationsNav } from './NotificationsNav';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { RiMenuLine } from 'react-icons/ri';

export function Header() {

  const { onOpen } = useSidebarDrawer()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

    return (
        <Flex
          w="100"
          as="header"
          maxW={1480}
          h="20"
          mx="auto"
          mt="4"
          align="center"
        >
            { !isWideVersion && (
              <IconButton
                aria-label="Open Navigation"
                icon={<Icon as={RiMenuLine} /> }
                fontSize="24"
                variant="unstyled"
                onClick={onOpen}
                mr="2"
              >

              </IconButton>
            ) }
            <Logo />
            {isWideVersion && <SearchBox />}

            <Flex
              align="center"
              ml="auto"
            >
                <NotificationsNav />
                <Profile showProfileData={isWideVersion}/>

            </Flex>
        </Flex>
    )
}