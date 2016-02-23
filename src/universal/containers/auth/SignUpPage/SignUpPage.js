import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import { pushState } from 'redux-router';
import { Paper } from './../../../components';
import { signUpAction } from './../../../redux/reducers/auth';
import SignUpForm from './SignUpForm';

@connect(
  state => ({
    user: state.auth.user,
    signingUp: state.signingUp,
    singUpError: state.singUpError
  }), {
    initialize,
    pushState,
    signUpAction
  })
export default class SignUpPage extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    signUpAction: PropTypes.func.isRequired,
    signingUp: PropTypes.bool,
    singUpError: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.initialize('signup', {});
  }

  handleSubmit(data) {
    this.props.signUpAction(data.email, data.password);
  }

  render() {
    const styles = require('./SignUpPage.scss');
    const {
      signingUp,
      singUpError
    } = this.props;

    return (
      <Paper className={styles.SignUpPage}>
        <h4>Sign Up</h4>
        <SignUpForm
          onSubmit={::this.handleSubmit}
          isSigningUp={signingUp || false}
          signUpError={singUpError}
           />

        <Link className={''} to="/auth/login">Want to login?</Link>
      </Paper>
    );
  }
}
