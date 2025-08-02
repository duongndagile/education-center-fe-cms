# Build stage
FROM node:20-alpine AS builder

# Cài đặt pnpm
RUN npm install -g pnpm

# Thiết lập thư mục làm việc
WORKDIR /app

ENV NODE_OPTIONS=--max-old-space-size=4096

# Copy package.json và pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Cài đặt dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build ứng dụng
RUN pnpm run build

# Production stage
FROM nginx:alpine AS production

# Copy file cấu hình nginx tùy chỉnh (nếu cần)
# COPY nginx.conf /etc/nginx/nginx.conf

# Copy static files từ build stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy cấu hình nginx cho SPA (Single Page Application)
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
