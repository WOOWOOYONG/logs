#!/usr/bin/env bash
# Pull logs content from the woowooyong-streaming repo into src/content/logs/
# so Astro's content collection can read them at build time.
set -euo pipefail

STREAMING_REPO="${STREAMING_REPO:-https://github.com/WOOWOOYONG/woowooyong-streaming.git}"
TARGET_DIR="src/content/logs"
TMP_DIR=".streaming-content"

rm -rf "$TARGET_DIR" "$TMP_DIR"
git clone --depth 1 --quiet "$STREAMING_REPO" "$TMP_DIR"
mkdir -p "$TARGET_DIR"

if [ -d "$TMP_DIR/logs" ]; then
  # `/.` so dotfiles like .gitkeep are included; cp survives an empty source
  cp -R "$TMP_DIR/logs/." "$TARGET_DIR/" 2>/dev/null || true
fi

rm -rf "$TMP_DIR"
echo "Synced logs from $STREAMING_REPO"
