import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/indexActions';

import enTerms from './terms/en-US.json';

class IndexPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    appState: PropTypes.object.isRequired
  };

  render() {
    const terms = enTerms;

    if (this.props.user) {
      const user = this.props.user;
      const displayName = this.props.displayName;

      return (
          <div>
            <h1>{terms.titleloggedin.replace(/%1%/g, displayName)}</h1>
          </div>
        );
    } else {
      return (
        <div>{terms.user}</div>
      );
    }
  }

}

function mapStateToProps(state) {
  return {
    appState: {
      user: state.user.user
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);
