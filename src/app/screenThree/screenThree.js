import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Alert,
  Linking,
  PermissionsAndroid,
  Text,
  InteractionManager
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements';
import Geolocation from 'react-native-geolocation-service';
import Header from '../../components/header';
import { deviceWidth } from '../../../appStyles';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class MapScreen extends Component {

  constructor() {
    super();
    this.state = {
      addresses: null,
      location: null,
      initialPosition: null,
      allFarms: [],
      filteredFarms: [],
      searchableGardenName: '',
      searchedGardens: [],
      gardenSearching: false,
      askingToOpenFilterOverlay: false,
      allVegetables: [],
      intermediateSelectedVegetables: [],
      selectedVegetables: [],
      width: 0,
      marginBottom: 1
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.getLocation();
    });
  }

  getLocation = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Location Permission',
        'message': 'This App needs access to your location ' +
          'so we can know where you are.'
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(info => {
        if (info.coords) {
          this.setState({
            location: info.coords,
            initialPosition: {
              latitude: info.coords.latitude,
              longitude: info.coords.longitude,
              latitudeDelta: 0.09,
              longitudeDelta: 0.035
            }
          });
        }
      }, error => console.log(error), {
          enableHighAccuracy: true, timeout: 15000, maximumAge: 10000
        });
    } else {
      Alert.alert(
        '',
        `Location Acess denied, you can allow permission from app permissions`,
        [{
          'text': 'Cancel'
        },
        {
          'text': 'Ok',
          onPress: () => Linking.openSettings()
        }
        ]
      )
    }
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({
      location: mapRegion
    });
  };

  goBack = () => {
    this.props.navigation.goBack();
  }

  render() {
    const { location } = this.state;
    return (
      <View style={{ height: HEIGHT, width: WIDTH }}>
        <Header
          headerStyle={{ backgroundColor: 'orange', justifyContent: 'center' }}
          leftTitle='Assigned To Me'
          leftTitleStyle={{ color: '#fff', fontSize: 20, marginLeft: 10 }}
          rightComponent={() => <View style={{
            flexDirection: 'row', alignSelf: 'flex-end', position: 'absolute'
          }}>
            <Icon
              onPress={this.goBack}
              name='arrow-back' color='#fff' size={30} style={{ marginHorizontal: 5 }} />
          </View>
          }
        />
        {location &&
          <MapView
            style={{
              flex: 1,
              marginBottom: this.state.marginBottom
            }}
            onMapReady={() => this.setState({ marginBottom: 0 })}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            loadingEnabled
            provider={PROVIDER_GOOGLE}
            scrollEnabled={true}
            zoomEnabled={true}
            rotateEnabled={true}
            showsUserLocation={true}
            showsMyLocationButton={true}
            onRegionChangeComplete={this._handleMapRegionChange}
            onRegionChange={this._handleMapRegionChange}
            ref={ref => this.mapView = ref}
          >
            {this.props.locationsData.map((item, i) => {
              return (
                <Marker
                  key={i.toString()}
                  coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                  pinColor="#000000"
                  draggable={true}
                >
                  <Callout
                    alphaHitTest
                    tooltip={true}
                  >
                    <View style={{
                      padding: 5,
                      borderRadius: 5,
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                      elevation: 3,
                      shadowColor: 'rgba(0,0,0, 0.3)',
                      shadowOffset: { height: 0.3, width: 0.3 },
                      shadowOpacity: 0.4,
                      shadowRadius: 5,
                      width: deviceWidth * 0.65
                    }}>
                      <Text>
                        {item.title}
                      </Text>
                      <Text>
                        {item.subtitle}
                      </Text>
                      <Text>
                        {item.short_desc}
                      </Text>
                      <Text>
                        {item.long_desc}
                      </Text>
                    </View>
                  </Callout>
                </Marker>
              )
            })}
          </MapView>
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    locationsData: state.locationsData
  });
}

export default connect(mapStateToProps)(MapScreen);