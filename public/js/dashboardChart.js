const chart = document.getElementById('myChart').getContext('2d');

const myChart = new Chart(chart, {

  type: 'bar',
  data: {
    labels: [
      'Red',
      'Blue',
      'Yellow',
      'Green',
      'Purple',
      'Orange',
      'Red',
      'Blue',
      'Yellow',
      'Green',
      'Purple',
      'Orange',
    ],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
        label: 'Sales Revenue',
        backgroundColor: [
          '#fbbb3e99',
          '#fbbb3e99',
          '#fbbb3e99',
          '#fbbb3e99',
          '#fbbb3e99',
          '#fbbb3e99',
          '#fbbb3e99',
          '#fbbb3e99',
          '#fbbb3e99',
          '#fbbb3e99',
          '#fbbb3e99',
          '#fbbb3e99',
        ],
        borderColor: [
          '#fbba3d',
          '#fbba3d',
          '#fbba3d',
          '#fbba3d',
          '#fbba3d',
          '#fbba3d',
          '#fbba3d',
          '#fbba3d',
          '#fbba3d',
          '#fbba3d',
          '#fbba3d',
          '#fbba3d',
        ],
        borderWidth: 2,
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
