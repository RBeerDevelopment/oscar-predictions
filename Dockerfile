# Use Bun official image
FROM oven/bun:1 AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Accept build arguments for environment variables
# Note: Database and API keys are needed at build time because the database client
# initializes at module load time, and Next.js may import these modules during build.
# These are passed as build args but should ideally use Docker BuildKit secrets
# for production to avoid storing them in image layers.
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG DATABASE_URL
ARG DATABASE_AUTH_TOKEN

# Set build-time environment variables
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV DATABASE_URL=$DATABASE_URL
ENV DATABASE_AUTH_TOKEN=$DATABASE_AUTH_TOKEN
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js app
RUN bun run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Note: Runtime secrets (DATABASE_URL, DATABASE_AUTH_TOKEN, TMDB_API_KEY, 
# ADMIN_USER_ID, CLERK_SECRET_KEY) should be passed via -e flags or 
# docker-compose env_file when running the container, not baked into the image.

# Copy necessary files from standalone build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application using the standalone server
CMD ["bun", "server.js"]

