'use client'

import { useQuery } from '@tanstack/react-query'

function fetcher(url: string) {
    return fetch(url).then(res => res.json())
}

export default function User() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: () => fetcher('https://jsonplaceholder.typicode.com/users')
    })

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error: {error.message}</div>

    if(!data || data.length === 0) return <div>No users found</div>

    return <div>
        <ul>
            {data.map((user: any) => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    </div>
}
