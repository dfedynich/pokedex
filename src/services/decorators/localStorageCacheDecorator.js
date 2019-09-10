export default function localStorageCacheDecorator(key, func) {
    return async function() {
        const cacheValue = localStorage.getItem(key);
        if (cacheValue) {
            const parsedValue = JSON.parse(cacheValue);
            return parsedValue;
        }

        const result = await func.apply(this, arguments);

        const newCacheValue = JSON.stringify(result);
        localStorage.setItem(key, newCacheValue);

        return result;
    };
}