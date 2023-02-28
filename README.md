![CircleSub Logo](https://circlesub.com/circlesub.png)

## CircleSub

This Next.js project is a Twitch Solana tipping app using Solana Pay QR codes.

This project demonstrates the usage of:
* Solana Pay QR Codes using the Solana token
* StableThread transactions rather than using frontend polling
* Twitch Solana tipping integration

This project was created for the [Solana Riptide Hackathon](https://solana.com/riptide)

This project is live at [https://circlesub.com](https://circlesub.com)

A live user to tip is [komdodx](https://circlesub.com/tip/komdodx)

### Required ENV Vars:
* NEXTAUTH_SECRET={your own uuid v4}
* TWITCH_CLIENT_ID={Twitch Client ID}
* TWITCH_SECRET={Twitch Secret}
* MONGODB_URL={MongoDB SRV Connection String}
* NEXT_PUBLIC_TRANSAK={Transak API Key}
* NEXTAUTH_URL={Absolute URL for site - e.g. https://circlesub.com}
* NEXT_PUBLIC_URL={Absolute URL for site - e.g. https://circlesub.com}
* NEXT_PUBLIC_RPC={Solana RPC HTTPS URL}