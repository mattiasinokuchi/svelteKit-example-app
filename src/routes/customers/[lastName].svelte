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
    export let customer;
</script>

<main>
    <h1>{customer.firstName} {customer.lastName}</h1>
    <div class="box">
        <ul>
            <li>Subscription: {customer.subscription.active}</li>
            <li>Phone: {customer.phone}</li>
            <li>Email: {customer.email}</li>
        </ul>
    </div>
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
    .box {
        display: flex;
        font-size: 1.5rem;
    }
    li {
        margin-bottom: 1rem;
    }
</style>
