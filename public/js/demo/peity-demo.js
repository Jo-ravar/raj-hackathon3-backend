$(function() {
  $('span.pie').peity('pie', {
    fill: ['#e89a3e', '#d7d7d7', '#ffffff'],
  });

  $('.line').peity('line', {
    fill: '#e89a3e',
    stroke: '#169c81',
  });

  $('.bar').peity('bar', {
    fill: ['#e89a3e', '#d7d7d7'],
  });

  $('.bar_dashboard').peity('bar', {
    fill: ['#e89a3e', '#d7d7d7'],
    width: 100,
  });

  var updatingChart = $('.updating-chart').peity('line', {
    fill: '#e89a3e',
    stroke: '#169c81',
    width: 64,
  });

  setInterval(function() {
    var random = Math.round(Math.random() * 10);
    var values = updatingChart.text().split(',');
    values.shift();
    values.push(random);

    updatingChart.text(values.join(',')).change();
  }, 1000);
});
