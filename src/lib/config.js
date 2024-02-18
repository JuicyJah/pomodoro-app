const { MODE } = import.meta.env

export const FOCUS_INTERVAL = MODE == "development" ? 8000 : 25 * 60 * 1000
export const BREAK_INTERVAL = MODE == "development" ? 5000 : 5 * 60 * 1000
export const INTERMISSION_INTERVAL = MODE == "development" ? 3000 : 20 * 60 * 1000
