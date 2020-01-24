import React from "react";
import { StyleSheet, View } from "react-native";
import { AppLoading } from "expo";
import { Container, Header, Content, H1, H2, H3, Text } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationNativeContainer } from "@react-navigation/native";

import Home from "./screens/Home";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          color: "#EFF5F8"
        },
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#234E52",
          height: 100
        }
      }}
    >
      <Stack.Screen
        options={{
          title: "Weather App"
        }}
        name="Home"
        component={Home}
      />
    </Stack.Navigator>
  );
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <NavigationNativeContainer>{StackNavigator()}</NavigationNativeContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
