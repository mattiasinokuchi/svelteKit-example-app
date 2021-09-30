<!--    This is a child page to
        the customers parent page  -->
<script context="module">
    export async function load({ fetch, page }) {
        const { id } = page.params;
        let res = null;
        try {
            res = await fetch(`/customer/${id}.json`);
            const customer = await res.json();
            res = await fetch(`/customer/get_product_options.json`);
            const product = await res.json();
            return {
                props: {
                    customer,
                    product
                },
            };
        } catch (error) {
            return error;
        }
    }
</script>

<script>
    export let customer, product;
</script>

{#if false}<slot />{/if}
<main>
    <!-- This is a list of products with delete buttons-->
    <h1>{customer.first_name} {customer.last_name}</h1>
    <p>Subscription active: {customer.status.active}</p>
    <p>Subscription:</p>
    <ul>
        {#each customer.subscription as { product, id }}
            <li>
                <form
                    action="/subscription/{id}.json?_method=delete"
                    method="post"
                >
                    <label>
                        {product.name}
                        <button type="submit">Delete</button>
                    </label>
                </form>
            </li>
        {/each}
    </ul>

    <!-- This is a form for adding products -->
    <form action="/subscription.json" method="post">
        <p>Add product:</p>
        <input hidden type="text" value={customer.id} name="customer" />
        <select name="product" id="product-select">
            <option value="">- Please choose an option -</option>
            {#each product as { name, id }}
                <option value={id}>{name}</option>
            {/each}
        </select>
        <button type="submit">Add product</button>
    </form>

    <!-- This is a form for deleting customers -->
    <form action="/customer/{customer.id}.json?_method=delete" method="post">
        <button type="submit" disabled={customer.subscription.length > 0}
            >Delete Customer</button
        >
        <!-- data with relationship to each customer needs to be deleted first to prevent personal information from being left in the database -->
        <label for="button" hidden={customer.subscription.length < 1}
            >(delete product and subscription first)</label
        >
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
