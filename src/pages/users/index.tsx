import Link from 'next/link'
import {
	Box, Flex, Heading, Button, Icon, Text,
	Table, Thead, Tr, Th, Checkbox, Tbody, Td, useBreakpointValue, Spinner
} from '@chakra-ui/react';

import { RiAddLine, RiPencilLine , RiRotateLockLine } from 'react-icons/ri';
import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import { useUsers } from '../../services/hooks/useUsers';

type User = {
  name: string;
  email: string;
  createdAt: string;
	id: string;
}

export default function Userlist() {
	const isWideVersion = useBreakpointValue({ base: false, lg: true })

	const { data , isLoading, error , isFetching , refetch } = useUsers()

	return (
		<Box>
			<Header />
			<Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
				<Sidebar />
				<Box flex="1" borderRadius={8} bg="gray.800" p="8" >
					<Flex mb="8" justify="space-between" align="center">
						<Heading size="lg" fontWeight="normal">
							Usuários
							{
								!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4"/>
							}
						</Heading>
						<Flex>
							{
								!isFetching
								?
								<Button
									as="a"
									size="sm"
									fontSize="sm"
									colorScheme="pink"
									mr="4"
									leftIcon={<Icon as={RiRotateLockLine} fontSize="20" />}
									onClick={()=> refetch()}
									cursor="pointer"
								>
									Regarregar
								</Button>
								:
								<Button
									as="a"
									size="sm"
									fontSize="sm"
									colorScheme="pink"
									mr="4"
									leftIcon={<Icon as={RiRotateLockLine} fontSize="20" />}
									disabled
								>
									Regarregar
								</Button>
							}

							<Link href="/users/create" passHref>
								<Button
									as="a"
									size="sm"
									fontSize="sm"
									colorScheme="pink"
									leftIcon={<Icon as={RiAddLine} fontSize="20" />}
								>
									Criar novo
								</Button>
							</Link>

						</Flex>
					</Flex>

				{
					isLoading ? (
						<Flex justify="center">
							<Spinner />
						</Flex>
					) : error ? (
						<Flex justify="center">
							Falha ao obter dados dos usuários
						</Flex>
					) : (
						<>
							<Table colorScheme="whiteAlpha">
							<Thead>
								<Tr>
									<Th px={["4", "4" ,"6"]} color="gray.300" width="8">
										<Checkbox colorScheme="pink" />
									</Th>
									<Th>Usuários</Th>
									{ isWideVersion && <Th>Data de cadastro</Th>}
									<Th width="8"></Th>
								</Tr>
							</Thead>
							<Tbody>

								{
									data.map( (user : User) => (
										<Tr _hover={{ opacity: 0.8 }} key={user.id}>
											<Td px={["4", "4" ,"6"]}>
												<Checkbox colorScheme="pink" />
											</Td>
											<Td>
												<Box>
													<Text fontWeight="bold">{user.name}</Text>
													<Text fontSize="sm" color="gray.300">{user.email}</Text>
												</Box>
											</Td>
											{ isWideVersion && <Td>{user.createdAt}</Td> }
											<Td>
												<Button
													opacity={0.1}
													_hover={{ opacity: 1.0 }}
													as="a"
													size="sm"
													fontSize="sm"
													colorScheme="purple"
													leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
												>
													{ isWideVersion ? 'Editar' :  '' }
												</Button>
											</Td>
										</Tr>
									))
								}
								
							</Tbody>
						</Table>

						<Pagination
							totalCountOfRegisters={200}
							currentPage={5}
							onPageChange={ () => {} }
						/>
						</>
					)
				}
				</Box>
			</Flex>

		</Box>
	)
}