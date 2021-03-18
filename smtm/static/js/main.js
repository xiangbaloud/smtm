$(function() {
    $('#mainTable').tablesorter();
});

$("input:checkbox:not(:checked)").each(function() {
    var column = "." + $(this).attr("name");
    $(column).hide();
});

$("input:checkbox").click(function(){
    var column = "." + $(this).attr("name");
    $(column).toggle();
});

function main_table() {
    var input, filter, table, tr, td, i, txtValue;
    var input = document.getElementById("userSearch");
    var filter = input.value.toUpperCase();
    var table = document.getElementById("mainTable");
    var tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        var td_tt0 = tr[i].getElementsByTagName("td")[0];
        var td_tt1 = tr[i].getElementsByTagName("td")[1];
        var td_tt2 = tr[i].getElementsByTagName("td")[2];
        var td_tt3 = tr[i].getElementsByTagName("td")[3];
        var td_tt4 = tr[i].getElementsByTagName("td")[4];

        if (td_tt0 || td_tt1 || td_tt2 || td_tt3 || td_tt4 ) {
            txtValue_tt0 = td_tt0.textContent || td_tt0.innerText;
            txtValue_tt1 = td_tt1.textContent || td_tt1.innerText;
            txtValue_tt2 = td_tt2.textContent || td_tt2.innerText;
            txtValue_tt3 = td_tt3.textContent || td_tt3.innerText;
            txtValue_tt4 = td_tt4.textContent || td_tt4.innerText;
            if (txtValue_tt0.toUpperCase().indexOf(filter) > -1 || txtValue_tt1.toUpperCase().indexOf(filter) > -1 || txtValue_tt2.toUpperCase().indexOf(filter) > -1 || txtValue_tt3.toUpperCase().indexOf(filter) > -1 || txtValue_tt4.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

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
        labels: [],
        datasets: [{
            label: "晶圓代工",
            backgroundColor: 'rgb(105, 111, 128)',
            borderColor: 'rgb(105, 111, 128)',
            data: [],
            fill: false,
        }, {
            label: "IC 設計",
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
const src_df = new EventSource("/get-data");
src_df.onmessage = function(event) {
    const data = JSON.parse(event.data);
    if (config_a.data.labels.length === 300) {
        config_a.data.labels.shift();
        config_a.data.datasets[0].data.shift();
    }
    config_a.data.labels.push(data.time);
    config_a.data.datasets[0].data.push(data.lan_a_tx);
    config_a.data.datasets[1].data.push(data.lan_a_rx);
    lineChart_a.update();
    if (config_b.data.labels.length === 300) {
        config_b.data.labels.shift();
        config_b.data.datasets[0].data.shift();
    }
    config_b.data.labels.push(data.time);
    config_b.data.datasets[0].data.push(data.lan_b_tx);
    config_b.data.datasets[1].data.push(data.lan_b_rx);
    lineChart_b.update();
    if (config_data.data.labels.length === 300) {
        config_data.data.labels.shift();
        config_data.data.datasets[0].data.shift();
    }
    config_data.data.labels.push(data.time);
    config_data.data.datasets[0].data.push(data.lan_data_tx);
    config_data.data.datasets[1].data.push(data.lan_data_rx);
    lineChart_data.update();
}

src_df.onerror = function(event) {
    console.log("EventSource failed, can not get data.");
    // alert("EventSource failed, can not get data.");
}
