// Load the function
window.addEventListener('load', takeDataToGraph);

// take Data To Graph
function takeDataToGraph() {
  $.ajax({
    url: `/agency/data`,
    type: 'get',
    success: (res) => {
      // Settup Chart
      const chart = document.getElementById('myChart').getContext('2d');
      const myChart = new Chart(chart, {
        type: 'bar',
        data: {
          labels: [
            'Jan',
            'Feb',
            'March',
            'April',
            'May',
            'June',
            'July',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          datasets: [
            {
              data: res.total,
              label: 'Sales Revenue',
              backgroundColor: [
                '#83e392',
                '#83e392',
                '#83e392',
                '#83e392',
                '#83e392',
                '#83e392',
                '#83e392',
                '#83e392',
                '#83e392',
                '#83e392',
                '#83e392',
                '#83e392',
              ],
              borderRadius: 16,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              labels: {
                boxWidth: 0,
                boxHeight: 0,
                padding: 0,
                font: {
                  size: 36,
                  family: 'Arizonia',
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  });
}
