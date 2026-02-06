#!/bin/bash

# start-tunnel.sh
# Starts the Vite dev server and exposes it via Cloudflare Tunnel
# This provides a public HTTPS URL for testing mobile features (Camera, etc.)

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check for cloudflared
if ! command_exists cloudflared; then
    echo "Error: 'cloudflared' is not installed."
    echo "Please install it via:"
    echo "  curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb"
    echo "  sudo dpkg -i cloudflared.deb"
    exit 1
fi

echo "🚀 Starting Vite Dev Server (HTTP)..."
# Run Vite directly on standard port 5173 (HTTP)
# We avoid 'npm run dev' because it might be configured for HTTPS (--https) which complicates tunneling
./node_modules/.bin/vite --port 5173 > /dev/null 2>&1 &
VITE_PID=$!

echo "⏳ Waiting for server to initialize..."
sleep 3

echo "🌐 Starting Cloudflare Tunnel..."
echo "--------------------------------------------------------"
echo "Scan the QR code or click the link below to test on mobile:"
echo "--------------------------------------------------------"

# Start trycloudflare tunnel pointing to the local HTTP port
# The public URL will be HTTPS automatically
cloudflared tunnel --url http://localhost:5173

# Cleanup: Kill Vite when cloudflared exits (Ctrl+C)
kill $VITE_PID
