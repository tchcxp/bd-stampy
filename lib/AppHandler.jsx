/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var {RouteHandler, Link} = Router;

var AppHandler = React.createClass({
    displayName: 'AppHandler',
    render: function () {
        return (
            <div>
                <h1>Stampy</h1>
                <RouteHandler {...this.props.data} />
            </div>
        );
    }
});

module.exports = AppHandler;