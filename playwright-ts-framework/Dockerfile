FROM mcr.microsoft.com/playwright:focal
WORKDIR /work
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npx playwright install --with-deps
CMD ["npx", "playwright", "test", "--project=chromium", "--reporter=html"]
