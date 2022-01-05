import type {LoadInput, LoadOutput} from "@sveltejs/kit";
import {browser} from "$app/env";
import supabase from "$lib/supabase";
import type {User} from "@supabase/supabase-js";

async function resolveUserFromSession(session):Promise<User|null> {
    // TODO: This check is not yet working on the server side. Make it work.
    const req = {cookies: session.cookies};
    return browser ?
        supabase.auth.user() :
        (await supabase.auth.api.getUserByCookie(req)).user;
}

export const guest = async (input:LoadInput):Promise<LoadOutput> => {
    const user = await resolveUserFromSession(input.session);

    if (user === null) {
        return null
    }

    return {status: 302, redirect: '/'};
}

export const auth = async (input:LoadInput):Promise<LoadOutput> => {
    const user = await resolveUserFromSession(input.session);

    if (user === null) {
        return {status: 302, redirect: '/login'};
    }

    return null;
}

