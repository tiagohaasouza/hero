import { describe, it, expect } from 'vitest';
import useCharts from './useCharts';

describe('useCharts', () => {
  it('updates categories for both chart libs', () => {
    const { chartJsData, apexOptions, setCategories } = useCharts();
    setCategories(['A', 'B']);
    expect(chartJsData.value.labels).toEqual(['A', 'B']);
    expect(apexOptions.value.xaxis?.categories).toEqual(['A', 'B']);
  });

  it('sets data series', () => {
    const { setChartJsData, chartJsData, setApexSeries, apexSeries } = useCharts();
    setChartJsData({ labels: ['X'], datasets: [{ label: 'L', data: [1] }] });
    setApexSeries([{ name: 'S', data: [1] }]);
    expect(chartJsData.value.datasets[0].data).toEqual([1]);
    expect(apexSeries.value[0].data).toEqual([1]);
  });
});
