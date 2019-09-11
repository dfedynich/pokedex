export default function localStorageCacheDecorator({key, id, func}) {
    return async function() {
        const cacheValue = localStorage.getItem(key);
        let parsedValue = {};

        if (cacheValue) {
            parsedValue = JSON.parse(cacheValue);

            if (id) {
                if (parsedValue[id] !== undefined) {
                    return parsedValue[id];
                }
            } else {
                return parsedValue;
            }
        }

        const result = await func.apply(this, arguments);

        if (id) {
            parsedValue[id] = result;
        } else {
            parsedValue = result;
        }

        const newCacheValue = JSON.stringify(parsedValue);
        localStorage.setItem(key, newCacheValue);

        return result;
    };
}