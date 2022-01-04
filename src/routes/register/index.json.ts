import supabase from "$lib/supabase";
import type {RequestHandler} from "@sveltejs/kit";
import type {Locals} from "$lib/types";

export const post:RequestHandler<Locals, FormData> = async (request) => {
    await supabase.auth.signUp({
        email: request.body.get('email'),
        password: request.body.get('password')

    });

    return {
        status: 303,
        headers: {
            location: 'http://localhost:8888/login'
        }
    };
}
