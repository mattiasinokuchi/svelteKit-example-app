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
            res = await fetch(`/customer/get_time_out/${customer_id}.json`);
            const time_out = await res.json();
            return {
                props: {
                    customer,
                    order,
                    option,
                    time_out,
                },
            };
        } catch (error) {
            return error;
        }
    }
</script>

<script>
    export let customer, order, option, time_out;
    let selected_product_id, selected_product, start_date;
    $: if (selected_product_id) {
        selected_product = option.find((el) => el.id === selected_product_id);
    }
</script>

<main>
    <h1>{customer.first_name} {customer.last_name}</h1>

    <h2>Subscription time-out</h2>

    <!-- This is a list of subscription time-outs with delete buttons -->
    <section>
        {#if time_out.length > 0}
            <ul>
                {#each time_out as { time_out_id, start_date, end_date }}
                    <li>
                        <form
                            action="/customer/remove_time_out/{time_out_id}.json?_method=delete"
                            method="post"
                            disabled={!customer.active}
                        >
                            <label>
                                {start_date} to {end_date}
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

    <h3>Add time-out</h3>

    <!-- This is a form for subscription time-out -->
    <form action="/customer/add_time_out.json" method="post">
        <input type="hidden" name="customer_id" value={customer.customer_id} />
        <label for="start_date">Start date</label>
        <input required type="date" name="start_date" bind:value={start_date} />
        <label for="end_date">End date</label>
        <input required type="date" name="end_date" min={start_date} />
        <button type="submit">Add</button>
    </form>

    <!-- This is a list of subscriptions/orders with delete buttons -->
    <section>
        <h2>Subscriptions/orders</h2>
        {#if order.length > 0}
            <ul>
                {#each order as { product_name, order_id, start_date }}
                    <li>
                        <form
                            action="/customer/remove_product/{order_id}.json?_method=delete"
                            method="post"
                            disabled={!customer.active}
                        >
                            <label>
                                {product_name}, (start/delivery {start_date})
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
        <h3>Add order:</h3>
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
        {#if selected_product && selected_product_id !== ""}
            {#if selected_product.delivery_interval }
                <label for="start_date">Start</label>
            {:else}
            <!-- start_date is used as delivery date for one-time orders -->
                <label for="start_date">Delivery</label>
            {/if}
            <input required type="date" name="start_date" />
            <button type="submit" >Add product</button>
        {/if}
    </form>

    <h2>Subscription status</h2>

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

    <hr />

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
            >(delete subscription/order first)</label
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
