# Campus Amigo 🎓

The ultimate college companion app designed to help students survive and thrive on campus. 

## Features

- **🍔 Nearby Meals**: Discover food spots on and off-campus. Filter by price (₹, ₹₹, ₹₹₹) and cuisine.
- **📚 Study Notes**: Share and access lecture notes. Filter by Subject and Semester.
- **📝 Previous Year Questions (PYQs)**: Archive of past exam papers to help you ace your exams.
- **📅 Events**: Stay updated with Hackathons, Fests, and Workshops.
- **👤 Profile**: Gamified profile (Karma points) tracking your contributions (uploads/suggestions).

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Database**: SQLite (via Prisma ORM)
- **Styling**: Tailwind CSS
- **Components**: Lucide Icons, Sonner (Toasts)

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Setup Database**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Seeding Data (Important!)**:
   To view the Profile page and have initial data, run the seed script:
   ```bash
   npx prisma db seed
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components.
- `prisma/`: Database schema and seed script.
- `lib/`: Utility functions and database client.

## Contributing

Built for the hackathon! Feel free to fork and add features.
