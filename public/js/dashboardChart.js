// Load the function
window.addEventListener('load', takeDataToGraph);

// take Data To Graph
function takeDataToGraph() {
  $.ajax({
    url: `/agency/data`,
    type: 'get',
    success: (res) => {
      let monthArray = [
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
      ];
        
      let total = res.total;
      let month = [];
      let backgroundColor = [];
      for (let i = 0; i < res.total.length; i++) {
        month.push(monthArray[i]);
        backgroundColor.push('#83e392');
      }

      // Settup Chart
      const chart = document.getElementById('myChart').getContext('2d');
      const myChart = new Chart(chart, {
        type: 'bar',
        data: {
          labels: month,
          datasets: [
            {
              data: total,
              label: 'Sales Revenue',
              backgroundColor: backgroundColor,
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
