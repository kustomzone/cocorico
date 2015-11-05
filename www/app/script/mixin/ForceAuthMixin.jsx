var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');

var UserStore = require('../store/UserStore');

var UserAction = require('../action/UserAction');

var LoginButton = require('../component/LoginButton');

var Grid = ReactBootstrap.Grid,
    Row = ReactBootstrap.Row,
    Col = ReactBootstrap.Col;

var ForceAuthMixin = {
    mixins: [
        Reflux.connect(UserStore, 'users')
    ],

    getInitialState: function()
    {
        return {
            isAuthenticated: false
        }
    },

    componentDidMount: function()
    {
        this.listenTo(UserStore, (store) => {
            this.setState({isAuthenticated: store.isAuthenticated()})
        });
        UserAction.requireLogin();
    },

    isAuthenticated: function()
    {
        return this.state.isAuthenticated;
    },

    renderLoginPage: function(message)
    {
        return (
            <div className="page">
                <Grid>
                    <Row>
                        <Col md={12}>
                            <p>
                                {message}
                                &nbsp;
                                <LoginButton />
                            </p>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
};

module.exports = ForceAuthMixin;
