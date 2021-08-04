import { Flex , Text , Box , Avatar} from '@chakra-ui/react';

export function Profile () {

    return (
        <Flex
        align="center"
        
    >
        <Box mr="4" textAlign="right">
            <Text>Ricardo Machado</Text>
            <Text color="gray.300" fontSize="small">
                ricardo.machado.nwi@gmail.com
            </Text>
        </Box>

        <Avatar size="md" name="Ricardo Machado" src="https://github.com/DrZanuff.png"/>
        
    </Flex>
    )
}