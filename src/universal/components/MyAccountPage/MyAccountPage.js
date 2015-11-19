import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import { pushState } from 'redux-router';
import PersonalInformationForm from './PersonalInformationForm';
import { Paper } from './../../../components';

@connect(
  state => ({

  }), {

  })
export default class MyAccountPage extends Component {
  static propTypes = {

  }


    const styles = require('./MyAccountPage.scss');

    return (
      <Paper className={styles.MyAccountPage}>
        <h4>My Account</h4>
      </Paper>
    );
  }
}
