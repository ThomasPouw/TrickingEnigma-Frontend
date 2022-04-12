import {AfterViewInit, Component} from '@angular/core';
import {connect, EChartsOption, getInstanceByDom} from "echarts";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../Store/Reducers";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements AfterViewInit {
  options: EChartsOption = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Counters',
        type: 'line',
        smooth: true,
        data: [10, 52, 200, 334, 390, 330, 220],
      },
    ],
  };
  constructor(private store: Store<fromRoot.State>) {}

  ngAfterViewInit() {
    setTimeout(() => {
      const chartElement1 = document.getElementById('chart1');
      const chartElement2 = document.getElementById('chart2');
      if(chartElement1 && chartElement2){
        const chart1 = getInstanceByDom(chartElement1);
        const chart2 = getInstanceByDom(chartElement2);
        if(chart1 && chart2)
        connect([chart1, chart2]);
      }

    });
  }
}
