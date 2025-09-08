import { ref } from 'vue';
import type { Ref } from 'vue';
import type { ChartData, ChartOptions, ChartType } from 'chart.js';
import type { ApexAxisChartSeries, ApexOptions } from 'apexcharts';

export interface UseChartsConfig<T extends ChartType = ChartType> {
  chartJsOptions?: ChartOptions<T>;
  apexOptions?: ApexOptions;
}

export interface UseChartsReturn<T extends ChartType = ChartType> {
  chartJsData: Ref<ChartData<T>>;
  chartJsOptions: Ref<ChartOptions<T>>;
  apexSeries: Ref<ApexAxisChartSeries>;
  apexOptions: Ref<ApexOptions>;
  setChartJsData: (data: ChartData<T>) => void;
  setApexSeries: (series: ApexAxisChartSeries) => void;
  setCategories: (categories: string[]) => void;
}

export function useCharts<T extends ChartType = 'bar'>(
  config: UseChartsConfig<T> = {},
): UseChartsReturn<T> {
  const chartJsData = ref<ChartData<T>>({
    labels: [],
    datasets: [],
  } as ChartData<T>);

  const chartJsOptions = ref<ChartOptions<T>>({
    responsive: true,
    maintainAspectRatio: false,
    ...config.chartJsOptions,
  });

  const apexSeries = ref<ApexAxisChartSeries>([]);
  const apexOptions = ref<ApexOptions>({
    chart: { toolbar: { show: false } },
    xaxis: { categories: [] },
    ...config.apexOptions,
  });

  function setChartJsData(data: ChartData<T>): void {
    chartJsData.value = data;
  }

  function setApexSeries(series: ApexAxisChartSeries): void {
    apexSeries.value = series;
  }

  function setCategories(categories: string[]): void {
    chartJsData.value.labels = categories;
    apexOptions.value = {
      ...apexOptions.value,
      xaxis: { ...(apexOptions.value.xaxis ?? {}), categories },
    };
  }

  return {
    chartJsData,
    chartJsOptions,
    apexSeries,
    apexOptions,
    setChartJsData,
    setApexSeries,
    setCategories,
  };
}

export default useCharts;
