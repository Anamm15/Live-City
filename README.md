# 🏙️ Live-City: Building Sustainable Communities

**Live-City** is a Smart City platform designed to accelerate the realization of **SDG 11: Sustainable Cities and Communities**.
It serves as a comprehensive digital bridge between citizens and local government, streamlining bureaucracy, enhancing transparency, and fostering active civic participation through a unified web ecosystem.

---

## 🌍 Core Features

### 📜 E-Government & Bureaucracy
- **Online Submissions:** Simplify administrative processes (e.g., land permits/tanah, business licenses) without physical queues.
- **Public Reporting (Lapor!):** A direct channel for citizens to report infrastructure issues (e.g., potholes, broken street lights).
- **Civil Registry:** Centralized management for citizen data, including Family Cards (KK) and ID Numbers (NIK).

### 📢 Information & Social Hub
- **Social News Feed:** An Instagram-style news portal where the administration shares updates. Citizens can **Like** and **Comment** to interact.
- **Village & Facility Directory:** detailed information about village profiles and public facilities available to visitors and residents.

### 🤝 Civic Engagement & Gamification
- **Participatory Polling:** A democratic tool where the government or DPD can propose ideas, and citizens vote to influence decision-making.
- **Contribution Rewards:** A gamified system where active citizens earn **Points** for every verified report or constructive interaction.

---

## 🛠️ Tech Stack

Built with a robust and modern JavaScript/TypeScript ecosystem for seamless development and scalability.

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white) | High-performance SSR/CSR for the user interface |
| **Backend** | ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white) | Flexible and robust Node.js web application framework |
| **Runtime** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) | JavaScript runtime for the server-side environment |
| **Database** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white) | Relational database for complex citizen data |
| **ORM** | ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white) | Modern ORM for type-safe database access |

---

## 🗺️ Future Improvements & Roadmap

To evolve Live-City into a fully integrated "Smart City" OS, the following features are planned:

### 📍 GIS & Real-Time Integration
- **Live Traffic Map:** Real-time congestion monitoring to help citizens plan their commute.
- **Geo-Tagging Visualization:** Display reported issues (potholes, floods) on an interactive heatmap.

### 🌤️ Environmental Monitoring
- **Weather & AQI:** Integration with weather APIs to show real-time temperature and Air Quality Index.
- **Disaster Alerts:** Early warning system for floods or earthquakes based on location.

### 🤖 Automation
- **AI Verification:** Automated preliminary checks for document submissions to reduce manual workload.

---

## 📦 How to Run

### Prerequisites
- Node.js (v18+) & npm/yarn
- PostgreSQL Database running locally

### 1️⃣ Clone the Repository
```bash
git clone [https://github.com/yourusername/live-city.git](https://github.com/yourusername/live-city.git)
cd live-city
```

### 2️⃣ Backend Setup (Express + Prisma)
```bash
cd backend
# Install dependencies
npm install

# Create .env file and set DATABASE_URL
cp .env.example .env

# Generate Prisma Client & Push Schema
npx prisma generate
npx prisma db push

# Start the server
npm run dev
```

3️⃣ Frontend Setup (Next.js)
```bash
cd frontend
# Install dependencies
npm install

# Create .env file and set DATABASE_URL
cp .env.example .env

# Start the development server
npm run dev
```

---

## 🧑‍💻 Author
Choirul Anam
Computer Science student exploring full-stack development, backend architecture, and distributed systems.

---

## 📄 License
This project is open source and free to use for learning and educational purposes.
