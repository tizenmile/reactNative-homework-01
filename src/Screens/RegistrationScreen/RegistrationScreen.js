import { useRef, useState } from "react";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { View } from "react-native";
import { styles } from "./RegistrationScreen.styled";
import { Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

const RegistrationScreen = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocus] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [image, setImage] = useState(null);

  const handlePhotoPicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePhotoRemove = () => {
    setImage(null);
  };

  const handleSubmit = () => {
    console.log({ login, email, password });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        style={styles.container}
        source={require("reacthomework/assets/PhotoBG.png")}
      >
        <View style={{ flex: 4 }} />
        <KeyboardAvoidingView style={styles.regItemsContainer}>
        <ImageBackground
          source={{ uri: image }}
          imageStyle={{ borderRadius: 16 }}
          resizeMode="cover"
          style={{
            backgroundColor: "#F6F6F6",
            borderRadius: 16,
            width: 120,
            height: 120,
            position: "absolute",
            top: -60,
          }}
        >
          {image ? (
            <Pressable
              onPress={handlePhotoRemove}
              style={{ position: "absolute", bottom: 14, right: -21 }}
            >
              <Ionicons name={"remove-circle"} size={42} color="#FF6C00" />
            </Pressable>
          ) : (
            <Pressable
              onPress={handlePhotoPicker}
              style={{ position: "absolute", bottom: 14, right: -21 }}
            >
              <Ionicons name={"add-circle"} size={42} color="#FF6C00" />
            </Pressable>
          )}
        </ImageBackground>
          <Text
            style={{
              marginTop: 92,
              marginBottom: 18,
              fontSize: 30,
              fontWeight: 500,
            }}
          >
            Реєстрація
          </Text>
          <TextInput
            placeholder="Логін"
            onChangeText={(e) => setLogin(e)}
            style={[
              styles.regTextInput,
              focused.name && { borderColor: "#FF6C00" },
            ]}
            placeholderTextColor="#BDBDBD"
            textContentType="nickname"
            onFocus={() => setFocus({ name: true })}
            onBlur={() => setFocus({ name: false })}
            onSubmitEditing={() => {
              emailRef.current.focus();
            }}
            blurOnSubmit={false}
            returnKeyType={"next"}
          />
          <TextInput
            placeholder="Адрес електронної пошти"
            onChangeText={(e) => setEmail(e)}
            style={[
              styles.regTextInput,
              focused.email && { borderColor: "#FF6C00" },
            ]}
            placeholderTextColor="#BDBDBD"
            textContentType="emailAddress"
            keyboardType="email-address"
            onFocus={() => setFocus({ email: true })}
            onBlur={() => setFocus({ email: false })}
            onSubmitEditing={() => {
              passwordRef.current.focus();
            }}
            blurOnSubmit={false}
            returnKeyType="next"
            ref={emailRef}
          />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <TextInput
              placeholder="Пароль"
              onChangeText={(e) => setPassword(e)}
              placeholderTextColor="#BDBDBD"
              style={[
                styles.regTextInput,
                focused.password && { borderColor: "#FF6C00" },
              ]}
              onFocus={() => setFocus({ password: true })}
              onBlur={() => setFocus({ password: false })}
              textContentType="password"
              secureTextEntry={passwordVisibility}
              ref={passwordRef}
              blurOnSubmit={false}
              onSubmitEditing={() => {
                handleSubmit();
                Keyboard.dismiss();
              }}
              returnKeyType="done"
            />
            <Pressable onPress={() => setPasswordVisibility((prev) => !prev)}>
              <Ionicons
                name={passwordVisibility ? "md-eye" : "md-eye-off"}
                size={32}
                color="gray"
                style={{ position: "absolute", right: 16, top: -17 }}
              />
            </Pressable>
          </View>
          <Pressable onPress={handleSubmit}>
            <Text style={styles.regButton}>Зареєструватися</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.regButtonIf}>Вже є акаунт? Увійти</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;
