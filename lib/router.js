FlowRouter.route('/', {
    action: function(params, queryParams) {
        console.log("Yeah! We are on the player");
    },
    name: 'main'
});

FlowRouter.route('/control', {
    action: function(params, queryParams) {
        console.log("Yeah! We are on control");
    },
    name: 'control'
});