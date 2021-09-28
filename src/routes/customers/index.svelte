<!-- This is the page for handling customers -->

<script context="module">
	export async function load({ fetch }) {
		const res = await fetch("/customers.json");
		if (res.ok) {
			const customer = await res.json();
			return {
				props: { customer },
			};
		}
		const { message } = await res.json();
		return {
			error: new Error(message),
		};
	}
</script>

<script>
	export let customer;
</script>

<main>
	<!-- This is a form for adding new customers -->
	<form class="box" action="/customers.json" method="post">
		<h2>New customer</h2>
		<ul>
			<li>
				<label for="firstName">First Name</label>
			</li>
			<li>
				<input
					type="text"
					id="firstName"
					name="firstName"
					aria-label="Add customer"
					placeholder="First name"
				/>
			</li>
			<br />
			<li>
				<label for="lastName">Last Name</label>
			</li>
			<li>
				<input
					type="text"
					id="lastName"
					name="lastName"
					aria-label="Add customer"
					placeholder="Last name"
				/>
			</li>
			<br />
			<li class="button">
				<button type="submit">Submit</button>
			</li>
		</ul>
	</form>
	<!--- This is a list of customers -->
	<ul>
		{#each customer as { first_name, last_name, id, delivery_order }}
			<li class="box">
				<a sveltekit:prefetch href={`/customers/${id}`}>
					<h2>{first_name} {last_name}</h2>
				</a>
				<form
					action="/customers/{id}.json?_method=update"
					method="post"
				>
					<label for="order">Delivery order</label>
					<input size="2" name="order" value={delivery_order} />
				</form>
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
		box-shadow: 4px 5px 11px 2px lightgray;
		width: 40vw;
		text-align: center;
	}
	.box:hover {
		box-shadow: 4px 5px 11px 10px lightgray;
	}
	ul {
		list-style-type: none;
	}
	h2 {
		color: salmon;
	}
	a {
		text-decoration: none;
		color: salmon;
	}
</style>
