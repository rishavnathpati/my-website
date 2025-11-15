# Hierarchy & Focus Improvements

## Problem
- Cool work buried in long paragraphs
- No immediate hook or "start here" section
- Everything had equal weight (skills = featured projects)
- Hard to tell what really matters

## Solution: Featured-First Approach

### 1. **New `featured/` Directory** ⭐

Created a prominent directory that visitors see first:

```
~/featured/
├── START_HERE.txt          # Quick intro to best work
├── current-work.md         # What I'm building now
└── best-projects.json      # Top 4 projects with impact
```

**Content Highlights:**
- **START_HERE.txt**: Immediately tells visitors what matters most
- **current-work.md**: Details on AI NPC work at Convai with specific achievements
- **best-projects.json**: Top 4 projects with "why_cool" explanations

### 2. **Reordered Directory Structure**

**Before:**
```
~/
├── about/
├── experience/
├── skills/
├── portfolio/
...
```

**After:**
```
~/
├── featured/       ⭐ START HERE
├── portfolio/      All projects
├── about/          Background
├── experience/     Work history
├── skills/         Technical skills
...
```

Featured content is now **first** in alphabetical order and visually marked.

### 3. **Welcome Message Hierarchy**

**Before:**
```
Quick Start:
  cat README.md
  ls
  cd about
  grep "Unity"
```

**After:**
```
⭐ Start Here (the good stuff):
  cat featured/START_HERE.txt
  cat featured/current-work.md
  cat featured/best-projects.json

📚 Full Exploration:
  tree, grep "AI", help, tour
```

### 4. **Smart Hints Prioritize Cool Stuff**

When users type `hint`:

**Before:**
- Generic "get oriented" commands
- Equal weight to all sections

**After:**
- **Section 1**: "Best Stuff First" - featured content
- **Section 2**: "Discovery" - search and explore
- **Section 3**: "Full Details" - comprehensive info

### 5. **Updated Tour Flow**

**Before:**
- STEP 1: Understanding the File System (generic)
- STEP 2: Navigation Commands
- etc.

**After:**
- **STEP 1: Start with the Good Stuff** - featured/
- STEP 2: Understanding the File System
- STEP 3: Navigation Commands
- etc.

### 6. **Hero Section Hook**

**Before (typed animation):**
```
I'm a Software Engineer
I'm an Interactive Media Developer @ Convai
I'm a Unity GameDev | 2D | 3D | AR/VR |
```

**After (action-focused):**
```
I'm building AI NPCs that can actually talk
I'm wiring speech systems into Unity
I'm making VR characters feel real
I'm shipping games & interactive experiences
```

## Visual Hierarchy Through Symbols

- ⭐ = featured/highlighted content
- 🎮 = game/interactive work  
- 🧠 = ML/AI projects
- 📄 = publications
- 🎯 = suggestions/next steps

## Content Hierarchy in Files

### START_HERE.txt Structure:
1. **Hook**: "If you're short on time, here's what matters"
2. **Current Work**: AI NPCs at Convai (most recent/relevant)
3. **Best Projects**: Top 4 with emojis and impact
4. **Quick Commands**: How to explore more
5. **Full Tour**: Link to comprehensive content

### best-projects.json Structure:
Each project includes:
- `title`: Project name
- `tech`: Technologies used
- `description`: What it does
- `impact`: Measurable results
- **`why_cool`**: Why this project matters ← KEY ADDITION

## User Journey Now

### First-time Visitor:
1. Sees ASCII art welcome
2. **Immediately directed to** `cat featured/START_HERE.txt`
3. Reads about current AI NPC work
4. Sees top 4 projects with impact
5. Chooses to explore more or reach out

### Time-pressed Recruiter:
1. Types `cat featured/START_HERE.txt`
2. Reads current work section
3. Views best projects JSON
4. Gets contact info
**Total time: 2-3 minutes to see best work**

### Deep Explorer:
1. Runs `tour` command
2. STEP 1 directs to featured/
3. Then explores full portfolio
4. Uses `grep` to find specific tech

## Key Metrics

**Before:**
- Best work visibility: 5th+ command
- Time to see cool stuff: 5+ minutes
- Equal weight to all sections

**After:**
- Best work visibility: 1st command
- Time to see cool stuff: 30 seconds
- Featured content dominates initial experience

## Terminal Commands by Priority

### Tier 1 (First mentions):
```bash
cat featured/START_HERE.txt
cat featured/current-work.md
cat featured/best-projects.json
```

### Tier 2 (Discovery):
```bash
grep "AI"
tree
tour
```

### Tier 3 (Deep dive):
```bash
cat about/profile.md
cat portfolio/projects.md
cat skills/summary.txt
```

## What This Solves

✅ **Clear hook**: Featured section immediately shows what's interesting
✅ **Best work stands out**: Separate directory + prominent mentions
✅ **Hierarchy**: Cool stuff → Full details → Generic info
✅ **Time-efficient**: Busy visitors see best work in 30 seconds
✅ **Still explorable**: Full content available for deep divers

## The Experience

**Visitor lands on site:**
1. ASCII welcome with featured/ commands
2. Types first suggested command
3. Reads concise, impact-focused content
4. Sees best 4 projects with "why this matters"
5. Can dive deeper OR get contact info

**Every interaction reinforces:**
"Here's the cool stuff first, everything else if you want it"

---

## Next User Interaction

When someone types:
- `ls` → featured/ appears first
- `tree` → featured/ at top of tree
- `hint` → suggests featured/ commands first
- `tour` → STEP 1 is featured content
- `help` → (could add featured section)

The hierarchy is **baked into every interaction**.

