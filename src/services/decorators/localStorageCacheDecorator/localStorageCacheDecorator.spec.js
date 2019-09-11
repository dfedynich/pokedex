import React from 'react';
import localStorageCacheDecorator from './localStorageCacheDecorator';


const Counter = {
    count: 0,
    increase() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(++this.count), 100);
        });
    }
};

const localStorageKey = 'testKey';

describe('localStorageCacheDecorator', () => {
    beforeEach(() => {
        Counter.count = 0;
        localStorage.clear();
    });

    describe('Cache func result by key', () => {
        it('should save func result to localStorage', async () => {
            let initialCacheValue = localStorage.getItem(localStorageKey);
            expect(initialCacheValue).toBeNull();
            expect(Counter.count).toEqual(0);

            const counterIncreaseCached = localStorageCacheDecorator({key: localStorageKey, func: Counter.increase});
            const increasedValue = await counterIncreaseCached.call(Counter);

            expect(increasedValue).toEqual(1);
            expect(localStorage.getItem(localStorageKey)).toEqual('1');
        });

        it('should get cached result from localStorage without calling a func again', async () => {
            let initialCacheValue = localStorage.getItem(localStorageKey);
            expect(initialCacheValue).toBeNull();
            expect(Counter.count).toEqual(0);

            const counterIncreaseCached = localStorageCacheDecorator({key: localStorageKey, func: Counter.increase});
            const increasedValue = await counterIncreaseCached.call(Counter);
            Counter.count++;
            const cachedValue = await counterIncreaseCached.call(Counter);

            expect(increasedValue).toEqual(1);
            expect(Counter.count).toEqual(2);
            expect(cachedValue).toEqual(1);
        });
    });
});




