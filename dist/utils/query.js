export const toQueryString = (v) => {
    if (typeof v === "string")
        return v;
    if (Array.isArray(v))
        return v[0];
    return undefined;
};
//# sourceMappingURL=query.js.map