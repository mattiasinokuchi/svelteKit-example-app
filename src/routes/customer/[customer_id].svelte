<!--    This is a specific customers page   -->
<script context="module">
    export async function load({ fetch, page }) {
        const { customer_id } = page.params;
        let res = null;
        try {
            res = await fetch(`/customer/${customer_id}.json`);
            const customer = await res.json();
            res = await fetch(`/customer/get_order/${customer_id}.json`);
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
    let selected_product_id, selected_product;
    $: if (selected_product_id) {
        selected_product = option.find((el) => el.id === selected_product_id);
    }
</script>

<main>
    <h1>{customer.first_name} {customer.last_name}</h1>

    <!-- This is a form for deleting customers -->
    <form
        action="/customer/{customer.customer_id}.json?_method=delete"
        method="post"
    >
        <input hidden value={customer.delivery_order} name="delivery_order" />
        <button type="submit" disabled={order.length > 0}
            >Delete Customer</button
        >
        <!-- customer data needs to be deleted from the database -->
        <label for="button" hidden={order.length < 1}
            >(delete product and subscription first)</label
        >
    </form>

    <!-- This is a form for setting the subscription status -->
    <form action="/customer/set_status.json" method="post">
        <input type="hidden" name="customer_id" value={customer.customer_id} />
        <input type="hidden" name="subscribe" value={customer.active} />
        <input
            type="checkbox"
            name="subscribe"
            bind:checked={customer.active}
        />
        <label for="subscribe">Active subscription</label>
        <button type="submit">Update</button>
    </form>

    <!-- This is a list of subscriptions/orders with delete buttons -->
    <section>
        <p>Subscriptions/orders:</p>
        {#if order.length > 0}
            <ul>
                {#each order as { product_name, order_id }}
                    <li>
                        <form
                            action="/customer/remove_product/{order_id}.json?_method=delete"
                            method="post"
                            disabled={!customer.active}
                        >
                            <label>
                                {product_name}
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
        <p>Add order:</p>
        <input
            hidden
            type="text"
            value={customer.customer_id}
            name="customer_id"
        />
        <label for="product_id">Product</label>
        <select bind:value={selected_product_id} name="product_id">
            <option value="">- Please choose an option -</option>
            {#each option as { product_name, product_id }}
                <option value={product_id}>{product_name}</option>
            {/each}
        </select>
        {#if selected_product && selected_product.delivery_interval }
            <label for="start_date">Start date</label>
            <input required type="date" name="start_date" />
        {/if}
        <button type="submit">Add product</button>
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
