export const toQueryString = (v: unknown) => {
    if (typeof v === "string") return v;
    if (Array.isArray(v)) return v[0];
    return undefined;
};