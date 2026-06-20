type User = {
	id: number;
	name: string;
	email: string;
	instrument: string;
};

export async function UserList() {
	const response: Response = await fetch("http://localhost:3001/user");

	const dados: User[] = await response.json();
	return (
		<div>
			{dados.map((user: User) => (
				<div key={user.id}>
					<h2>{user.name}</h2>
					<h2>{user.email}</h2>
					<h2>{user.instrument}</h2>
				</div>
			))}
		</div>
	);
}
