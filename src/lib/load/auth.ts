import type {LoadInput, LoadOutput} from "@sveltejs/kit";
import {browser} from "$app/env";
import supabase from "$lib/supabase";

export const guest = async (input:LoadInput):Promise<LoadOutput> => {
    // TODO: This check is not yet working on the server side. Make it work.
    const req = {cookies: input.session.cookies};
    const user = browser ?
        supabase.auth.user() :
        (await supabase.auth.api.getUserByCookie(req)).user;

    console.log(browser, req, user);

    if (user === null) {
        return null
    }

    return {status: 302, redirect: '/'};
}