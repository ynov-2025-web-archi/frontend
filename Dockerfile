#runtime
FROM node:18-alpine AS base

WORKDIR /app

COPY package*.json package-lock.json ./

RUN npm install

# build
FROM base AS build
WORKDIR /app
COPY . .
RUN npm run build

#runner 
FROM base AS runner
WORKDIR /app

COPY --from=build /app/public ./public

RUN mkdir .next

COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ENV NODE_ENV=production

EXPOSE 3000

ENV API_URL_PRODUCTS=http://localhost:3030

CMD ["node", "server.js"]