<script context="module">
    export async function load({ fetch, page }) {
        const { id } = page.params;
        const res = await fetch(`/customers/${id}.json`);
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
    console.log(customer);
	import { onMount } from "svelte";

	let subscriptions = [];

	onMount(async () => {
		let res = await fetch(`/subscriptions.json`);
		subscriptions = await res.json();
	});

</script>

<main>
    <h1>{customer.first_name} {customer.last_name}</h1>

    <form class="box" action="/customers_subscriptions.json" method="post">
		<h2>New Subscription</h2>
		<ul>
            <li>
                <input type="text" value={customer.id} name="customer">
            </li>
			<li>
				<label for="subscription-select">Choose a subscription:</label>
			</li>
			<li>
				<select name="subscription" id="subscription-select">
					<option value="">- Please choose an option -</option>
					{#each subscriptions as { name, id }}
						<option value={id}>{name}</option>
					{/each}
				</select>
			</li>
			<li>
				<br />
				<button type="submit">Add Subscription</button>
			</li>
		</ul>
	</form>

    <p>Subscription: {customer.status.active}</p>
    <p>Products:</p>
    <form action="">
        <ul>
            {#each customer.customers_subscriptions as { subscription }}
                <li>
                    <label>
                        <input type="checkbox" bind:checked={subscription.name} />
                        {subscription.name}
                    </label>
                </li>
            {/each}
        </ul>
    </form>
</main>

<style>
    main {
        margin: 4rem;
        padding: 2rem;
        color: gray;
        justify-content: center;
        box-shadow: 4px 5px 11px 10px lightgray;
    }
    h1 {
        color: salmon;
    }
    ul {
        list-style-type: none;
    }
</style>
