import React, { Component } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { Entypo } from "@expo/vector-icons";
import {
  Container,
  Button,
  Icon,
  H3,
  Form,
  Item,
  Input,
  Spinner,
  Text,
  Thumbnail
} from "native-base";
import axios from "axios";

export default class Home extends Component {
  state = {
    chosenCity: "",
    weather: null,
    loading: false
  };

  handleInput = text => {
    this.setState({ chosenCity: text });
  };

  renderTime = () => {
    const t = new Date();
    const h = t.getHours();
    const m = t.getMinutes();
    const s = t.getSeconds();
    return `${h}:${m}:${s}`;
  };

  renderResult = () => {
    if (!this.state.weather) {
      return <View></View>;
    } else {
      return (
        <View style={styles.resultContainer}>
          <View style={{ marginVertical: 20 }}>
            <Text style={{ fontSize: 20 }}>
              <Text>{this.state.weather.city}</Text>{" "}
              <Entypo name="location-pin" size={20} />
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%"
            }}
          >
            <View>
              <Text style={{ fontSize: 20 }}>CURRENT WEATHER</Text>
              <Text style={{ fontSize: 20, color: "gray" }}>
                {this.renderTime()}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 25 }}>{"C \u00B0"}</Text>
            </View>
          </View>
          <View
            style={{
              marginVertical: 20,
              flexDirection: "row",
              alignItems: "flex-start"
            }}
          >
            <View
              style={{
                marginRight: 17,
                justifyContent: "center",
                alignItems: "center",
                height: 125,
                width: 100,
                backgroundColor: "black",
                marginTop: 21,
                borderRadius: 6
              }}
            >
              <Thumbnail
                large
                source={{
                  uri: this.state.weather.url
                }}
              />
            </View>
            <View style={{ flexDirection: "column" }}>
              <View
                style={{
                  justifyContent: "flex-start"
                }}
              >
                <Text style={{ fontSize: 70 }}>
                  {this.state.weather.humidity + "\u00B0"}
                </Text>
              </View>
              <View>
                <Text style={{ color: "gray", fontSize: 19 }}>
                  RealFeel {Math.round(+this.state.weather.temp_max) + "\u00B0"}
                </Text>
                <Text style={{ color: "gray", fontSize: 19 }}>
                  RealFeel Shade{" "}
                  {Math.round(+this.state.weather.temp_min) + "\u00B0"}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 30 }}>
              {this.state.weather.description}
            </Text>
          </View>
        </View>
      );
    }
  };

  handleSearch = async () => {
    let city = this.state.chosenCity.trimEnd();
    if (!city) {
      return;
    }
    Keyboard.dismiss();
    this.setState({ loading: true });

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=50040376c3d4625cc39bee914507f176`;
    const { data } = await axios.get(url);
    const weatherData = data.main;
    weatherData["url"] =
      "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    weatherData["description"] = data.weather[0].description;
    weatherData["city"] = data.name + ", " + data.sys.country;
    console.log(weatherData);
    this.setState({ weather: weatherData });
    this.setState({ loading: false });
  };

  render() {
    return (
      <Container style={{ backgroundColor: "#EFF5F8" }}>
        <View style={styles.titleContainer}></View>
        <View style={styles.formContainer}>
          <Form style={{ flex: 1 }}>
            <Item>
              <Input
                placeholderTextColor="#C2C2C2"
                style={styles.inputText}
                placeholder="Enter city name"
                onChangeText={text => this.handleInput(text)}
              />
            </Item>
          </Form>

          <Button
            style={styles.searchButton}
            iconRight
            light
            onPress={() => this.handleSearch()}
          >
            <Icon name="ios-search" style={{ fontSize: 40 }} />
          </Button>
        </View>
        {this.state.loading ? (
          <View style={styles.spinnerContainer}>
            <Spinner color="#44337A" size={100} />
          </View>
        ) : (
          this.renderResult()
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 30
  },

  formContainer: {
    paddingHorizontal: 10,
    flexDirection: "row"
  },

  inputText: {
    backgroundColor: "#44337A",
    width: "100%",
    borderRadius: 6,
    color: "#EFF5F8",
    paddingLeft: 16,
    height: 60,
    fontSize: 20
  },

  searchButton: {
    paddingLeft: 15,
    height: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft: 10,
    borderColor: "#44337A",
    borderWidth: 1
  },
  resultContainer: {
    marginTop: 50,
    alignItems: "flex-start",
    flex: 1,
    paddingHorizontal: 20
  },
  spinnerContainer: { justifyContent: "center", alignItems: "center", flex: 1 }
});
