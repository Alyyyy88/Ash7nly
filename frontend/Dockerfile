FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

COPY dashboard/pnpm-lock.yaml dashboard/package.json ./

RUN pnpm install --frozen-lockfile

COPY dashboard/ .

RUN pnpm build

FROM nginx:alpine

LABEL maintainer="Ash7nly"
LABEL description="Ash7nly Frontend - React Application"
LABEL version="1.0"

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]