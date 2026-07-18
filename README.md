<div align="center">

# ✈️ AI Travel Agent

### An AI-Powered Travel Agency Website with IBM watsonx Orchestrate

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![IBM watsonx](https://img.shields.io/badge/IBM%20watsonx-0F62FE?style=for-the-badge&logo=ibm&logoColor=white)](https://www.ibm.com/watsonx)

**Live Demo** · **[GitHub Repository](https://github.com/shrutichaurasia-dev/AI-Travel-Agent)**

</div>

---

## 📌 Project Overview

**AI Travel Agent** is a fully responsive, modern travel agency website that leverages the power of **IBM watsonx Orchestrate AI** to provide intelligent, real-time trip planning assistance. Users can explore destinations, browse packages, book enquiries and chat with an AI assistant — all in one seamless experience.

Built with pure **HTML5, CSS3 and Vanilla JavaScript** — no frameworks, no build tools, opens directly in any browser.

---

## ✨ Features

### 🌐 Website Sections
| Section | Description |
|---|---|
| 🏠 **Hero** | Full-screen travel background, animated heading, live destination search with 30+ destinations |
| ℹ️ **About** | Agency story, AI-powered features — AI Planning, 24/7 Support, Budget Packages |
| ⚙️ **Services** | 6 service cards — Flight, Hotel, Holiday Packages, Visa, Insurance, Cab |
| 🗺️ **Destinations** | 6 popular destinations (Paris, Dubai, Bali, Switzerland, Maldives, Japan) with explore modals |
| 💼 **Packages** | 3 tier cards — Basic ($499), Premium ($1,199), Luxury ($3,499) with filter tabs |
| ⭐ **Testimonials** | Auto-play slider with 5 customer reviews |
| ❓ **FAQ** | 6-item smooth accordion |
| 📧 **Contact Form** | Name, Email, Destination, Message — with Formspree real email delivery |
| 📰 **Newsletter** | Email subscription with confirmation feedback |
| 🔗 **Footer** | Quick links, services, contact info, social icons |

### 🎨 UI / UX
- ✅ Fully responsive — desktop, tablet & mobile
- ✅ Glassmorphism card design
- ✅ Sticky frosted-glass navbar (transparent → white on scroll)
- ✅ Scroll-reveal animations with stagger delays
- ✅ Hero parallax scrolling effect
- ✅ Animated stats counter (50k+ travellers, 120+ destinations)
- ✅ Live destination search dropdown (30+ destinations including India — Goa, Rajasthan, Kerala, etc.)
- ✅ Destination explore modal with details, pricing & highlights
- ✅ Package filter tabs (All / Basic / Premium / Luxury)
- ✅ FAQ accordion with smooth open/close
- ✅ Toast notifications system
- ✅ Page loading animation (plane)
- ✅ Back to top button
- ✅ Mobile hamburger menu with smooth transition
- ✅ Testimonials auto-slider with dot navigation

### 🤖 AI Chat
- ✅ Floating **"Chat with AI"** button (bottom-right)
- ✅ Custom chat panel — opens/closes with animation
- ✅ Smart response engine covering 15+ travel topics
- ✅ Quick-start suggestion buttons
- ✅ Typing indicator (animated dots)
- ✅ IBM watsonx Orchestrate integration — loads in background

---

## 🛠 Technologies Used

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic markup, ARIA labels, accessibility |
| **CSS3** | Custom properties, Grid, Flexbox, Glassmorphism, Keyframe animations |
| **Vanilla JavaScript (ES5/6)** | DOM manipulation, Intersection Observer, fetch API |
| **Font Awesome 6** | All icons via CDN |
| **Google Fonts** | Inter (body) + Playfair Display (headings) |
| **Unsplash CDN** | High-quality destination imagery |
| **Formspree** | Real email delivery from contact form (no backend) |
| **IBM watsonx Orchestrate** | AI chat assistant via embed script |

---

## 🤖 IBM watsonx Orchestrate Integration

The website integrates IBM watsonx Orchestrate AI assistant using the official embed script. The configuration is loaded at runtime and initialised automatically on every page load.

```js
window.wxOConfiguration = {
  orchestrationID: "fc3a99da4cbe4696b2ae11c2d731e8e4_b50b3cca-362d-495b-9eca-472c42ee271a",
  hostURL: "https://us-south.watson-orchestrate.cloud.ibm.com",
  rootElementID: "root",
  deploymentPlatform: "ibmcloud",
  crn: "crn:v1:bluemix:public:watsonx-orchestrate:us-south:a/fc3a99da4cbe4696b2ae11c2d731e8e4:b50b3cca-362d-495b-9eca-472c42ee271a::",
  chatOptions: {
    agentId: "14a43e08-c169-45f9-bf1b-992601b3b820"
  }
};
```

The loader script (`wxoLoader.js`) is dynamically injected and `wxoLoader.init()` fires automatically. A custom floating button and chat panel are built on top for full UX control.

---

## 📁 Folder Structure

```
AI-Travel-Agent/
│
├── index.html              ← Main HTML file (all sections)
│
├── css/
│   └── style.css           ← Complete stylesheet (responsive, animations, glassmorphism)
│
├── js/
│   └── script.js           ← All interactivity (search, chat, slider, FAQ, forms...)
│
├── assets/
│   └── images/             ← Local images folder (Unsplash CDN used in code)
│
├── Start Project.bat        ← One-click launcher (Windows)
│
└── README.md               ← This file
```

---

## 🚀 Installation & Running Locally

### Option 1 — Double Click (Windows)
```
Double-click  →  Start Project.bat
```
Browser will open automatically at `http://localhost:3000`

### Option 2 — Open Directly
```bash
# Simply open in any modern browser
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

### Option 3 — Local Server (recommended)
```bash
# Python
cd AI-Travel-Agent
python -m http.server 3000

# Node.js
cd AI-Travel-Agent
npx serve . -p 3000
```
Then visit → `http://localhost:3000`

### Option 4 — Clone & Run
```bash
git clone https://github.com/shrutichaurasia-dev/AI-Travel-Agent.git
cd AI-Travel-Agent
start index.html
```

---

## 📧 Contact Form Email Setup (Formspree — Free)

The contact form uses **Formspree** to send real emails — no backend required.

1. Go to **[formspree.io/new](https://formspree.io/new)** and enter your email
2. Copy your form endpoint e.g. `https://formspree.io/f/xyzabcde`
3. Open `js/script.js` and replace line ~535:
```js
var FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyzabcde';
```
That's it — users will receive a confirmation and you'll receive the enquiry!

---

## 📸 Screenshots

> *Add screenshots of the website here after deployment*

| Section | Preview |
|---|---|
| Hero | *(screenshot)* |
| Destinations | *(screenshot)* |
| Packages | *(screenshot)* |
| AI Chat | *(screenshot)* |
| Contact Form | *(screenshot)* |

---

## 📱 Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile Chrome/Safari | ✅ Full |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👩‍💻 Author

<div align="center">

**Shruti Chaurasia**

[![GitHub](https://img.shields.io/badge/GitHub-shrutichaurasia--dev-181717?style=for-the-badge&logo=github)](https://github.com/shrutichaurasia-dev)

*Built with ❤️ and IBM watsonx AI*

</div>
