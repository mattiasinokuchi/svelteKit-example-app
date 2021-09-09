<script context="module">
	export async function load({ fetch }) {
		const res = await fetch("/customers.json");
		if (res.ok) {
			const customers = await res.json();
			return {
				props: { customers },
			};
		}
		const { message } = await res.json();
		return {
			error: new Error(message),
		};
	}
</script>

<script>
	export let customers;
</script>

<main>
	<form action="/customers.json" method="post">
		<ul>
			<li>
				<label for="firstName">First Name</label>
				<input
					type="text"
					id="firstName"
					name="firstName"
					aria-label="Add customer"
					placeholder="First name"
				/>
			</li>
			<li>
				<label for="lastName">Last Name</label>
				<input
					type="text"
					id="lastName"
					name="lastName"
					aria-label="Add customer"
					placeholder="Last name"
				/>
			</li>
			<li class="button">
				<button type="submit">Submit</button>
			</li>
		</ul>
	</form>

	<ul>
		{#each customers as { first_name, last_name, id }}
			<li class="box">
				<a sveltekit:prefetch href={`/customers/${id}`}>
					<h2>{first_name} {last_name}</h2>
				</a>
			</li>
		{/each}
	</ul>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
	}
	.box {
		padding: 0.25rem;
		margin: 1.5rem;
		color: salmon;
		box-shadow: 4px 5px 11px 2px lightgray;
	}
	.box:hover {
		box-shadow: 4px 5px 11px 10px lightgray;
	}
	ul {
		list-style-type: none;
	}
	a {
		text-decoration: none;
		color: salmon;
	}
</style>
