<script context="module" lang="ts">
    import type {LoadOutput} from "@sveltejs/kit";
    import supabase from "$lib/supabase";

    export async function load(): Promise<LoadOutput> {
        if (supabase.auth.user() === null) {
            return {status: 200};
        }

        return {status: 302, redirect: '/'};
    }
</script>

<script lang="ts">
    import {goto} from "$app/navigation";
    import {MessageLevel, push as pushNotification} from '$lib/notifications/store';

    async function handleSubmit(event: Event) {
        event.preventDefault();

        const body = new FormData(event.target as HTMLFormElement);

        const {error} = await supabase.auth.signIn({
            email: body.get('email') as string,
            password: body.get('password') as string,
        });

        if (error) {
            pushNotification({message: error.message, level: MessageLevel.DANGER});
        } else {
            pushNotification({message: 'Login successful.', level: MessageLevel.SUCCESS});
            await goto('/');
        }
    }
</script>

<section>
    <form method="post" on:submit|preventDefault={handleSubmit}>
        <h1>Login</h1>
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