import { defineStore } from 'pinia';
import type { Book } from '@shared/book';

interface BookState {
  items: Book[];
  search: string;
  page: number;
  pageSize: number;
}

export const useBookStore = defineStore('books', {
  state: (): BookState => ({
    items: [],
    search: '',
    page: 1,
    pageSize: 10,
  }),
  getters: {
    filtered(state) {
      if (!state.search) return state.items;
      const q = state.search.toLowerCase();
      return state.items.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q),
      );
    },
    paginated(): Book[] {
      const start = (this.page - 1) * this.pageSize;
      return this.filtered.slice(start, start + this.pageSize);
    },
    total(state): number {
      return state.items.length;
    },
  },
  actions: {
    setBooks(books: Book[]) {
      this.items = books;
    },
    addBook(book: Book) {
      this.items.push(book);
    },
    updateBook(book: Book) {
      const idx = this.items.findIndex((b) => b.id === book.id);
      if (idx !== -1) {
        this.items[idx] = { ...this.items[idx], ...book };
      }
    },
    removeBook(id: string) {
      this.items = this.items.filter((b) => b.id !== id);
    },
    setSearch(query: string) {
      this.search = query;
      this.page = 1;
    },
    setPage(page: number) {
      this.page = page;
    },
    setPageSize(size: number) {
      this.pageSize = size;
    },
  },
});

export default useBookStore;
