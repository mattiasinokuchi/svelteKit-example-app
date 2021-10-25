<!--    This is a specific customers page  -->
<script context="module">
    export async function load({ fetch, page }) {
        const { id } = page.params;
        let res = null;
        try {
            res = await fetch(`/customer/${id}.json`);
            const customer = await res.json();
            res = await fetch(`/customer/get_order/${id}.json`);
            const order = await res.json();
            res = await fetch(`/customer/get_product_options.json`);
            const option = await res.json();
            return {
                props: {
                    customer,
                    order,
                    option,
                },
            };
        } catch (error) {
            return error;
        }
    }
</script>

<script>
    export let customer, order, option;
</script>

<main>
    <h1>{customer.first_name} {customer.last_name}</h1>

    <!-- This is a form for setting the subscription status -->
    <form action="/customer/set_status.json" method="post">
        <input type="hidden" name="customer" value={customer.id} />
        <input type="hidden" name="subscribe" value={customer.active} />
        <input
            type="checkbox"
            id="subscribe"
            name="subscribe"
            bind:checked={customer.active}
        />
        <label for="subscribe">Active subscription</label>
        <button type="submit">Update</button>
    </form>

    <!-- This is a list of subscriptions/orders with delete buttons -->
    <section id="list">
        <p>Subscriptions/orders:</p>
        {#if order.length > 0}
            <ul>
                {#each order as { name, id }}
                    <li>
                        <form
                            action="/customer/remove_product/{id}.json?_method=delete"
                            method="post"
                            disabled={!customer.active}
                        >
                            <label>
                                {name}
                                <button
                                    type="submit"
                                    disabled={!customer.active}>Delete</button
                                >
                            </label>
                        </form>
                    </li>
                {/each}
            </ul>
        {/if}
    </section>

    <!-- This is a form for adding products -->
    <form action="/customer/add_product.json" method="post">
        <p>Add product:</p>
        <input hidden type="text" value={customer.id} name="customer" />
        <select name="product" id="product-select">
            <option value="">- Please choose an option -</option>
            {#each option as { name, id }}
                <option value={id}>{name}</option>
            {/each}
        </select>
        <button type="submit">Add product</button>
    </form>

    <!-- This is a form for deleting customers -->
    <form action="/customer/{customer.id}.json?_method=delete" method="post">
        <button type="submit" disabled={order.length > 0}
            >Delete Customer</button
        >
        <!-- data with relationship to each customer needs to be deleted first to prevent personal information from being left in the database -->
        <label for="button" hidden={order.length < 1}
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
