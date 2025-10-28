# Portfolio Website

A modern, responsive portfolio website built with Next.js 15, showcasing my projects, skills, experience, and education as a Software Engineering student.

## 🚀 Live Demo

Visit the live site: [adityatripathi.up.railway.app](https://adityatripathi.up.railway.app)

## ✨ Features

- **Responsive Design** - Fully optimized for mobile, tablet, and desktop devices
- **Modern UI** - Built with Tailwind CSS and shadcn/ui components
- **Dynamic Project Pages** - Individual pages for each project with detailed information
- **Type-Safe** - Full TypeScript implementation for enhanced developer experience
- **Dark Mode Support** - Theme toggle for user preference
- **Optimized Performance** - Fast loading times with Next.js App Router
- **SEO Optimized** - Meta tags and structured data for better search visibility

## 🛠️ Technologies Used

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Railway](https://railway.app/)

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── page.tsx              # Main portfolio page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   └── projects/
│       └── [slug]/
│           └── page.tsx      # Dynamic project pages
├── components/
│   └── ui/                   # shadcn/ui components
├── context/
│   └── theme-context.tsx     # Theme provider
├── lib/
│   ├── constants.ts          # Portfolio data
│   └── utils.ts              # Utility functions
└── public/                   # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/aditya04tripathi/portfolio.git
cd portfolio
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Run the development server:

```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🎨 Customization

To customize the portfolio with your own information:

1. Update personal information in `lib/constants.ts`:

   - `CREATOR_INFO` - Name, title, email, location, and social links
   - `EDUCATION` - Educational background
   - `SKILLS` - Technical and soft skills
   - `WORK_EXPERIENCE` - Professional experience
   - `PROJECTS` - Portfolio projects

2. Replace images in the `public/` directory with your own

3. Customize colors and styling in `tailwind.config.ts` and `app/globals.css`

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🌟 Key Sections

- **About** - Introduction and bio
- **Education** - Academic background
- **Technical Skills** - Programming languages, frameworks, and tools
- **Projects** - Featured projects with detailed pages
- **Work Experience** - Professional experience timeline
- **Contact** - Social links and contact information

## 📫 Contact

**Aditya Tripathi**

- Email: [adityatripathi.at04@gmail.com](mailto:adityatripathi.at04@gmail.com)
- LinkedIn: [aditya-tripathi-887586379](https://www.linkedin.com/in/aditya-tripathi-887586379)
- GitHub: [@aditya04tripathi](https://github.com/aditya04tripathi)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)

---

Made with ❤️ by Aditya Tripathi
