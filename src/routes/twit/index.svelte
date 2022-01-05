<script context="module" lang="ts">
    import type {Load} from "@sveltejs/kit";
    import supabase from "$lib/supabase";
    import {MessageLevel, push} from "$lib/notifications/store";

    export const load: Load = async function () {
        const {data, error} = await supabase.from('twits')
            .select('id,user_id,body,created_at')
            .order('created_at', {ascending: false});

        if (error) {
            push({message: error.message, level: MessageLevel.DANGER});
            return {status: 500, error: error.message}
        }

        return {
            props: {
                twits: data
            }
        };
    }
</script>

<script lang="ts">
    export let twits = [];

    async function handleSubmit(event: Event): Promise<void> {
        event.preventDefault();

        const body = new FormData(event.target as HTMLFormElement);
        const user = supabase.auth.user();

        let twit = {
            user_id: user.id,
            body: body.get('body'),
        };

        const {error} = await supabase.from('twits').insert([twit]);

        if (error) {
            push({message: error.message, level: MessageLevel.DANGER});
        } else {
            twits = [...twits, twit]
        }
    }
</script>

<div>
    <h1>Twit</h1>
    <form action="" method="post" on:submit|preventDefault={handleSubmit}>
        <div>
            <textarea name="body" id="body" cols="30" rows="10"></textarea>
        </div>
        <button type="submit">Post</button>
    </form>

    <ul>
        {#each twits as twit}
            <li>
                {twit.body}
            </li>
        {/each}
    </ul>
</div>