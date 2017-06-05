import React, { Component } from 'react';
import { AppRegistry, asset, Pano, Text, View, Model, AmbientLight} from 'react-vr';


class Planet extends Component{
  constructor(props){
    super(props)
    this.state = {
      translate: [0,0,0],
      scale: 0.05,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      obj: 'earth.obj',
      mtl: 'earth.mtl'
    }
  }

  componentWillMount(){
    this.setState({
      translate: this.props.translate,
      obj: this.props.obj,
      mtl: this.props.mtl
    })
  }
  render(){
    // positioning
    let translate = this.state.translate
    let scale = this.state.scale
    let x = this.state.rotateX
    let y = this.state.rotateY
    let z = this.state.rotateZ
    // object and texture
    let obj = this.state.obj
    let mtl = this.state.mtl

    return(
      <View>
        <AmbientLight intensity={ 2 } />
        <Model
          style={{
            transform: [ {translate: translate},{scale: scale },{rotateY: y},{rotateX: x},{rotateZ: z} ],
          }}
          source={{obj:asset(obj), mtl:asset(mtl)}}
          lit={true} />
      </View>
    )
  }
}

class PlanetContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      planets: {
        'earth': <Planet name="earth" translate={[-50,0,0]} obj='earth.obj' mtl='earth.mtl'/>
      }
    }
  }

  render(){
    let planets = this.state.planets
    let planet = this.props.planet
    let description = this.props.description
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        width: 50,
        alignItems: 'stretch',
        transform: [{translate:[0,0,-70]}]
      }}>

        <View style={{ margin: 0.1, height: 0.3}}>
           {planets[planet]}
        </View>

        <View style={{ margin: 0.1, height: 3, transform: [{translate:[0,10,0]}]}}>
          <Text style={{fontSize: 4, textAlign: 'center'}}>{ planet }</Text>
        </View>

        <View style={{ margin: 0.1, height: 10, transform: [{translate:[0,8,0]}]}}>
          <Text style={{fontSize: 2, textAlign: 'center'}}>{ description }</Text>
        </View>
      </View>
    )
  }
}

class PlanetsVR extends Component {
  constructor(){
    super()
    this.state = {
      positionX:  -40
    }
  }
  render() {
    let positionX = this.state.positionX
    return (
      //Setting for the parent view change this x axis to translate entire view
      <View style={{
        transform: [{translate:[positionX,0,40]}],
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch'
      }}>

        <View style={{transform: [{translate:[10,0,-20]}]}}>
          <PlanetContainer planet="earth" description="this is a description of earth"/>
        </View>

        <View style={{transform: [{translate:[100,0,-20]}]}}>
          <PlanetContainer planet="earth" description="this is a description of earth"/>
        </View>


      </View>
    );
  }
}

AppRegistry.registerComponent('PlanetsVR', () => PlanetsVR);
