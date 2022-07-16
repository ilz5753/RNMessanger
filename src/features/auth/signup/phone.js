import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Animated from "react-native-reanimated";
import {
  AuthInput,
  AuthTemplate,
  CountrySelectionModal,
  SignUpImageProfileButton,
} from "../../../../components/main";
import {
  aic,
  colors,
  fullWidth,
  height,
  jcse,
} from "../../../../styles";

export default function UpPhone() {
  let { navigate } = useNavigation();
  let [countrySelectionModal, setCountrySelectionModal] = useState(false);
  let [activeCountryCode, setActiveCountryCode] = useState(1);
  let toggleCountrySelection = () => setCountrySelectionModal((cs) => !cs);
  return (
    <AuthTemplate
      verify={{
        text: "Send code",
        onPress: () => navigate("verification", { signType: "up" }),
      }}
      or
      orHeight={80}
      otherMethode={{
        text: "Sign up with E-mail",
        onPress: () => navigate("upemail"),
      }}
    >
      <SignUpImageProfileButton />
      <Animated.View style={[fullWidth, height(200), aic, jcse]}>
        <AuthInput placeholder="First name" />
        <AuthInput placeholder="Last name" />
        <AuthInput
          placeholder="Phone number"
          placeholderTextColor={colors.midBlack}
          countrySelection={{
            onPress: toggleCountrySelection,
            source: require("../../../../assets/Flag_of_Iran.png"),
          }}
        />
        <CountrySelectionModal
          show={countrySelectionModal}
          hide={toggleCountrySelection}
          SelectCountry={({ code }) => setActiveCountryCode(code)}
        />
      </Animated.View>
    </AuthTemplate>
  );
}
