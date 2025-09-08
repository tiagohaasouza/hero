import { ref, computed } from 'vue';

export interface Book {
  id: number;
  title: string;
  author: string;
  description?: string;
}

export interface Pagination {
  page: number;
  size: number;
}

export function useBooks(initial: Book[] = []) {
  const items = ref<Book[]>([...initial]);
  const searchQuery = ref('');
  const pagination = ref<Pagination>({ page: 1, size: 10 });

  const filtered = computed(() => {
    if (!searchQuery.value) {
      return items.value;
    }
    const query = searchQuery.value.toLowerCase();
    return items.value.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query)
    );
  });

  const total = computed(() => filtered.value.length);
  const totalPages = computed(() =>
    Math.max(1, Math.ceil(total.value / pagination.value.size))
  );

  const paginated = computed(() => {
    const start = (pagination.value.page - 1) * pagination.value.size;
    return filtered.value.slice(start, start + pagination.value.size);
  });

  function setPage(page: number) {
    if (page < 1) page = 1;
    if (page > totalPages.value) page = totalPages.value;
    pagination.value.page = page;
  }

  function setPageSize(size: number) {
    pagination.value.size = size;
    if (pagination.value.page > totalPages.value) {
      pagination.value.page = totalPages.value;
    }
  }

  function search(query: string) {
    searchQuery.value = query;
    pagination.value.page = 1;
  }

  function create(book: Omit<Book, 'id'>) {
    const id = items.value.length
      ? Math.max(...items.value.map((b) => b.id)) + 1
      : 1;
    const newBook: Book = { id, ...book };
    items.value.push(newBook);
    return newBook;
  }

  function update(id: number, data: Partial<Omit<Book, 'id'>>) {
    const index = items.value.findIndex((b) => b.id === id);
    if (index === -1) return null;
    items.value[index] = { ...items.value[index], ...data };
    return items.value[index];
  }

  function remove(id: number) {
    const index = items.value.findIndex((b) => b.id === id);
    if (index === -1) return false;
    items.value.splice(index, 1);
    if (pagination.value.page > totalPages.value) {
      pagination.value.page = totalPages.value;
    }
    return true;
  }

  return {
    books: paginated,
    total,
    totalPages,
    searchQuery,
    pagination,
    create,
    update,
    remove,
    setPage,
    setPageSize,
    search,
    rawItems: items,
  };
}

export default useBooks;
