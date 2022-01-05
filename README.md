# sveltekit-supabase-poc

## Installation

1. Clone repo.
2. `cp .env.example .env`
3. `npm install`
4. `docker-compose up -d`
5. `npm run dev`
6. Go to http://localhost:3000/project/default/sql.
7. Run the following script:
```postgresql
CREATE TABLE twits (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	user_id uuid NOT NULL,
	created_at timestamptz NULL DEFAULT now(),
	body text NOT NULL,
	CONSTRAINT twit_pkey PRIMARY KEY (id)
);
```

## Demos
The following routes are available:
1. http://localhost:8888/register
2. http://localhost:8888/login
3. http://localhost:8888/twit
4. http://localhost:3000 Supabase dashboard

## TODO:
1. Image upload to test Supabase Storage.
2. Live tweet updates to test Supabase Realtime.
3. OAuth login.
4. Make it more presentable.
5. Include a docker service for Svelte's dependencies to make project setup simpler.
6. Assess the DX.
7. Figure out how to secure the Supabase dashboard.
