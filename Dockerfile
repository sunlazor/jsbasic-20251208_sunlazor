FROM node:lts

# Install dependencies for Chrome
RUN apt-get update && apt-get install -y \
    wget \
    gnupg2 \
    curl \
    apt-transport-https \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends

# Add Google Chrome repo + install Chrome Stable
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" \
        > /etc/apt/sources.list.d/google-chrome.list && \
    apt-get update && \
    apt-get install -y google-chrome-stable && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Force Chrome to always run no-sandbox
RUN mv /usr/bin/google-chrome /usr/bin/google-chrome-real && \
    echo '#!/bin/bash\n/usr/bin/google-chrome-real --no-sandbox --disable-setuid-sandbox "$@"' > /usr/bin/google-chrome && \
    chmod +x /usr/bin/google-chrome    

# Let Karma know where Chrome is
ENV CHROME_BIN=/usr/bin/google-chrome
ENV CHROME_PATH=/usr/bin/google-chrome

# Set app directory
WORKDIR /app
COPY package*.json .

# Install NPM dependencies (safe for Docker caching)
RUN npm install

# Copy the rest of the app
COPY . .

# Default command (you may override with docker run)
CMD ["npm", "test"]
