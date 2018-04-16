import React, { Component } from 'react';
import urlConfig from '../../../url-config';
import axios from 'axios';

class UserProgressPage extends Component {

  constructor() {
    super();

    this.fetchUserProgress = this.fetchUserProgress.bind(this);
  }

  componentWillMount() {
    this.fetchUserProgress();
  }

  fetchUserProgress() {
    const { baseUrl } = urlConfig;
    const url = `${baseUrl}/userprogresses/currentUserProgresses`;
        
    axios.get(url)
      .then( res => console.log(res))
      .catch( err => err);
  }

  render() {
    return (
      <div>
        User progress
      </div>
    );
  }
}

export default UserProgressPage;