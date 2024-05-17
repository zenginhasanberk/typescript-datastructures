import { DoublyLinkedList } from "../doubly-linked-list/doubly-linked-list";
import * as assert from 'assert';

describe('DoublyLinkedList', () => {
  let list: DoublyLinkedList<number>;

  beforeEach(() => {
    list = new DoublyLinkedList<number>();
  });

  it('should initialize an empty list', () => {
    assert.strictEqual(list.size(), 0);
    assert.strictEqual(list.empty(), true);
  });

  it('should push elements to the front', () => {
    list.push_front(1);
    list.push_front(2);
    list.push_front(3);

    assert.strictEqual(list.size(), 3);
    assert.strictEqual(list.front(), 3);
    assert.strictEqual(list.back(), 1);
  });

  it('should push elements to the back', () => {
    list.push_back(1);
    list.push_back(2);
    list.push_back(3);

    assert.strictEqual(list.size(), 3);
    assert.strictEqual(list.front(), 1);
    assert.strictEqual(list.back(), 3);
  });

  it('should pop elements from the front', () => {
    list.push_back(1);
    list.push_back(2);
    list.push_back(3);

    list.pop_front();

    assert.strictEqual(list.size(), 2);
    assert.strictEqual(list.front(), 2);
    assert.strictEqual(list.back(), 3);
  });

  it('should pop elements from the back', () => {
    list.push_back(1);
    list.push_back(2);
    list.push_back(3);

    list.pop_back();

    assert.strictEqual(list.size(), 2);
    assert.strictEqual(list.front(), 1);
    assert.strictEqual(list.back(), 2);
  });

  it('should reverse the list', () => {
    list.push_back(1);
    list.push_back(2);
    list.push_back(3);

    list.reverse();

    assert.strictEqual(list.size(), 3);
    assert.strictEqual(list.front(), 3);
    assert.strictEqual(list.back(), 1);
  });

  it('should delete one occurrence of a value', () => {
    list.push_back(1);
    list.push_back(2);
    list.push_back(2);
    list.push_back(3);

    const deletedCount = list.delete_one(2);

    assert.strictEqual(deletedCount, 1);
    assert.strictEqual(list.size(), 3);
    assert.deepStrictEqual(list.toArray(), [1, 2, 3]);
  });

  it('should delete all occurrences of a value', () => {
    list.push_back(1);
    list.push_back(2);
    list.push_back(2);
    list.push_back(3);

    const deletedCount = list.delete_all(2);

    assert.strictEqual(deletedCount, 2);
    assert.strictEqual(list.size(), 2);
    assert.deepStrictEqual(list.toArray(), [1, 3]);
  });

  it('should insert an element at a specific index', () => {
    list.push_back(1);
    list.push_back(2);
    list.push_back(4);

    list.insert_index(3, 2);

    assert.strictEqual(list.size(), 4);
    assert.deepStrictEqual(list.toArray(), [1, 2, 3, 4]);
  });

  it('should delete an element at a specific index', () => {
    list.push_back(1);
    list.push_back(2);
    list.push_back(3);
    list.push_back(4);

    list.delete_index(2, 2);

    assert.strictEqual(list.size(), 3);
    assert.deepStrictEqual(list.toArray(), [1, 2, 4]);
  });

  it('should iterate over elements using forEach', () => {
    list.push_back(1);
    list.push_back(2);
    list.push_back(3);

    const result: number[] = [];
    list.forEach((val) => result.push(val));

    assert.deepStrictEqual(result, [1, 2, 3]);
  });

  it('should convert the list to an array', () => {
    list.push_back(1);
    list.push_back(2);
    list.push_back(3);

    const array = list.toArray();

    assert.deepStrictEqual(array, [1, 2, 3]);
  });

  it('should convert the list to a string', () => {
    list.push_back(1);
    list.push_back(2);
    list.push_back(3);

    const str = list.toString();

    assert.strictEqual(str, '1,2,3');
  });

  it('should create a deep copy of the list', () => {
    list.push_back(1);
    list.push_back(2);
    list.push_back(3);

    const copy = list.deepCopy();

    assert.strictEqual(copy.size(), 3);
    assert.deepStrictEqual(copy.toArray(), [1, 2, 3]);
  });

  it('should throw an error when calling front on an empty list', () => {
    assert.throws(() => list.front(), /Attempted to call front\(\) on an empty linked list!/);
  });

  it('should throw an error when calling back on an empty list', () => {
    assert.throws(() => list.back(), /Attempted to call back\(\) on an empty linked list!/);
  });

  it('should throw an error when calling pop_front on an empty list', () => {
    assert.throws(() => list.pop_front(), /Attempted to call pop_front\(\) on an empty linked list!/);
  });

  it('should throw an error when calling pop_back on an empty list', () => {
    assert.throws(() => list.pop_back(), /Attempted to call pop_back\(\) on an empty linked list!/);
  });

  it('should throw an error when inserting at an invalid index', () => {
    assert.throws(() => list.insert_index(1, 1), /Attempted to call .insert\(\) to an invalid index!/);
  });

  it('should throw an error when deleting at an invalid index', () => {
    assert.throws(() => list.delete_index(1, 1), /Attempted to call .insert\(\) to an invalid index!/);
  });
});