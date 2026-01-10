# Regional Pi Hub

A decentralized community hub for the regional area (Slovenia to Greece to Romania and beyond), built on Pi Network blockchain technology. Connect pioneers, share experiences, propose ideas, and participate in DAO governance.

## Features

- **Pi Network Authentication** - Secure login through Pi Browser
- **Multi-language Support** - 14 languages covering all supported countries
- **Location Analytics** - GPS-based user and Pi Node tracking
- **Community Forums** - Discussion boards for knowledge sharing
- **Proposal System** - Submit and vote on community proposals
- **Member Directory** - Track active members across regions
- **Event Calendar** - Community events and meetups
- **Pi Node Analytics** - Track node distribution across countries

## Supported Countries

Slovenia, Croatia, Bosnia and Herzegovina, Serbia, Montenegro, North Macedonia, Albania, Kosovo, Bulgaria, Romania, Greece, Hungary, Austria, and Italy.

## Tech Stack

- **Framework**: Next.js 15.2 (React 19)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Radix UI
- **Blockchain**: Pi Network SDK
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Location**: Geolocation API

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Pi Network developer account
- Backend API configured (see Environment Variables)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/regional-pi-hub.git
cd regional-pi-hub
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (see below)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in Pi Browser

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Pi Network Configuration
NEXT_PUBLIC_PI_SDK_URL=https://sdk.minepi.com/pi-sdk.js
NEXT_PUBLIC_PI_SANDBOX_MODE=true

# Backend API
NEXT_PUBLIC_API_BASE_URL=https://regionalpihub.pinet.com
NEXT_PUBLIC_API_VERSION=v1
```

### Environment Variables Explanation

- `NEXT_PUBLIC_PI_SDK_URL` - Pi Network SDK URL (production or sandbox)
- `NEXT_PUBLIC_PI_SANDBOX_MODE` - Set to `true` for development, `false` for production
- `NEXT_PUBLIC_API_BASE_URL` - Your backend API endpoint (https://regionalpihub.pinet.com)
- `NEXT_PUBLIC_API_VERSION` - API version (default: v1)

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables in Vercel project settings:
   - `NEXT_PUBLIC_API_BASE_URL=https://regionalpihub.pinet.com`
   - `NEXT_PUBLIC_PI_SANDBOX_MODE=false` (for production)
4. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/regional-pi-hub)

### Manual Deployment

```bash
npm run build
npm run start
```

## Project Structure

```
regional-pi-hub/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main hub page
│   ├── loading.tsx        # Loading state
│   └── globals.css        # Global styles and design tokens
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── location-analytics.tsx
│   └── auth-loading-screen.tsx
├── contexts/             # React contexts
│   ├── pi-auth-context.tsx
│   ├── language-context.tsx
│   └── location-context.tsx
├── lib/                  # Utility libraries
│   ├── api.ts           # API client
│   ├── system-config.ts # System configuration
│   └── utils.ts         # Helper functions
└── public/              # Static assets
```

## Key Features Explained

### Pi Network Authentication
Users authenticate through Pi Browser using the official Pi SDK. The app requests access tokens and verifies them with your backend at `https://regionalpihub.pinet.com`.

### Location Analytics
The app requests GPS permissions to:
- Determine user country automatically
- Track user distribution across regions
- Map Pi Node locations
- Generate analytics by country

### Multi-language Support
Automatic language detection based on user location with manual override. Supports 14 languages across all regional countries.

### DAO Governance
Community-driven decision making through proposal submission and voting system powered by blockchain technology.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Languages

Edit `contexts/language-context.tsx` and add translations to the `translations` object.

### Customizing Design

Design tokens are configured in `app/globals.css` using Tailwind CSS v4 theme system.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Backend Requirements

The app expects a backend API at `https://regionalpihub.pinet.com` with the following endpoints:

- `POST /api/v1/auth/pi` - Verify Pi access token
- `POST /api/v1/location` - Store user location data
- `GET /api/v1/analytics/users` - Get user statistics
- `GET /api/v1/analytics/nodes` - Get Pi Node statistics
- `POST /api/v1/proposals` - Create proposal
- `GET /api/v1/proposals` - List proposals
- `POST /api/v1/proposals/:id/vote` - Vote on proposal

## Security

- All authentication through Pi Network SDK
- Environment variables for sensitive data
- Location data stored with user consent
- GDPR compliant data handling

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/yourusername/regional-pi-hub/issues)
- Pi Network Community: Join our forum discussions

## Acknowledgments

- Pi Network team for the SDK
- shadcn for the UI components
- The regional Pi Network community

---

Built with ❤️ for the Regional Pi Community .
