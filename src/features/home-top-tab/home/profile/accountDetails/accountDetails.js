import { useState } from "react";
import Animated from "react-native-reanimated";
import {
  AnimatedTextInput,
  BreakLine,
  ChatTemplate,
  MarginedTopSection,
} from "../../../../../../components/main";
import {
  aic,
  backgroundColor,
  br10,
  colors,
  fh,
  fontSize,
  fontWeight,
  fw,
  height,
  jcsb,
  margin,
  minWidth,
  padding,
  row,
  textAlign,
} from "../../../../../../styles";

let CView = ({ children }) => (
  <Animated.View
    style={[
      margin("h", 10),
      backgroundColor(colors.white),
      br10,
      padding("h", 10),
    ]}
  >
    {children}
  </Animated.View>
);
let SettingRow = ({ isLast = false, title, children }) => (
  <Animated.View>
    <Animated.View style={[fw, height(60), row, aic, jcsb]}>
      <Animated.Text style={[fontSize(17)]}>{title}</Animated.Text>
      <Animated.View>{children}</Animated.View>
    </Animated.View>
    {!isLast && <BreakLine />}
  </Animated.View>
);
export default function AccountDetails() {
  let [firstName, setFirstName] = useState("Cristina");
  let [lastName, setLastName] = useState("Kardashian");
  let [email, setEmail] = useState("w2@gmail.com");
  let [phone, setPhone] = useState("6504859691");
  return (
    <ChatTemplate bg={colors.tr}>
      <MarginedTopSection
        {...{
          header: {
            title: "PUBLIC PROFILE",
          },
        }}
      >
        <CView>
          <SettingRow title="First name">
            <AnimatedTextInput
              style={[
                minWidth(100),
                fh,
                textAlign("r"),
                fontSize(17),
                fontWeight("5"),
              ]}
              placeholder="AnyThing"
              placeholderTextColor={colors.midBlack}
              value={firstName}
              onChangeText={setFirstName}
            />
          </SettingRow>
          <SettingRow title="Last name" isLast>
            <AnimatedTextInput
              style={[
                minWidth(100),
                fh,
                textAlign("r"),
                fontSize(17),
                fontWeight("5"),
              ]}
              placeholder="AnyThing"
              placeholderTextColor={colors.midBlack}
              value={lastName}
              onChangeText={setLastName}
            />
          </SettingRow>
        </CView>
      </MarginedTopSection>
      <MarginedTopSection
        {...{
          header: {
            title: "PRIVATE DETAILS",
          },
        }}
      >
        <CView>
          <SettingRow title="E-mail address">
            <AnimatedTextInput
              style={[
                minWidth(100),
                fh,
                textAlign("r"),
                fontSize(17),
                fontWeight("5"),
              ]}
              placeholder="AnyThing"
              placeholderTextColor={colors.midBlack}
              value={email}
              onChangeText={setEmail}
            />
          </SettingRow>
          <SettingRow title="Phone number" isLast>
            <AnimatedTextInput
              style={[
                minWidth(100),
                fh,
                textAlign("r"),
                fontSize(17),
                fontWeight("5"),
              ]}
              placeholder="AnyThing"
              placeholderTextColor={colors.midBlack}
              value={phone}
              onChangeText={setPhone}
            />
          </SettingRow>
        </CView>
      </MarginedTopSection>
    </ChatTemplate>
  );
}
