import React, { Component } from "react";
import { Image } from "react-native";

import {
  Container,
  Header,
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Left,
  Right,
  Badge,
  Button,
  View,
  StyleProvider,
  getTheme,
  variables
} from "native-base";

const drawerCover = require("../../img/drawer-cover.png");

const drawerImage = require("../../img/logo-kitchen-sink.png");

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  render() {

    const datas = [
      {
        name: "HomeScreen",
        route: "HomeScreen",
        icon: "home",
        bg: "#C5F442"
      },
      {
        name: "Post A Deal",
        route: "PostDeal",
        icon: "camera",
        bg: "#C5F442"
      },
      {
        name: "Top Deals",
        route: "SearchByDeal",
        icon: "pricetags",
        bg: "#C5F442"
      },
      {
        name: "Search Products",
        route: "SearchByProduct",
        icon: "basket",
        bg: "#C5F442"
      },
      {
        name: "Search Stores",
        route: "SearchByStore",
        icon: "archive",
        bg: "#C5F442"
      },
      {
        name: "Profile Settings",
        route: "Profile",
        icon: "settings",
        bg: "#C5F442"
      }
    ];

    const list = {
      number1: {
        number2: {
          number3: {

          }
        }
      }
    }

    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: 30}}
        >

          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon name={data.icon} />
                  <Text>{data.name}</Text>
                </Left>

                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >

                    </Badge>
                  </Right>
              </ListItem>}
          />

        </Content>
      </Container>
    );
  }
}

export default SideBar;
