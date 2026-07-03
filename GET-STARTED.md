# 🌸 Bloom — Get Started Guide

Your cute pink lifestyle app. It tracks food + macros, suggests meals from ingredients you have, runs daily strength/cardio workouts with a check-off streak, and has a calendar for work shifts and appointments. All your data is saved **on your device** — nothing goes to the cloud.

## ✨ What's in this version

- **Today dashboard** — macro rings, water, workout, Lucas's activities, and your schedule at a glance
- **Food** — meal sections (Breakfast, Morning Snack, Lunch, Afternoon Snack, Dinner), live **USDA food database** search, ⭐ saved favorites for one-tap re-adding, and custom foods
- **Water tracker** — tap cups or +8/+16 oz toward your daily goal
- **Meals** — ingredient-based recipe finder, now with a "Log this meal" button
- **Move** — strength + cardio with check-off streaks
- **Calendar** — events with **address**, **directions/ETA link**, and **"Add to Google Calendar"** (Google then sends native "time to leave" alerts)
- **Lucas 🧸** — a fresh set of age-appropriate developmental activities each day, with check-offs (auto-calculated from his birthday)
- **Back-fill & plan ahead** — Food, Move, and Lucas screens have a date arrow (‹ ›) so you can log past days or plan future ones

The app is five files in the `BloomApp` folder:

- `index.html` — the whole app
- `manifest.json` + `sw.js` — what makes it installable & work offline
- `icons/` — the pink flower app icon

---

## ✅ Try it right now (30 seconds, on your Mac)

Just double-click **`index.html`** — it opens in your browser and fully works. Tap around, log a food, check off a workout, add a calendar event. This is the real app.

> One small note: when opened directly as a file, the "install/offline" part is off, but **every feature works**. For the true app-on-your-phone experience, do the next section.

---

## 📱 Get it on your iPhone (the real goal — free, ~15 min)

iPhones can install a web app to the home screen so it looks and behaves like an App Store app (own icon, full screen, works offline). It just needs to be served over **https**. The easiest free way is **GitHub Pages** — and you already have a GitHub account (`wildmanty12`).

### Step 1 — Put the files on GitHub
1. Go to https://github.com/new and create a repo named **`bloom`** (set it to **Public** — required for free Pages).
2. On the new repo page, click **"uploading an existing file"**.
3. Drag in **everything inside the `BloomApp` folder**: `index.html`, `manifest.json`, `sw.js`, and the whole `icons` folder. (Drag the *contents*, not the `BloomApp` folder itself, so `index.html` sits at the top level.)
4. Click **Commit changes**.

### Step 2 — Turn on GitHub Pages
1. In the repo, go to **Settings → Pages**.
2. Under "Build and deployment," set **Source = Deploy from a branch**, **Branch = `main`**, **Folder = `/ (root)`**, then **Save**.
3. Wait ~1–2 minutes. The page will show your live link, something like:
   **`https://wildmanty12.github.io/bloom/`**

### Step 3 — Install it on your phone
1. Open that link in **Safari** on your iPhone (must be Safari, not Chrome, for install).
2. Tap the **Share** button (the square with the up-arrow).
3. Scroll down and tap **"Add to Home Screen."**
4. Name it **Bloom**, tap **Add.**

Done 🎉 — the pink flower icon is now on your home screen and opens full-screen like a normal app. Because of the service worker, it even works without internet after the first open.

### Updating the app later
Edit the file on GitHub (or re-upload), commit, wait a minute — your phone gets the update next time you open it. (If it looks stale, remove the icon and re-add it.)

---

## 🍎 Optional: a *real* App Store listing later

You said store-in-the-actual-App-Store is optional, and honestly the PWA above covers ~95% of what you want for personal use with **zero cost and no Apple review**. But if you ever want a true App Store download, here's the realistic roadmap. Be aware of the real costs/effort:

1. **Apple Developer Program — $99/year.** Sign up at https://developer.apple.com/programs/ with your Apple ID. (Required for *any* App Store submission.)
2. **Wrap the web app as a native app.** Two common routes:
   - **Capacitor** (easiest for your existing code): `npm install @capacitor/cli`, then `npx cap init`, `npx cap add ios`. It wraps this exact HTML/JS into a native iOS shell. Docs: https://capacitorjs.com/docs/getting-started
   - **Rebuild in React Native / Expo** if you later want richer native features (push notifications, HealthKit, etc.).
3. **Open the project in Xcode** (free, Mac App Store — you have a Mac ✅). `npx cap open ios` launches it. Set a Bundle ID like `com.tysonwildman.bloom`, pick your developer team, and run it on the Simulator or your plugged-in iPhone.
4. **Make App Store assets:** app icon (you have the pink flower — Xcode wants a 1024×1024 too), a few screenshots, a name, a description, and a privacy note (yours is simple: "all data stored locally on device").
5. **Create the listing in App Store Connect** (https://appstoreconnect.apple.com) → "My Apps" → new app. Fill in metadata, upload the build from Xcode (Product → Archive → Distribute).
6. **Submit for review.** Apple reviews in ~1–3 days. Once approved, it's live and downloadable like any app.

**My honest recommendation:** ship the PWA today, live with it for a few weeks, see which features you actually use, *then* decide if the $99/yr + Xcode + review cycle is worth it. The wrapping step is easy when your web app is already solid — and it now is.

---

## 📅 Calendar, directions & "time to leave" notifications — how it works

You asked for appointment addresses, ETAs, and a push telling you when to leave. Here's the honest setup and why it's built this way:

A home-screen web app (especially on iPhone) **can't reliably run in the background** to track your location and push a live "leave now" alert — only a fully native app can do that. So Bloom hands that job to the tool that already does it perfectly: **Google Calendar.**

For each event you can add an **address**. Then, tapping the event gives you:

- **🧭 Directions & ETA** — opens Google Maps with live traffic and arrival time
- **📅 Add to Google Calendar** — drops the event (with the address) into your Google Calendar in one tap

Once it's in Google Calendar, **Google's own app sends the native "time to leave" notification** with live ETA — exactly what you wanted, and more reliable than anything a web app could do itself.

Bonus: Bloom also has a **🔔 Enable reminders** button in Settings. When the app is open, it'll pop a "time to head out" reminder before events (based on your "minutes before" setting). For guaranteed background alerts, lean on the Google Calendar hand-off above.

> Want true in-app push later? That comes with the native App Store build (Capacitor + Apple Push) described above — easy to add once you decide to go native.

## 🎨 Want to tweak it?

Everything is in `index.html`:

- **Rename the app** — change the `<title>`, the `🌸 Bloom` logo text, and the name in `manifest.json`.
- **Colors** — all the pinks live in the `:root { --pink-... }` block at the top of the `<style>`. Change those hex codes to re-theme instantly.
- **Foods** — add to the `FOOD_DB` array.
- **Recipes** — add to the `RECIPES` array (give it ingredients + macros).
- **Workouts** — edit the `WORKOUTS` object.
- **Lucas's activities** — edit the `BABY_BANDS` array (age ranges + activity ideas); they auto-select by his age and rotate daily.
- **Goals & son's birthday** — all editable in-app under ⚙️ Settings (no code needed).
- **USDA food database (already built in!)** — searching food now queries the free **USDA FoodData Central** database live, on top of the built-in quick picks. It works out of the box on a shared DEMO key, but that key is rate-limited, so grab your own free key (takes 30 seconds) for unlimited use:
  1. Go to **https://api.data.gov/signup/** and enter your name + email.
  2. Copy the API key they email you.
  3. In Bloom, tap **⚙️ → USDA food database** and paste the key, then **Save.**
  - Note: live USDA search needs internet and works best once the app is hosted (GitHub Pages). Opened as a local file, your browser may block the request — the built-in quick picks and custom foods always work regardless.

Enjoy, and congrats on building your app! 💖
