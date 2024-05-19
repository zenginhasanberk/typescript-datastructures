import { LinkedList } from '../linked-list/linked-list'
import assert from 'assert';

const DEFAULT_HASH_MAP_SIZE: number = 16; // 16 is a good default

class HashMap<K, V> {
    private buckets: Array<LinkedList<V>>;
    private _size: number;

    constructor(initial_size?: number) {
        if (!('toString' in Object.getPrototypeOf({} as K))) {
            throw new Error('Key type must have a toString() method!');
        }

        this.buckets = Array(initial_size || DEFAULT_HASH_MAP_SIZE).fill(null).map(() => new LinkedList<V>());
        this._size = 0;
    }

    hash(key: K): number {
        let hash: number = 0;
        let str: string = key.toString();

        // Taken from Stack Overflow reply "https://stackoverflow.com/a/8831937/19528139"
        for (let i = 0, len = str.length; i < len; i++) {
            let chr = str.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    set(key: K, value: V): void {

    }

    get(key: K): V { }

    has(key: K): boolean { }

    delete(key: K): boolean { }

    clear(): void { }

    size(): number { }

    // keys
    // values
    // entries

    forEach(fn: (elem: V) => void): void { }

}
