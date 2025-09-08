import assert from 'assert';
import { useBooks } from './useBooks.js';

const {
  create,
  update,
  remove,
  search,
  setPage,
  setPageSize,
  books,
  total,
} = useBooks();

assert.strictEqual(total.value, 0);

create({ title: 'Book 1', author: 'Author 1' });
create({ title: 'Another', author: 'Author 2' });
create({ title: 'Third', author: 'Author 3' });

assert.strictEqual(total.value, 3);

search('book');
assert.strictEqual(books.value.length, 1);

search('');
setPageSize(2);
setPage(2);
assert.strictEqual(books.value.length, 1);

const updated = update(1, { title: 'Updated Book 1' });
assert.strictEqual(updated?.title, 'Updated Book 1');

const removed = remove(1);
assert.strictEqual(removed, true);
assert.strictEqual(total.value, 2);

console.log('useBooks tests passed');
