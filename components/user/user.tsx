'use client'

import { faker } from '@faker-js/faker'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as services from '@/services/api'

function fetcher(url: string) {
    return fetch(url).then(res => res.json())
}

function createUser(user: any) {
    return fetch('http://localhost:3001/users', {
        method: 'POST',
        body: JSON.stringify(user)
    }).then(res => res.json())
}

export default function User() {

    const queryClient = useQueryClient()

    const { data, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: () => fetcher('http://localhost:3001/users')
    })

    const userMutation = useMutation({
        mutationFn: (user: any) => createUser(user),
        onSuccess: (newUser: any) => {
            queryClient.setQueryData(['users'], (old: any) => [...old, newUser])
            queryClient.invalidateQueries({ queryKey: ['users'] })
        }
    })

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error: {error.message}</div>

    if(!data || data.length === 0) return <div>No users found</div>

    return <div>
        <div>
            <button onClick={() => userMutation.mutate({ name: faker.person.fullName() })}>Create User</button>
        </div>
        <div>
        <ul>
            {data.map((user: any) => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
        </div>
        <div>
            {userMutation.isPending && <div>Creating user...</div>}
            {userMutation.isError && <div>Error: {userMutation.error.message}</div>}
            {userMutation.isSuccess && <div>User created successfully</div>}
        </div>
    </div>
}
