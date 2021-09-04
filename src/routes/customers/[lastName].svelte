<script context="module">
    export async function load({ fetch, page }) {
        const { lastName } = page.params;
        const res = await fetch(`/api/customers/${lastName}`);

        if (res.ok) return { props: { customer: await res.json() } };
        return {
            status: res.status,
            error: new Error(),
        };
    }
</script>

<script>
    import { each } from "svelte/internal";

    export let customer;
</script>

<main>
    <h1>{customer.firstName} {customer.lastName}</h1>
    <p>Subscription: {customer.subscription.active}</p>
    <p>Products:</p>
    <form action="">
        <ul>
            {#each customer.products as { product }}
                <li>
                    <label>
                        <input type="checkbox" bind:checked={product.name} />
                        {product.name}
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
