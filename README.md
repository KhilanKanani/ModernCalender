# Advanced Calendar with Smart Notes & Range Selection

A **modern, interactive, and feature-rich calendar application** built using **React**, designed to handle both **single-day notes and date-range notes** with a clean UI and persistent storage.

---

## 🚀 Live Features Overview

* 📆 Dynamic Monthly Calendar
* 🧠 Smart Date & Range Selection
* 📝 Notes for Single & Range Dates
* 💾 LocalStorage Persistence
* 🎨 Dynamic Theme per Month
* ✨ Animated UI (Framer Motion)
* 📊 Visual Indicators (dots, ranges, highlights)
* 📱 Fully Responsive Design

---

## 🧠 Core Concept

This project simulates a **real-world calendar system** where users can:

* Select **a single date**
* Select **a range of dates**
* Attach notes to both
* Persist data locally
* View notes visually inside the calendar

---

## 🏗️ Architecture Overview

```
User Interaction
      ↓
State Management (React Hooks)
      ↓
Key Generation System
      ↓
Notes Object (Single / Range)
      ↓
LocalStorage Sync
      ↓
UI Rendering (Calendar + Notes)
```

---

## 📦 State Management

| State          | Description            |
| -------------- | ---------------------- |
| `currentMonth` | Active calendar month  |
| `selectedDate` | Single selected date   |
| `startDate`    | Range start            |
| `endDate`      | Range end              |
| `notes`        | Stores all notes       |
| `input`        | Note input field       |
| `position`     | Draggable note card    |
| `loaded`       | Prevents overwrite bug |

---

## 🎯 Date Selection System

### Range Selection

* First click → Start Date
* Second click → End Date
* Third click → Reset

---

### Single Date

* Double click → Select single date

---

## 📝 Notes System

### Features:

* Add note
* Edit note
* Delete note
* Auto-fill existing notes

---

### Validation Rules

| Rule                | Condition   |
| ------------------- | ----------- |
|  No selection       |   Error     |
|  Empty note         |   Warning   |
|  Less than 3 chars  |   Error     |

---

### Note Indicators

| Condition   | Indicator   |
| ----------- | ----------- |
| Single Note | 🔵 Dot     | 
| Range       | 🟣 Line    |
| Overlap     | ✨ Sparkle |

---

### Used for

* Monthly note display
* Clean organization

---

## 🧲 Draggable Notes Panel

Built using **Framer Motion**

* Drag anywhere
* Smooth movement
* Position stored in state

---

## 📱 Responsive Design

* Mobile-first layout
* Adaptive grid system
* Floating note editor (bottom on mobile)
* Smooth scrolling

---

## 🔁 User Flow

1. Open calendar
2. Select date or range
3. Write note
4. Save note
5. Data stored in localStorage
6. UI updates instantly

---

## 🛠️ Tech Stack

* ⚛️ React (Hooks)
* 📆 Day.js
* 🎞 Framer Motion
* 🎨 Tailwind CSS
* 🔔 Sonner (toast notifications)
* 🎯 Lucide React Icons

---

## 👨‍💻 Author

**Khilan Kanani**
Full Stack Developer (MERN Stack)

---

https://github.com/user-attachments/assets/f108eaa3-204e-4330-826d-52379af87b00

---

<img width="1908" height="1036" alt="Screenshot 2026-04-09 134118" src="https://github.com/user-attachments/assets/f5e3282d-c210-46cc-94cb-1f1c68abf4d0" />

---
<img width="1909" height="1030" alt="Screenshot 2026-04-09 134131" src="https://github.com/user-attachments/assets/7736d3b2-8cb3-4194-84ee-c90ab9cf65a6" />

---
<img width="1906" height="1031" alt="Screenshot 2026-04-09 134351" src="https://github.com/user-attachments/assets/e255f928-c677-4b32-8311-5726f4a94ed7" />

