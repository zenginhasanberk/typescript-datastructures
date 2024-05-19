import assert from 'assert';

class ListNode<T> {
    constructor(public val: T, public next: ListNode<T> | null = null) {}
}

export class LinkedList<T> {
    private head: ListNode<T> | null;
    private tail: ListNode<T> | null;
    private _size: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this._size = 0; // O(1) return of size
    }

    front(): T {
        assert(this.head !== null, "Attempted to call front() on an empty linked list!");
        return this.head.val;
    }

    back(): T {
        assert(this.tail !== null, "Attempted to call back() on an empty linked list!");
        return this.tail.val;
    }

    size(): number {
        return this._size;
    }

    empty(): boolean {
        return this._size === 0;
    }

    push_front(val: T): void {
        const new_head = new ListNode(val, this.head);

        // Empty linked list
        if (this.head === null) {
            this.head = new_head;
            this.tail = new_head;
            ++this._size;
            return;
        }

        // Non-empty linked list
        this.head = new_head;
        ++this._size;
    }

    push_back(val: T): void {
        const new_tail = new ListNode(val, null);

        if (this.tail === null) {
            this.head = new_tail;
            this.tail = new_tail;
            ++this._size;
            return;
        }

        this.tail.next = new_tail;
        this.tail = new_tail;
        ++this._size;
    }

    pop_front(): void {
        assert(this.head !== null, "Attempted to call pop_front() on an empty linked list!");
        this.head = this.head.next;

        // If new head isn't null, set it's prev to be null
        if (this.head === null) {
            this.tail = null;
        }

        --this._size;
    }

    pop_back(): void {
        assert(this.tail !== null, "Attempted to call pop_back() on an empty linked list!");

        let current: ListNode<T> | null = this.head;

        while (current!.next && current!.next.next) {
            current = current!.next;
        }

        // Current is one before last
        current!.next = null;
        this.tail = current;
        --this._size;
    }

    reverse(): void {
        // No need to do anything for empty or 1 element case
        if (this.head === null || this.head === this.tail) return;

        let prev: ListNode<T> | null = null;
        let current: ListNode<T> | null = this.head;
        let temp: ListNode<T> | null;

        this.tail = this.head;

        while (current !== null) {
            temp = current.next;
            current.next = prev;
            prev = current;
            current = temp;
        }

        this.head = prev;
    }

    delete_one(val: T): number {
        let prev: ListNode<T> | null = null;
        let current: ListNode<T> | null = this.head;

        while (current != null) {

            if (current.val === val) {    
                if (current === this.head) {
                    this.pop_front();
                } else if (current === this.tail) {
                    this.pop_back();
                } else {
                    // Can never be null because of previous check.
                    prev!.next = current!.next;
                    --this._size;
                }

                return 1;
            }
            prev = current;
            current = current.next;
        }

        return 0;
    }

    delete_all(val: T): number {
        let prev: ListNode<T> | null = null;
        let current: ListNode<T> | null = this.head;
        let initial_size = this._size;

        while (current != null) {

            // Deletion logic
            if (current.val === val) {
                if (current === this.head) {
                    current = current.next;
                    prev = null;
                    this.pop_front();
                } else if (current === this.tail) {
                    current = null;
                    this.pop_back();
                } else {
                    // Can never be null because of previous check.
                    prev!.next = current!.next;
                    current = current!.next;
                    // Prev stays as prev
                    --this._size;
                }
            // No match, move forward
            } else {
                prev = current;
                current = current.next;
            }
        }

        return initial_size - this._size;
    }

    insert_index(val: T, index: number): void {
        assert(index <= this._size, "Attempted to call .insert() to an invalid index!");
        
        if (index === 0) {
            this.push_front(val);
        }
        else if (index === this._size) {
            this.push_back(val);
        }
        else {
            const new_node = new ListNode<T>(val);

            let count: number = 0;
            let prev_node: ListNode<T> | null = this.head;

            while (count + 1 < index) {
                // Can safely do because index is definitely inside the linked list.
                prev_node = prev_node!.next;
                ++count;
            }

            new_node.next = prev_node!.next!;
            prev_node!.next = new_node;
            ++this._size;
        }
    }

    delete_index(val: T, index: number) {
        assert(index <= this._size, "Attempted to call .insert() to an invalid index!");

        if (index === 0) {
            this.pop_front();
        }
        else if (index === this._size) {
            this.pop_back();
        }
        else {
            let count: number = 0;
            let prev_node: ListNode<T> | null = this.head;

            // Need to get element right before removal.
            while (count + 1 < index) {
                // Can safely do because index is definitely inside the linked list.
                prev_node = prev_node!.next;
                ++count;
            }
            prev_node!.next = prev_node!.next!.next;
            --this._size;
        }

    }

    forEach(fn: (val: T) => void): void {
        let current: ListNode<T> | null = this.head;

        while (current !== null) {
            fn(current.val);
            current = current.next;
        }
        
    }

    toArray(): Array<T> {
        const arr = new Array(this._size);

        let current: ListNode<T> | null = this.head;
        let index = 0;

        while (current !== null)  {
            arr[index++] = current.val;
            current = current.next;
        }

        return arr;
    }

    toString(callback?: (value: T) => string): string {
        try {
            return this.toArray().map((elem) => elem!.toString()).join(",");
        } catch (err) {
            throw new Error(`Elements do not have a toString() method!`);
        }
    }

    deepCopy(): LinkedList<T> {
        let copy = new LinkedList<T>()
        let current: ListNode<T> | null = this.head;

        while (current !== null)  {
            copy.push_back(current.val);
            current = current.next;
        }

        return copy;
    }
}
