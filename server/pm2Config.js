const APP_CONFIG = {
    name: "ums-server",
    script: "main.js",
};

const CLUSTER_CONFIG = {
    exec_mode: "cluster",
    instances: "max",
};

const WATCH_CONFIG = {
    watch: false,
    max_memory_restart: "300M",
};

const RESTART_CONFIG = {
    autorestart: true,
    max_restarts: 10,
    min_uptime: "10s",
    restart_delay: 3000,
};

const ENV_CONFIG = {
    env: {
        NODE_ENV: "development",
    },
    env_production: {
        NODE_ENV: "production",
    },
};

module.exports = {
    apps: [
        {
            ...APP_CONFIG,
            ...CLUSTER_CONFIG,
            ...WATCH_CONFIG,
            ...RESTART_CONFIG,
            ...ENV_CONFIG,
        },
    ],
};