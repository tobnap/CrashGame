var xValues = [];
var yValues = [];
generateData("x", 1, 10, 1);

var chart = new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
        fill: false,
        pointRadius: 2,
        borderColor: "rgba(0,0,255,0.5)",
        data: yValues
    }]
  },    
  options: {
    scales: {
        yAxes: [{
            display: true,
            position: 'right'
        }],
        xAxes: [{
            ticks: {
                stepSize: 1,
                maxTicksLimit: 10,
                callback: function(value) {return Math.round(value)}
            }
        }]
    },
    legend: {display: false},
    title: {
        display: true,
        fontSize: 16
    },
    animation: {
        duration: 0
    }
  }
});

function generateData(value, i1, i2, step = 1) {
  for (let x = i1; x <= i2; x += step) {
    yValues.push(eval(value));
    xValues.push(x);
  }
}

var graphInterval;

function playCrash() {
    graphInterval = setInterval(updateGraph, 100);
}

var count = 0;
var interval = 0.1;

function updateGraph() {
    xValues = [];
    yValues = [];
    generateData("Math.pow(1.1, 0.6*x)", 0, count/10, interval);

    chart.data.labels = xValues;
    chart.data.datasets = [{
        fill: false,
        pointRadius: 2,
        borderColor: "rgba(0,0,255,0.5)",
        data: yValues
    }];

    chart.options.scales.yAxes[0].ticks.max = yValues.at(-1);

    chart.update();

    /*
    if (count % 1000 == 1) {
        interval *= 2;
    }
    */

    count++;
}

function stopGraph() {
    clearInterval(graphInterval);
}