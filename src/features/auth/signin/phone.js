import { useNavigation } from "@react-navigation/native";
import { noop } from "lodash";
import { useState } from "react";
import {
  AuthInput,
  AuthTemplate,
  CountrySelectionModal,
} from "../../../../components/main";
import { colors } from "../../../../styles";

export default function InPhone() {
  let { navigate } = useNavigation();
  let [countrySelectionModal, setCountrySelectionModal] = useState(false);
  let [activeCountryCode, setActiveCountryCode] = useState(1);
  let toggleCountrySelection = () => setCountrySelectionModal((cs) => !cs);
  return (
    <>
      <AuthTemplate
        verify={{
          text: "Send code",
          onPress: () => navigate("verification", { signType: "in" }),
        }}
        or
        facebook={{
          text: "Login with Facebook",
          onPress: noop,
        }}
        apple={{
          text: "Sign in with Apple",
          onPress: noop,
        }}
        otherMethode={{
          text: "Sign in with E-mail",
          onPress: () => navigate("inemail"),
        }}
      >
        <AuthInput
          placeholder="Phone number"
          placeholderTextColor={colors.midBlack}
          countrySelection={{
            onPress: toggleCountrySelection,
            source: require("../../../../assets/Flag_of_Iran.png"),
          }}
        />
      </AuthTemplate>
      <CountrySelectionModal
        show={countrySelectionModal}
        hide={toggleCountrySelection}
        SelectCountry={({ code }) => setActiveCountryCode(code)}
      />
    </>
  );
}
