import { defineStore } from 'pinia';
import type { ChartData } from '@shared/chart';

export const useChartStore = defineStore('charts', {
  state: () => ({
    charts: {} as Record<string, ChartData>,
  }),
  actions: {
    setChart(id: string, data: ChartData) {
      this.charts[id] = data;
    },
    removeChart(id: string) {
      delete this.charts[id];
    },
    clear() {
      this.charts = {};
    },
  },
});

export default useChartStore;
