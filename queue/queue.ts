import { LinkedList } from "../linked-list/linked-list";
import assert from 'assert';

export class Queue<T> {
    private list: LinkedList<T>;

    constructor() {
        this.list = new LinkedList<T>();
    }

    push(val: T): void {
        this.list.push_back(val);
    }

    pop(): void {
        assert(this.list.size() !== 0, "Attempted to call pop() on an empty queue!")
        this.list.pop_front();
    }

    front(): T {
        assert(this.list.size() !== 0, "Attempted to call front() on an empty queue!")
        return this.list.front();
    }

    empty(): boolean {  
        return this.list.size() === 0;
    }
    
    size(): number {
        return this.list.size();
    }

    toArray(): Array<T> {
        return this.list.toArray();
    }

    toString(): string {
        return this.list.toString();
    }

    deepCopy(): Queue<T> {
        let copy = new Queue<T>();
        copy.list = this.list.deepCopy();
        return copy;
    }

}