import React, { Component } from 'react';
import {Container, Button} from "reactstrap"
import "./index.css"

class CAROUSEL extends Component {
  render() {
    return(<div className="d-flex flex-column justify-content-center align-content-center h-100">
  <video poster="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/polina.jpg" id="bgvid" playsInline autoPlay muted loop>
  <source src="http://thenewcode.com/assets/videos/polina.mp4" type="video/mp4"/>
  
  </video>
  <Container>
  <div style={{textAlign : "center"}}>
  <h1>SMART EXAM</h1>
  <p>Created in 2019</p>
  <p><a href="#NONE">Our FACEBOOK</a></p>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta dictum turpis, eu mollis justo gravida ac. Proin non eros blandit, rutrum est a, cursus quam. Nam ultricies, velit ac suscipit vehicula, turpis eros sollicitudin lacus, at convallis mauris magna non justo. Etiam et suscipit elit. Morbi eu ornare nulla, sit amet ornare est. Sed vehicula ipsum a mattis dapibus. Etiam volutpat vel enim at auctor.</p>
  <p>Aenean pharetra convallis pellentesque. Vestibulum et metus lectus. Nunc consectetur, ipsum in viverra eleifend, erat erat ultricies felis, at ultricies mi massa eu ligula. Suspendisse in justo dapibus metus sollicitudin ultrices id sed nisl.</p>
  <br/>
  <Button>SIGN IN</Button>
  </div>
  </Container>
    </div>)
  }
}


export default CAROUSEL;