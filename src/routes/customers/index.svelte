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
	<ul>
		<li class="box">
			<a sveltekit:prefetch href='/customers/new'>
				<h2>Add Customer</h2>
			</a>
		</li>
		{#each customers as { firstName, lastName, id }}
			<li class="box">
				<a sveltekit:prefetch href={`/customers/${id}`}>
					<h2>{firstName} {lastName}</h2>
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
