import {writable} from "svelte/store";
import type {Writable} from "svelte/store";

export enum MessageLevel {
    INFO,
    WARNING,
    DANGER,
    SUCCESS
}

export type Message = {
    message: string,
    level?: MessageLevel,
    timeout?: number
}

const DEFAULT_TIMEOUT = 10000;

export const messages: Writable<Message[]> = writable([]);

export function push(message: Message): void {
    message = {...{level: MessageLevel.INFO, timeout: DEFAULT_TIMEOUT}, ...message}

    messages.update(current => [message, ...current]);

    setTimeout(() => remove(message), message.timeout)
}

function remove(message: Message): void {
    messages.update(current => current.filter(m => m !== message))
}

export default {
    messages,
    push,
}