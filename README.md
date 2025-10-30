# ARYA - Always Ready, Always Ahead
Folder Structure
project-root/
│
├── src/
│   ├── api/
│   │   ├── routes/               # All Express routes (organized by feature)
│   │   ├── controllers/          # Request handlers
│   │   ├── services/             # Business logic
│   │   ├── models/               # Mongoose or Sequelize models
│   │   ├── validators/           # Joi/Zod input validations
│   │   └── middlewares/         # Auth, error handlers, etc.
│
├── config/                       # Env configs, DB, API keys
├── jobs/                         # Cron jobs / background jobs (BullMQ, Agenda, etc.)
├── scripts/                      # CLI scripts or DB seeders
├── utils/                        # Helper functions
├── constants/                    # App-wide constants
├── logs/                         # Log files (if not using external logging)
│
├── tests/                        # Unit and integration tests
├── public/                       # Public assets (if any)
├── views/                        # Views if using templating engine (e.g., EJS)
│
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js or app.js          # Entry point