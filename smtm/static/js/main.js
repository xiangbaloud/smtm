// var ctx = document.getElementById('myChart');
// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['line0', 'line1', 'line2', 'line3', 'line4', 'line5'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// });

const config_a = {
    type: 'line',
    data: {
        labels: ['2021/03/10', '2021/03/11', '2021/03/12', '2021/03/13', '2021/03/14', ],
        datasets: [{
            label: "晶圓代工",
            backgroundColor: 'rgb(105, 111, 128)',
            borderColor: 'rgb(105, 111, 128)',
            data: [130, 320, 133, 456, 304],
            fill: false,
        }, {
            label: "IC 設計",
            backgroundColor: 'rgb(255, 178, 0)',
            borderColor: 'rgb(255, 178, 0)',
            data: [847, 843, 493, 293, 237],
            fill: false,
        }, {
            label: "航運",
            backgroundColor: 'rgb(255, 100, 100)',
            borderColor: 'rgb(255, 100, 100)',
            data: [147, 222, 145, 456, 575],
            fill: false,
        }, {
            label: "被動元件",
            backgroundColor: 'rgb(100, 178, 0)',
            borderColor: 'rgb(100, 178, 0)',
            data: [558, 782, 652, 293, 420],
            fill: false,
        }],
    },
    options: {
        responsive: true,
        title: {
            display: true,
            // text: 'LAN A Real-Time Tx Rx'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                }
            }]
        }
    }
};
const config_b = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: "Tx",
            backgroundColor: 'rgb(105, 111, 128)',
            borderColor: 'rgb(105, 111, 128)',
            data: [],
            fill: false,
        }, {
            label: "Rx",
            backgroundColor: 'rgb(255, 178, 0)',
            borderColor: 'rgb(255, 178, 0)',
            data: [],
            fill: false,
        }],
    },
    options: {
        responsive: true,
        title: {
            display: true,
            // text: 'LAN A Real-Time Tx Rx'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                }
            }]
        }
    }
};
const config_data = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: "Tx",
            backgroundColor: 'rgb(105, 111, 128)',
            borderColor: 'rgb(105, 111, 128)',
            data: [],
            fill: false,
        }, {
            label: "Rx",
            backgroundColor: 'rgb(255, 178, 0)',
            borderColor: 'rgb(255, 178, 0)',
            data: [],
            fill: false,
        }],
    },
    options: {
        responsive: true,
        title: {
            display: true,
            // text: 'LAN A Real-Time Tx Rx'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Kbps'
                }
            }]
        }
    }
};

const context_a = document.getElementById('canvasA');
const context_b = document.getElementById('canvasB');
const context_data = document.getElementById('canvasData');
const lineChart_a = new Chart(context_a, config_a);
const lineChart_b = new Chart(context_b, config_b);
const lineChart_data = new Chart(context_data, config_data);
// const src_df = new EventSource("/get-data");
// src_df.onmessage = function(event) {
//     const data = JSON.parse(event.data);
//     if (config_a.data.labels.length === 300) {
//         config_a.data.labels.shift();
//         config_a.data.datasets[0].data.shift();
//     }
//     config_a.data.labels.push(data.time);
//     config_a.data.datasets[0].data.push(data.lan_a_tx);
//     config_a.data.datasets[1].data.push(data.lan_a_rx);
//     lineChart_a.update();
//     if (config_b.data.labels.length === 300) {
//         config_b.data.labels.shift();
//         config_b.data.datasets[0].data.shift();
//     }
//     config_b.data.labels.push(data.time);
//     config_b.data.datasets[0].data.push(data.lan_b_tx);
//     config_b.data.datasets[1].data.push(data.lan_b_rx);
//     lineChart_b.update();
//     if (config_data.data.labels.length === 300) {
//         config_data.data.labels.shift();
//         config_data.data.datasets[0].data.shift();
//     }
//     config_data.data.labels.push(data.time);
//     config_data.data.datasets[0].data.push(data.lan_data_tx);
//     config_data.data.datasets[1].data.push(data.lan_data_rx);
//     lineChart_data.update();
// }

// src_df.onerror = function(event) {
//     console.log("EventSource failed, can not get data.");
// }

function TableLoder(init=true) {
    if (init == true) {
        var destroy = false;
    } else {
        var destroy = true;
    }
    $('#mainTable').DataTable({
        ajax: {
            url: "get-alldata",
            type: "POST"
        },
        scrollX : true,
        paging: true,
        pageLength: 50,
        processing: true,
        serverSide: false,
        ordering: true,
        destroy: destroy,
        order: [
            // [0, "desc"]
            [0, "asc"]
        ],
        columns: [
            {"data": "id", title: "排行"},
            {"data": "SecurityCode", title: "證券代號"},
            {"data": "SecurityName", title: "證券名稱"},
            {"data": "TradingVolume", title: "成交股數 (千)"},
            {"data": "TransactionAmount", title: "成交金額 (千)"},
            {"data": "OpeningPrice", title: "開盤價"},
            {"data": "HighestPrice", title: "最高價"},
            {"data": "LowestPrice", title: "最低價"},
            {"data": "ClosingPrice", title: "收盤價"},
            // {"data": "PriceDifference", title: "漲跌價差"},
            {"data": null, title: "漲跌價差", render: function(row) {
                if (row.PriceDifference > 0) {
                    return '<font color="green"><strong>' + row.PriceDifference + '</strong></font>'
                } else {
                    return '<font color="red"><strong>' + row.PriceDifference + '</strong></font>'
                }
            }},

            {"data": "NumberofTransactions", title: "成交筆數"},
        ]
    })
    $(".dataTables_scrollHeadInner").css('width', '100%');
    $(".mainTable").css('width', '100%');
}

$(document).ready(function() {
    TableLoder(true);
})
