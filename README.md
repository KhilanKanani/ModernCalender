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

### 🟢 Range Selection

* First click → Start Date
* Second click → End Date
* Third click → Reset

---

### 🟣 Single Date

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

### Used for:

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