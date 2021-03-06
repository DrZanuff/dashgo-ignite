import { useQuery } from 'react-query'
import { api } from '../../services/api';

type User = {
  name: string;
  email: string;
  createdAt: string;
	id: string;
}

export async function getUsers() : Promise<User[]> {
  const {data} = await api.get('users')

  const users = data.users.map( (user: User) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString()
    }
  })

  return users
}

export function useUsers() {

  return useQuery('users', getUsers ,{
		staleTime: 1000 * 5 // 5 Seconds
	})
}