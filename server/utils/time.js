const UNIT_TO_MS = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
};

const parseDurationToMs = (duration) => {
    if (typeof duration === "number") {
        return duration;
    }

    const match = /^(\d+)\s*(s|m|h|d)$/i.exec(String(duration).trim());

    if (!match) {
        throw new Error(
            `Invalid duration format: "${duration}". Expected formats like "15m", "7d", "1h".`
        );
    }

    const [, value, unit] = match;

    return Number(value) * UNIT_TO_MS[unit.toLowerCase()];
};

module.exports = {
    parseDurationToMs,
};