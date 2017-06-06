import React, { Component } from 'react';

import { AppRegistry, asset, Pano, Text, View, Model, AmbientLight, VrButton, Video, VideoPano} from 'react-vr';



class Planet extends Component{
  constructor(props){
    super(props)
    this.state = {
      translate: [0,0,0],
      scale: 0.05,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      spinRatio: 1
    }
    this.lastUpdate = Date.now();
    this.rotate = this.rotate.bind(this);
  }

  rotate() {
   const now = Date.now();
   const delta = now - this.lastUpdate;
   this.lastUpdate = now;

   this.setState({
       rotateY: (this.state.rotateY + delta / 150) * this.state.spinRatio
   });
   this.frameHandle = requestAnimationFrame(this.rotate);
  }

  componentWillMount(){
    this.setState({
      translate: this.props.translate,
      obj: this.props.obj,
      texture: this.props.texture,
      scale: this.props.scale,
      spinRatio: this.props.spinRatio
    })
  }

  componentDidMount(){
    this.rotate();
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
    let texture = this.state.texture

    return(
      <View>
        <AmbientLight intensity={ 0.10 } />
        <Model
          style={{
            transform: [ {translate: translate},{scale: scale },{rotateY: y},{rotateX: x},{rotateZ: z} ],
          }}
          source={{obj:asset(obj)}}
          texture={asset(texture)}
          lit={true} />
      </View>
    )
  }
}

class PlanetContainer extends Component {
  constructor(props){
    super(props)
    this.planets = {
      'mercury': <Planet name="mercury" translate={[-50,0,0]} obj='planet.obj' texture='mercury.jpg' scale={0.05} spinRatio={0.995}/>,
      'venus': <Planet name="venus" translate={[-50,0,0]} obj='planet.obj' texture='venus.jpg' scale={0.05} spinRatio={0.992}/>,
      'earth': <Planet name="earth" translate={[-50,0,0]} obj='planet.obj' texture='4096_earth.jpg' scale={0.05} spinRatio={1}/>,
      'mars': <Planet name="mars"  translate={[-50,0,0]} obj='planet.obj' texture='MarsTexture.jpg' scale={0.05} spinRatio={1}/>,
      'jupiter': <Planet name="jupiter"  translate={[-50,0,0]} obj='planet.obj' texture='jupiter.jpg' scale={0.05} spinRatio={1.0002}/>,
      'saturn': <Planet name="saturn"  translate={[-50,0,0]} obj='planet.obj' texture='saturn.jpg' scale={0.05} spinRatio={1.0002}/>,
      'uranus': <Planet name="uranus"  translate={[-50,0,0]} obj='planet.obj' texture='uranus.jpg' scale={0.05} spinRatio={1.0005}/>,
      'neptune': <Planet name="neptune"  translate={[-50,0,0]} obj='planet.obj' texture='neptune.jpg' scale={0.05} spinRatio={1.0006}/>
    }
  }


  render(){
    let planets = this.planets
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

        <View style={{ margin: 0.1, height: 3, transform: [{translate:[0,12,0]}]}}>
          <Text style={{fontSize: 4, textAlign: 'left'}}>{ planet }</Text>
        </View>

        <View style={{ margin: 0.1, height: 10, transform: [{translate:[0,10,0]}]}}>
          {description.map((description)=>{
            return <Text style={{fontSize: 2, textAlign: 'left'}}>{ description }</Text>
          })}
        </View>
      </View>
    )
  }
}

class PlanetsList extends Component {
  constructor(props){
    super(props)
  }
  render() {
    let positionX = this.props.positionX
    let positionZ = this.props.positionZ
    return (
      //Setting for the parent view change this x axis to translate entire view
      <View style={{
        transform: [{translate:[positionX,0,positionZ]}],
        flex: 3,
        flexDirection: 'row',
        alignItems: 'stretch'
      }}>
        <View style={{transform: [{translate:[10,0,-20]}]}}>
          <PlanetContainer planet="mercury"
            description = {[
              "Diameter:	4,879 km",
              "Mass:	3.30 x 10^23 kg (5.5% Earth)",
              "Moons:	None",
              "Orbit Distance: 57,909,227 km (0.39 AU)",
              "Surface Temperature:	-173 to 427°C"
            ]}
          />
        </View>


        <View style={{transform: [{translate:[100,0,-20]}]}}>
          <PlanetContainer planet="venus"
            description = {[
              'Diameter:	12,104 km',
              'Mass:	4.87 x 10^24 kg (81.5% Earth)',
              'Moons:	None',
              'Orbit Distance:	108,209,475 km (0.73 AU)',
              'Orbit Period:	225 days',
              'Surface Temperature:	462 °C'
            ]}
          />
        </View>

        <View style={{transform: [{translate:[200,0,-20]}]}}>
          <PlanetContainer planet="earth"
            description = {[
              'Equatorial Diameter:	12,756 km',
              'Polar Diameter:	12,714 km',
              'Mass:	5.97 x 10^24 kg',
              'Moons:	1 (The Moon)',
              'Orbit Distance:	149,598,262 km (1 AU)',
              'Orbit Period:	365.24 days',
              'Surface Temperature:	-88 to 58°C'
            ]}
          />
        </View>

        <View style={{transform: [{translate:[300,0,-20]}]}}>
          <PlanetContainer planet="mars"
            description = {[
              'Equatorial Diameter:	6,792 km',
              'Polar Diameter:	6,752 km',
              'Mass:	6.42 x 10^23 kg (10.7% Earth)',
              'Moons:	2 (Phobos & Deimos)',
              'Orbit Distance:	227,943,824 km (1.52 AU)',
              'Orbit Period:	687 days (1.9 years)',
              'Surface Temperature:	-153 to 20 °C'
            ]}
          />
        </View>

        <View style={{transform: [{translate:[400,0,-20]}]}}>
          <PlanetContainer planet="jupiter"
            description = {[
              'Equatorial Diameter:	142,984 km',
              'Polar Diameter:	133,709 km',
              'Mass:	1.90 × 10^27 kg (318 Earths)',
              'Moons:	67 (Io, Europa, Ganymede & Callisto)',
              'Rings:	4',
              'Orbit Distance:	778,340,821 km (5.20 AU)',
              'Orbit Period:	4,333 days (11.9 years)',
              'Surface Temperature:	-148 °C'
            ]}
          />
        </View>

        <View style={{transform: [{translate:[500,0,-20]}]}}>
          <PlanetContainer planet="saturn"
            description = {[
              'Equatorial Diameter:	120,536 km',
              'Polar Diameter:	108,728 km',
              'Mass:	5.68 × 10^26 kg (95 Earths)',
              'Moons:	62 (Titan, Enceladus, Iapetus & Rhea)',
              'Rings:	30+ (7 Groups)',
              'Orbit Distance:	1,426,666,422 km (9.54 AU)',
              'Orbit Period:	10,756 days (29.5 years)',
              'Surface Temperature:	-178 °C'
            ]}
          />
        </View>

        <View style={{transform: [{translate:[600,0,-20]}]}}>
          <PlanetContainer planet="uranus"
            description = {[
              'Equatorial Diameter:	51,118 km',
              'Polar Diameter:	49,946 km',
              'Mass:	8.68 × 10^25 kg (15 Earths)',
              'Moons:	27 (Miranda, Titania, Ariel, Umbriel & Oberon)',
              'Rings:	13',
              'Orbit Distance:	2,870,658,186 km (19.19 AU)',
              'Orbit Period:	30,687 days (84.0 years)',
              'Surface Temperature:	-216 °C'
            ]}
          />
        </View>

        <View style={{transform: [{translate:[700,0,-20]}]}}>
          <PlanetContainer planet="neptune"
            description = {[
              'Equatorial Diameter:	49,528 km',
              'Polar Diameter:	48,682 km',
              'Mass:	1.02 × 10^26 kg (17 Earths)',
              'Moons:	14 (Triton)',
              'Rings:	5',
              'Orbit Distance:	4,498,396,441 km (30.10 AU)',
              'Orbit Period:	60,190 days (164.8 years)',
              'Surface Temperature:	-214 °C'
            ]}
          />
        </View>
      </View>
    );
  }
}

class PlanetsVR extends Component {
  constructor(){
    super()
    this.state = {
      positionX: 0,
      positionZ:-10
    }
  }

  handleNext(){
    this.setState({

      positionX: this.state.positionX - 150

    })
  }

  handleBack(){
    this.setState({

      positionX: this.state.positionX + 150
    })
  }

  handleZoomIn(){
    this.setState({
      positionZ: this.state.positionZ - 100
    })
  }

  handleZoomOut(){
    this.setState({
      positionZ: this.state.positionZ + 100

    })
  }

  render(){
    return(
      <View>

        <Pano source={asset('./panos/stars02.jpg')}/>
        {/* <VideoPano source={asset('spaceVideo.mp4')} /> */}
        <PlanetsList positionX={this.state.positionX} positionZ={this.state.positionZ}/>

        <View style={{
          flex: 1,
          flexDirection: 'row',
          width: 50,
          alignItems: 'stretch',
          transform: [{translate:[20,2,-40]}]
        }}>

          <View style={{ margin: 1, height: 5}}>
            <VrButton onClick={()=>this.handleBack()}>
              <Text style={{fontSize: 4, textAlign: 'center'}}>{'<'}</Text>
            </VrButton>
          </View>

          <View style={{ margin: 1, height: 5}}>
            <VrButton onClick={()=>this.handleNext()}>
              <Text style={{fontSize: 4, textAlign: 'center'}}>{'>'}</Text>
            </VrButton>
          </View>

        </View>

      </View>
    )
  }
}

AppRegistry.registerComponent('PlanetsVR', () => PlanetsVR);
