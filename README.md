## CircleSub

This Next.js project is a Twitch Solana tipping app using Solana Pay QR codes.

This project demonstrates the usage of:
* Solana Pay QR Codes with SOL
* Helius Webhook for Solana Pay transactions rather than using polling
* Twitch tipping integration
* Socket.io and Next.js integration

This project was created for the Solana Grizzython Hackathon in 2023

This project is live at [https://circlesub.com](https://circlesub.com)

### Required ENV Vars:
* NEXTAUTH_SECRET={your own uuid v4}
* TWITCH_CLIENT_ID={Twitch Client ID}
* TWITCH_SECRET={Twitch Secret}
* MONGODB_URL={MongoDB SRV Connection String}
* NEXT_PUBLIC_TRANSAK={Transak API Key}
* NEXTAUTH_URL={Absolute URL for site - e.g. https://circlesub.com}
* NEXT_PUBLIC_QR_URL={Domain Name for site - e.g. circlesub.com - must be HTTPS}
* NEXT_PUBLIC_URL={Absolute URL for site - e.g. https://circlesub.com}
* NEXT_PUBLIC_RPC={Solana RPC HTTPS URL}
* HELIUS_API_KEY={Helius API Key}
* HELIUS_WEBHOOK_ID={Helius Webhook ID}
* HELIUS_WEBHOOK_SECRET={Helius Webhook Secret}
