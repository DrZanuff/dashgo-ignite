import { Flex , Text , Box , Avatar} from '@chakra-ui/react';

interface ProfileProps {
    showProfileData : boolean
}

export function Profile({showProfileData}:ProfileProps) {

    return (
        <Flex align="center">
        { showProfileData && (
            <Box mr="4" textAlign="right">
                <Text>Ricardo Machado</Text>
                <Text color="gray.300" fontSize="small">
                    ricardo.machado.nwi@gmail.com
                </Text>
            </Box>
        )}

        <Avatar size="md" name="Ricardo Machado" src="https://github.com/DrZanuff.png"/>
        
    </Flex>
    )
}