<script context="module">
    export async function load({ session }) {
        if (session.user) {
            return {
                status: 302,
                redirect: "/product",
            };
        }
        return {
            props: {
                user: session.user,
            },
        };
    }
</script>

<main>
    <form action="/login" method="post">
        <label for="email">Login with link sent to</label>
        <input
            type="email"
            name="email"
            id="email"
            placeholder="name@domain.tld"
        />
        <input type="submit" value="Submit" />
    </form>
</main>

<style>
    /* Hides the navbar */
    main {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        background-color: white;
    }
    form {
        position: fixed;
        top: 50%;
        left: 25%;
    }
</style>
