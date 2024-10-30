ARG VARIANT=20.17

FROM node:${VARIANT}-alpine3.20 AS node_upstream

WORKDIR /workspaces/app
# hadolint ignore=DL3018
RUN apk add --no-cache \
    libc6-compat \
    curl \
    gnupg \
    openssl

# ------------------------------------------------------------------------------------------------
# Deps image
# ------------------------------------------------------------------------------------------------

# Install dependencies only when needed
FROM node_upstream AS deps

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

# ------------------------------------------------------------------------------------------------
# Build image
# ------------------------------------------------------------------------------------------------
FROM node_upstream AS builder

ARG NEXT_PUBLIC_APP_URL

ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /workspaces/app/node_modules ./node_modules

COPY ./ .

RUN npm run build

# ------------------------------------------------------------------------------------------------
# Production image, copy all the files and run next
# ------------------------------------------------------------------------------------------------
FROM node_upstream AS runner

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Set the correct permission for prerender cache
RUN mkdir .next \
    && chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /workspaces/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /workspaces/app/public ./public
COPY --from=builder --chown=nextjs:nodejs /workspaces/app/.next/static ./.next/static

# hadolint ignore=DL3016
RUN npm install pm2 -g

USER nextjs

EXPOSE 3000

ENV PORT 3000

HEALTHCHECK --interval=1m --timeout=30s --retries=5 CMD curl --fail http://localhost:${PORT} || exit 1

# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD [ "/usr/local/bin/pm2-runtime", "--max-memory-restart", "1G", "server.js" ]

# ------------------------------------------------------------------------------------------------
# Development image
# ------------------------------------------------------------------------------------------------
FROM node_upstream AS development

# hadolint ignore=DL3018
RUN apk add --no-cache \
    git \
    openssh \
    sudo \
    && echo node ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/1000 \
    && chmod 0440 /etc/sudoers.d/1000;

CMD ["sleep", "infinity"]