Template.barGraph.helpers({
    topGenresChart: function() {
        var sortedList = Blaze._globalHelpers.getSortedList();
        return {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Points from First'
            },
            xAxis: {
                categories: _.pluck(sortedList, 'username'),
                labels: {
                    rotation: -45
                }
            },
            tooltip: {
                pointFormat: '<b>{point.y} pts</b>'
            },
            plotOptions: {

            },
            series: [{
                type: 'column',
                name: 'Points from First',
                data: _.zip(_.pluck(sortedList, 'username'), _.pluck(sortedList, 'score').map(function (e){ return e - sortedList[0].score})),
                dataLabels: {
                    enabled: true
                }
            }]
        };
    }
})
