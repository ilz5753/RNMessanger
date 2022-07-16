import { noop } from "lodash";
import { AuthInput, AuthTemplate } from "../../../components/main";
import { colors } from "../../../styles";

export default function ResetPassword() {
  return (
    <AuthTemplate
      verify={{
        text: "Send Link",
        onPress: noop,
      }}
    >
      <AuthInput placeholder="E-mail" placeholderTextColor={colors.midBlack} />
    </AuthTemplate>
  );
}
