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

    // This block loads options for the form to add a subscription
    import { onMount } from "svelte";
    let subscriptions = [];
    onMount(async () => {
        let res = await fetch(`/subscriptions.json`);
        subscriptions = await res.json();
    });

    // This block remove customer subscriptions
    const remove = (id) =>
        function () {
            console.log("remove called");
            try {
                fetch(`/customers_subscriptions/${id}.json?_method=delete`);
                customer.customers_subscriptions = [
                    ...customer.customers_subscriptions.slice(0, id - 1),
                    ...customer.customers_subscriptions.slice(id),
                ];
                console.log(customer.customers_subscriptions, id);
            } catch (error) {
                console.log(error);
            }
        };
</script>

<main>
    <h1>{customer.first_name} {customer.last_name}</h1>
    <p>Subscription active: {customer.status.active}</p>
    <p>Subscription:</p>
    {#each customer.customers_subscriptions as { subscription, id }, i}
        {#if customer.customers_subscriptions[0].id}
            <ul>
                <li>
                    <form>
                        <label>
                            {subscription.name}
                            <button on:click|preventDefault={remove(id)}
                                >Delete</button
                            >
                        </label>
                    </form>
                </li>
            </ul>
        {:else}
            <p>No subscriptions</p>
        {/if}
    {/each}

    <form action="/customers_subscriptions.json" method="post">
        <p>New Subscription:</p>
        <input hidden type="text" value={customer.id} name="customer" />
        <select name="subscription" id="subscription-select">
            <option value="">- Please choose an option -</option>
            {#each subscriptions as { name, id }}
                <option value={id}>{name}</option>
            {/each}
        </select>
        <button type="submit">Add Subscription</button>
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
</style>
