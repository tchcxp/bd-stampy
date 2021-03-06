/** @jsx React.DOM */
var React = require('react');
var Toolbar = require('./Toolbar.jsx');
var Button = require('./Button.jsx');
var Icon = require('./Icon.jsx');
var ClassMixin = require('../mixins/ClassMixin.jsx');
var Transition = React.addons.CSSTransitionGroup;

var Modal = React.createClass({
    displayName: 'Modal',
    mixins: [ClassMixin],
    propTypes: {
        width: React.PropTypes.string,
        type: React.PropTypes.string,
        title: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ]),
        onClose: React.PropTypes.func.isRequired,
        onClick: React.PropTypes.func,
        nextButton: React.PropTypes.element,
        previousButton: React.PropTypes.element,
        closeButton: React.PropTypes.element
    },
    getDefaultProps: function () {
        return {
            type: 'form',
            closeButton: <span>x</span>,
            nextButton: <span>&gt;</span>,
            previousButton: <span>&lt;</span>
        };
    },
    getInitialState: function () {
        return {};
    },
    onKeyUp: function (e) {
        if (this.props.onKeyUp) {
            this.props.onKeyUp(e, this.props);
        }
    },
    onKeyDown: function (e) {
        if (this.props.onKeyDown) {
            this.props.onKeyDown(e);
        }
    },
    componentDidMount: function() {
        this.setState(this.getInitialState());

        this.refs.modal.getDOMNode().focus();
    },
    componentWillUnmount: function () {
    },
    onClick: function (e) {
        if(e.currentTarget === e.target) {
            this.props.onClose();
        }
    },
    render: function() {
        var modalClasses = this.ClassMixin_getClass()
            .modifier(this.props.type)
            .modifier(this.props.width)
            .is(true,'focusable')
        ;

        var closeAction = [<button className="Toolbar_action" onClick={this.props.onClose} aria-label="close">{this.props.closeButton}</button>];
        // <Icon block className="Toolbar_action" name="cross" onClick={this.props.onClose} />

        if(this.props.action) {
            closeAction.push(this.props.action);
        }

        return (
            <div {...this.props} className={modalClasses.className} ref="modal" onClick={this.props.onClick} role="dialogue" onKeyUp={this.onKeyUp} onKeyDown={this.onKeyDown} tabIndex="0">
                <Toolbar title={this.props.title}>{closeAction}</Toolbar>
                {this.renderBackAndForward()}
                <div className="Modal_info">{this.props.info}</div>
                <div className="Modal_wrapper" ref="ModalWrapper">{this.props.children}</div>
                <div className="Modal_footer">{this.renderActions()}</div>
            </div>
        );
    },
    renderBackAndForward: function () {
        if(this.props.onNext && this.props.onPrevious) {
            var next = <button onClick={this.props.onNext} aria-label="next" className="Modal_button Modal_button-next">{this.props.nextButton}</button>;
            var prev = <button onClick={this.props.onPrevious} aria-label="previous" className="Modal_button Modal_button-prev">{this.props.previousButton}</button>;

            return <div>{prev}{next}</div>;
        }

    },

    renderActions: function () {
        if(this.props.actions === 'default') {
            return (
                <div>
                    <Button modifier="grey" onClick={this.props.onClose}>Cancel</Button>
                    <Button onClick={this.props.onSave}>Save</Button>
                </div>
            );
        } else {
            return <Transition transitionName="Modal_footer">
                {this.props.actions}
            </Transition>
        }
    }
});

module.exports = Modal;
