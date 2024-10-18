import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const listFrom = ['red', 'orange', 'yellow'];
  const resultLinkedList = {
    value: 'red',
    next: {
      value: 'orange',
      next: {
        value: 'yellow',
        next: {
          value: null,
          next: null,
        },
      },
    },
  };

  test('should generate linked list from values 1', () => {
    const linkedList = generateLinkedList(listFrom);
    expect(linkedList).toStrictEqual(resultLinkedList);
  });

  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList(listFrom);
    expect(linkedList).toMatchSnapshot();
  });
});
