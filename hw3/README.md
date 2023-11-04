## Running the app

1. Clone the repo

2. Install dependencies

```bash
yarn install
```

3. Create a `.env.local`

```bash
POSTGRES_URL="postgres://postgres:postgres@localhost:5432/twitter"
```

4. Run the migrations

```bash
yarn migrate
```

4. Start the app

```bash
yarn dev
```