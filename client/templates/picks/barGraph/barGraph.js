Template.barGraph.helpers({
    topGenresChart: function() {
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
                categories: R.map(R.prop('username'), Meteor.users.find({'profile.done': true, 'rank.fromFirst': {$exists: true}}).fetch()),
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
                data: R.map(e => [e.username, e.rank.fromFirst], Meteor.users.find({'profile.done': true, 'rank.fromFirst': {$exists: true}}).fetch()),
                dataLabels: {
                    enabled: true
                }
            }]
        };
    }
})
