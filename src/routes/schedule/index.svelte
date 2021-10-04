<!--    This is a child page to
        the customers parent page  -->
<script context="module">
    export async function load({ fetch }) {
        let res = null;
        try {
            res = await fetch(`/schedule.json`);
            const schedule = await res.json();
            res = await fetch(`/schedule/get_product_options.json`);
            const product = await res.json();
            return {
                props: {
                    schedule,
                    product
                },
            };
        } catch (error) {
            return error;
        }
    }
</script>

<script>
    export let schedule, product;
</script>

<main>
    <!-- This is a list of delivery dates with delete buttons-->
    <ul>
        {#each schedule as { delivery_date, product, id }}
            <li>
                <form
                    action="/schedule/{id}.json?_method=delete"
                    method="post"
                >
                    <label for="">{id}</label>
                    <label>
                        {delivery_date}: {product}
                        <button type="submit">Delete</button>
                    </label>
                </form>
            </li>
        {/each}
    </ul>

    <!-- This is a form for adding delivery dates -->
    <form action="/schedule.json" method="post">
        <p>Add delivery:</p>
        <label for="deliveryDate">Delivery date</label>
        <input name="deliveryDate" type="date">
        <select name="product" id="product-select">
            <option value="">- Please choose an option -</option>
            {#each product as { name, id }}
                <option value={id}>{name}</option>
            {/each}
        </select>
        <button type="submit">Add delivery</button>
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
</style>
