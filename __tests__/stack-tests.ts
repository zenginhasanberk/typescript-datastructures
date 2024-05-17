import { Stack } from '../stack/stack';
import * as assert from 'assert';

describe('Stack', () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
  });

  it('should initialize an empty stack', () => {
    assert.strictEqual(stack.size(), 0);
    assert.strictEqual(stack.empty(), true);
  });

  it('should push elements onto the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    assert.strictEqual(stack.size(), 3);
    assert.strictEqual(stack.top(), 3);
  });

  it('should pop elements from the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    stack.pop();

    assert.strictEqual(stack.size(), 2);
    assert.strictEqual(stack.top(), 2);
  });

  it('should return the top element of the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    assert.strictEqual(stack.top(), 3);
  });

  it('should return true for an empty stack', () => {
    assert.strictEqual(stack.empty(), true);
  });

  it('should return false for a non-empty stack', () => {
    stack.push(1);
    assert.strictEqual(stack.empty(), false);
  });

  it('should return the size of the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    assert.strictEqual(stack.size(), 3);
  });

  it('should convert the stack to an array', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    const array = stack.toArray();

    assert.deepStrictEqual(array, [1, 2, 3]);
  });

  it('should convert the stack to a string', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    const str = stack.toString();

    assert.strictEqual(str, '1,2,3');
  });

  it('should create a deep copy of the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    const copy = stack.deepCopy();

    assert.strictEqual(copy.size(), 3);
    assert.deepStrictEqual(copy.toArray(), [1, 2, 3]);
  });

  it('should throw an error when calling pop on an empty stack', () => {
    assert.throws(() => stack.pop(), /Attempted to call pop\(\) on an empty stack!/);
  });

  it('should throw an error when calling top on an empty stack', () => {
    assert.throws(() => stack.top(), /Attempted to call front\(\) on an empty stack!/);
  });

  it('should maintain the order of elements after multiple push and pop operations', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    stack.pop();
    stack.push(4);
    stack.pop();

    assert.strictEqual(stack.top(), 2);
    assert.strictEqual(stack.size(), 2);
  });

  it('should handle large number of elements', () => {
    for (let i = 0; i < 10000; i++) {
      stack.push(i);
    }

    assert.strictEqual(stack.size(), 10000);
    assert.strictEqual(stack.top(), 9999);
  });
});