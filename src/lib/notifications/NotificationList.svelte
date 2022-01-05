<script lang="ts">
    import {messages} from "$lib/notifications/store";
    import type {Message} from "$lib/notifications/store";

    let notifications:Message[] = []

    messages.subscribe(m => notifications = m)
</script>

<section>
    <ul>
        {#each notifications as notification}
            <li>{notification.message}</li>
        {/each}
    </ul>
</section>