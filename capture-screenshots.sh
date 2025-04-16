#!/bin/bash

# Create directories if they don't exist
mkdir -p public/portfolio/games
mkdir -p public/portfolio/ml
mkdir -p public/portfolio/publications
mkdir -p public/blog/thumbnails

# Function to capture screenshot
capture_screenshot() {
  local html_file=$1
  local output_file=$2
  
  # Open the HTML file in Safari and wait for it to load
  open -a Safari "$html_file"
  sleep 2
  
  # Capture the screenshot
  screencapture -l$(osascript -e 'tell app "Safari" to id of window 1') "$output_file"
  
  # Close Safari
  osascript -e 'tell application "Safari" to quit'
  sleep 1
}

# Capture screenshots for each placeholder
capture_screenshot "placeholder-itch-io-collection.html" "public/portfolio/games/itch-io-collection.jpg"
capture_screenshot "placeholder-journey-under-the-sea.html" "public/portfolio/games/journey-under-the-sea.jpg"
capture_screenshot "placeholder-hand-gesture-gui.html" "public/portfolio/ml/hand-gesture-gui.jpg"
capture_screenshot "placeholder-yoga-asana-trainer.html" "public/portfolio/ml/yoga-asana-trainer.jpg"
capture_screenshot "placeholder-brain-tumor-publication.html" "public/portfolio/publications/brain-tumor-publication.jpg"
capture_screenshot "placeholder-convai-integration.html" "public/portfolio/games/convai-integration.jpg"
capture_screenshot "placeholder-mac-terminal.html" "public/blog/thumbnails/mac-terminal.png"

echo "All screenshots captured successfully!"