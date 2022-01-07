import React, { Component } from 'react';
 

class Index extends Component {
  constructor(props){
    super(props); 
      
  } 
  componentDidMount() { 
    localStorage.clear();
    window.location='Login';
} 
  render() { 
    return (
      <div> 
      </div>
    );
  }
}

export default Index;
