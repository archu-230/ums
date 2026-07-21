const pm2Config = {
    apps: [
        {
            name: "ums-server",
            script: "main.js",

            exec_mode: "cluster",
            instances: "max",

            watch: false,
            max_memory_restart: "300M",

            env: {
                NODE_ENV: "development",
            },

            env_production: {
                NODE_ENV: "production",
            },

            autorestart: true,
            max_restarts: 10,
            min_uptime: "10s",
            restart_delay: 3000,
        },
    ],
};

module.exports = pm2Config;