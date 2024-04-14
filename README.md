# SupaWriter

SupaWriter is a ten-finger typing game that helps you improve your typing speed and accuracy. It also features a
leaderboard to see how you are performing compared to others.

## How to play?

1. Go to [SupaWriter](https://supawriter.vercel.app).
2. Enter your nickname.
3. Start typing in the input box at the bottom of the random paragraph; the timer will begin.
4. You have 60 seconds to type as much as you can.
5. After the time is up, you will see your score on the leaderboard.

## Development

To set up the Supabase project and create the leaderboard, run this SQL query:

```sql
  CREATE TABLE leaderboard (
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(255),
    points INT,
    created_at TIMESTAMPTZ
  );
```

Then follow these steps to run the project locally:

```bash
    # Clone the repository
    git clone https://github.com/phibersoft/supawriter.git
    cd supawriter

    # Install dependencies
    npm install

    # Copy the .env.example file and rename it to .env.local
    cp .env.example .env.local # Linux
    copy .env.example .env.local # Windows

    # Fill the .env.local file with your Supabase project details

    # Run the project
    npm run dev

    # Open your browser and go to http://localhost:3000

    # If you decide to change something in the database, you can run the following command to generate the types
    npx supabase gen types typescript --project-id YOUR_PROJECT_ID > database.types.ts
```

## Technologies

- [Next.js](https://nextjs.org)
- [Supabase](https://supabase.io)
- [Tailwind CSS](https://tailwindcss.com)
- [Tabler Icons](https://tablericons.com)
- [ReactCountdownCircleTimer](https://www.npmjs.com/package/react-countdown-circle-timer)
- [Random Word API](https://random-word-api.vercel.app/)
