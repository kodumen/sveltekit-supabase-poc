<script lang="ts">
    import supabase from "$lib/supabase";
    import {goto} from "$app/navigation";

    let errorMessage = ''

    async function handleSubmit(event: Event) {
        event.preventDefault();

        const body = new FormData(event.target as HTMLFormElement);

        const {error} = await supabase.auth.signIn({
            email: body.get('email') as string,
            password: body.get('password') as string
        });

        if (error) {
            errorMessage = error.message
        } else {
            await goto('/')
        }
    }
</script>

<section>
    <form method="post" on:submit|preventDefault={handleSubmit}>
        <h1>Login</h1>
        {#if errorMessage}
            <div>{errorMessage}</div>
        {/if}
        <div>
            <label for="email">Email</label>
            <input type="email" name="email" id="email" required>
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" name="password" id="password" required>
        </div>
        <button type="submit">Submit</button>
    </form>
</section>