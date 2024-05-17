import { Queue } from '../queue/queue';
import * as assert from 'assert';

describe('Queue', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  it('should initialize an empty queue', () => {
    assert.strictEqual(queue.size(), 0);
    assert.strictEqual(queue.empty(), true);
  });

  it('should push elements into the queue', () => {
    queue.push(1);
    queue.push(2);
    queue.push(3);

    assert.strictEqual(queue.size(), 3);
    assert.strictEqual(queue.front(), 1);
  });

  it('should pop elements from the queue', () => {
    queue.push(1);
    queue.push(2);
    queue.push(3);

    queue.pop();

    assert.strictEqual(queue.size(), 2);
    assert.strictEqual(queue.front(), 2);
  });

  it('should return the front element of the queue', () => {
    queue.push(1);
    queue.push(2);
    queue.push(3);

    assert.strictEqual(queue.front(), 1);
  });

  it('should return true for an empty queue', () => {
    assert.strictEqual(queue.empty(), true);
  });

  it('should return false for a non-empty queue', () => {
    queue.push(1);
    assert.strictEqual(queue.empty(), false);
  });

  it('should return the size of the queue', () => {
    queue.push(1);
    queue.push(2);
    queue.push(3);

    assert.strictEqual(queue.size(), 3);
  });

  it('should convert the queue to an array', () => {
    queue.push(1);
    queue.push(2);
    queue.push(3);

    const array = queue.toArray();

    assert.deepStrictEqual(array, [1, 2, 3]);
  });

  it('should convert the queue to a string', () => {
    queue.push(1);
    queue.push(2);
    queue.push(3);

    const str = queue.toString();

    assert.strictEqual(str, '1,2,3');
  });

  it('should create a deep copy of the queue', () => {
    queue.push(1);
    queue.push(2);
    queue.push(3);

    const copy = queue.deepCopy();

    assert.strictEqual(copy.size(), 3);
    assert.deepStrictEqual(copy.toArray(), [1, 2, 3]);
  });

  it('should throw an error when calling pop on an empty queue', () => {
    assert.throws(() => queue.pop(), /Attempted to call pop\(\) on an empty queue!/);
  });

  it('should throw an error when calling front on an empty queue', () => {
    assert.throws(() => queue.front(), /Attempted to call front\(\) on an empty queue!/);
  });

  it('should maintain the order of elements after multiple push and pop operations', () => {
    queue.push(1);
    queue.push(2);
    queue.push(3);

    queue.pop();
    queue.push(4);
    queue.pop();

    assert.strictEqual(queue.front(), 3);
    assert.strictEqual(queue.size(), 2);
  });

  it('should handle large number of elements', () => {
    for (let i = 0; i < 10000; i++) {
      queue.push(i);
    }

    assert.strictEqual(queue.size(), 10000);
    assert.strictEqual(queue.front(), 0);
  });
});