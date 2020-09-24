import React, { Component } from 'react';
import { View, TouchableOpacity, Text, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import { deviceHeight, deviceWidth } from '../../../appStyles';
import TextInput from '../../components/textInput';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Overlay } from 'react-native-elements'
import ExpandableView from '../../components/expandableView';
import { getDemoRouteData } from '../../services/dataGetRoutes';
import Header from '../../components/header';
import { getLocationDataAction } from './screenOneActions';

class ScreenOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusFields: [],
      dataArray: [],
      showFilterBox: false,
      selectedStatus: '',
      dataSearching: false,
      noDataFound: false
    }
  }

  componentDidMount() {
    let statusFields = []
    getDemoRouteData().then(res => {
      console.log(res);
      if (res.status === 200) {
        for (let i = 0; i < res.data.length; i++) {
          if (statusFields.length === 0) {
            statusFields.push(res.data[i].status);
          } else if (typeof statusFields.find(item => item === res.data[i].status) === 'undefined') {
            statusFields.push(res.data[i].status);
          }
        }
        this.setState({ dataArray: [...res.data], statusFields: [...statusFields] });
        this.props.getLocationDataAction(res.data);
      }
    }).catch(e => console.log(e));
  }

  renderItem = ({ item, index }) => {
    return (
      <ExpandableView
        title={item.title}
        subtitle={item.subtitle}
        createdAt={item.created}
        description={item.short_desc}
        longDescription={item.long_desc}
        status={item.status}
        index={index}
      />
    )
  }

  navigateToMapScreen = () => {
    this.props.navigation.navigate('MapScreen');
  }

  onOpenFilterBox = () => {
    this.setState({ showFilterBox: true });
  }

  closeOverlay = () => {
    this.setState({ showFilterBox: false });
  }

  onSelectFilter = (selectedStatus) => {
    console.log(selectedStatus)

    let dataArray = this.props.locationsData.filter(item => item.status === selectedStatus);
    console.log(dataArray);
    this.setState({ showFilterBox: false, dataArray, selectedStatus });
  }

  onChangeText = (text) => {
    console.log(text);
    clearTimeout(this.timer);
    this.timer = this.setState({ dataSearching: true }, () => setTimeout(() => {
      let dataArray = this.props.locationsData.filter(item => {
        let crawalableData = `${item.status.toLowerCase()} ${item.title.toLowerCase()}`;
        let textData = text.toLowerCase();
        return crawalableData.indexOf(textData) > -1;
      });
      if (dataArray.length === 0) {
        this.setState({ dataArray, dataSearching: false, noDataFound: true });
      } else {
        this.setState({ dataArray, dataSearching: false, noDataFound: false });
      }
    }, 300));
  }

  render() {
    return (
      <View style={{ backgroundColor: '#f9fafc', height: deviceHeight, width: deviceWidth }}>
        <Header
          headerStyle={{ backgroundColor: 'orange', justifyContent: 'center' }}
          leftTitle='Assigned To Me'
          leftTitleStyle={{ color: '#fff', fontSize: 20, marginLeft: 10 }}
          rightComponent={() => <View style={{
            flexDirection: 'row', alignSelf: 'flex-end', position: 'absolute'
          }}>
            <Icon name='refresh' color='#fff' size={30} style={{ marginHorizontal: 5 }} />
            <Icon
              onPress={this.navigateToMapScreen}
              name='map-marker-radius-outline' color='#fff' size={30} style={{ marginHorizontal: 5 }} />
          </View>
          }
        />
        <TextInput
          style={{ marginVertical: 8, borderRadius: 4, backgroundColor: '#fff' }}
          onChangeText={this.onChangeText}
          value={this.state.value}
          rightComponent={() => <TouchableOpacity
            onPress={this.onOpenFilterBox}
            style={{
              position: 'absolute',
              backgroundColor: 'orange',
              alignSelf: 'flex-end',
              paddingHorizontal: 5,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              height: '100%'
            }}>
            <Text style={{ color: '#fff' }}>Filter</Text>
            <Icon name='filter' color='#fff' size={20} style={{ marginHorizontal: 5 }} />
          </TouchableOpacity>
          }
        />
        {
          this.state.dataSearching &&
          <ActivityIndicator color='orange' size='large' />
        }
        <FlatList
          data={this.state.dataArray}
          contentContainerStyle={{ marginTop: deviceHeight * 0.002, paddingBottom: deviceHeight * 0.1 }}
          keyExtractor={(item, index) => item.id.toString()}
          ListEmptyComponent={
            !this.state.noDataFound ?
              <ActivityIndicator
                size="large"
                color='orange'
              /> :
              <Text>Alas no data found!</Text>
          }
          renderItem={this.renderItem}
        />
        <Overlay
          isVisible={this.state.showFilterBox}
          overlayStyle={{ padding: 0, }}
          onBackdropPress={this.closeOverlay}
          onRequestClose={this.closeOverlay}
        >
          <View style={{ height: deviceWidth, width: deviceWidth * 0.8 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.statusFields}
              ListEmptyComponent={<ActivityIndicator color='orange' />}
              ListHeaderComponent={<View style={{ backgroundColor: 'grey', padding: 8 }}>
                <Text style={{ color: '#d3d3d3' }}>CHOOSE OPTION FROM BELOW</Text>
              </View>}
              stickyHeaderIndices={[0]}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.onSelectFilter(item)}
                    style={{
                      backgroundColor: item === this.state.selectedStatus ? 'grey' : 'transparent',
                      borderBottomColor: '#d3d3d3',
                      borderBottomWidth: 1,
                      padding: 10,
                      marginHorizontal: 8
                    }}>
                    <Text style={{ fontSize: 16 }}>{item}</Text>
                  </TouchableOpacity>
                )
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Overlay>
        <TouchableOpacity style={{
          position: 'absolute',
          bottom: deviceHeight * 0.15,
          right: deviceWidth * 0.08
        }}>
          <Icon name='plus' size={45} color='#fff' style={{ backgroundColor: 'orange', borderRadius: 100 }} />
        </TouchableOpacity>
      </View>
    )
  }
}

const mapDispatchToProps = {
  getLocationDataAction
}

const mapStateToProps = (state) => {
  return ({
    locationsData: state.locationsData
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenOne);