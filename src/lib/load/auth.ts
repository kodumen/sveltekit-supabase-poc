import type {LoadInput, LoadOutput} from "@sveltejs/kit";
import {browser} from "$app/env";
import supabase from "$lib/supabase";

export const guest = async (input:LoadInput):Promise<LoadOutput> => {
    const user = browser ?
        supabase.auth.user() :
        (await supabase.auth.api.getUserByCookie(input.session.cookies)).user;

    if (user === null) {
        return null
    }

    return {status: 302, redirect: '/'};
}