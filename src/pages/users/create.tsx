import Link from 'next/link'
import {
	Box, Flex, Heading, Button, Icon, Text,
	Divider, VStack, SimpleGrid, HStack
} from '@chakra-ui/react';
import { useForm , SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

type CreateUserFormData = {
	name: string
  email: string;
  password: string;
	password_confirmation : string;
}

const CreateUserFormSchema = yup.object().shape({
	name: yup.string().required('Nome obrigatório').min(5 , 'Informe pelo menos 5 caracteres'),
	email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
	password: yup.string().required('Senha obirgatória').min(6 , 'A senha deve possuir 6 chars'),
	password_confirmation: yup.string().required('Repita a senha').oneOf([null, yup.ref('password')], 'Senha não são iguais'),
})


export default function CreateUser() {

	const { register , handleSubmit , formState} = useForm({
		resolver: yupResolver(CreateUserFormSchema)
	})

	const { errors } = formState

	const handleCreateUser: SubmitHandler<CreateUserFormData> =  async (value) => {
		await new Promise( resolve => setTimeout(resolve,2000))
		console.log(value)
	}

	return (
		<Box>
			<Header />
			<Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
				<Sidebar />
				<Box
					as="form"
					flex="1"
					borderRadius={8}
					bg="gray.800"
					p={["6", "8"]}
					onSubmit={handleSubmit(handleCreateUser)}
				>
					<Heading size="lg" fontWeight="normal">Criar usuário</Heading>

					<Divider my="6" borderColor="gray.700"></Divider>

					<VStack spacing="8">
						<SimpleGrid
							minChildWidth="240px"
							spacing={["6", "8"]}
							w="100%"
						>
							<Input
								name="name"
								label="Nome completo"
								error={errors.name}
								{...register('name')}/>

							<Input
								name="email"
								type="email"
								label="E-mail"
								error={errors.email}
								{...register('email')}/>
						</SimpleGrid>

						<SimpleGrid
							minChildWidth="240px"
							spacing={["6", "8"]}
							w="100%"
						>
							<Input
								name="password"
								type="password"
								label="Senha"
								error={errors.password}
								{...register('password')}/>

							<Input
							name="password_confirmation"
							type="password"
							label="Confirmação da senha"
							error={errors.password_confirmation}
							{...register('password_confirmation')}/>
						</SimpleGrid>
					</VStack>

					<Flex mt="8" justify="flex-end">
						<HStack spacing="4">
							<Link href="/users" passHref>
								<Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
							</Link>
							<Button
								colorScheme="pink"
								type="submit"
								isLoading={formState.isSubmitting}
							>
								Salvar
							</Button>
						</HStack>
					</Flex>
				</Box>
			</Flex>

		</Box>
	)
}