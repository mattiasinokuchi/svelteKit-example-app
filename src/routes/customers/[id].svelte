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

    // This block loads options when adding subscriptions
    import { onMount } from "svelte";
    let subscriptions = [];
    onMount(async () => {
        let res = await fetch(`/subscriptions.json`);
        subscriptions = await res.json();
    });
</script>

<main>
    <h1>{customer.first_name} {customer.last_name}</h1>
    <p>Subscription active: {customer.status.active}</p>
    <p>Subscription:</p>
    <ul>
        {#each customer.customers_subscriptions as { subscription, id }}
            <li>
                <form
                    action="/customers_subscriptions/{id}.json?_method=delete"
                    method="post"
                >
                    <label>
                        {subscription.name}
                        <button type="submit">Delete</button>
                    </label>
                </form>
            </li>
        {/each}
    </ul>

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

    <form action="/customers/{customer.id}.json?_method=delete" method="post">
        <button type="submit" disabled={customer.customers_subscriptions.length>0}>Delete Customer</button>
        <label for="button" hidden={customer.customers_subscriptions.length<1}>(delete subscriptions first)</label>
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
