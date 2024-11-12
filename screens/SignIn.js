import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Đã sửa thành FontAwesome từ @expo/vector-icons
import COLORS from '../components/colors';

const SignIn = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back!</Text>

        {/* Input for Username/Email */}
        <View style={styles.inputContainer}>
          <FontAwesome name="user" style={styles.icon} /> {/* Sử dụng FontAwesome */}
          <TextInput
            placeholder="Username or Email"
            style={styles.input}
            placeholderTextColor="#7a7a7a"
          />
        </View>

        {/* Input for Password */}
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" style={styles.icon} /> {/* Sử dụng FontAwesome */}
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={styles.input}
            placeholderTextColor="#7a7a7a"
          />
        </View>

        <TouchableOpacity onPress={() => alert('Forgot Password')} style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>- OR Continue with -</Text>

        {/* Social Media Icons with Border */}
        <View style={styles.socialContainer}>
          <TouchableOpacity onPress={() => alert('Google Login')} style={styles.socialIconContainer}>
            <FontAwesome name="google" style={[styles.socialIcon, { color: '#DB4437' }]} /> {/* Sử dụng FontAwesome */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('Apple Login')} style={styles.socialIconContainer}>
            <FontAwesome name="apple" style={[styles.socialIcon, { color: '#000000' }]} /> {/* Sử dụng FontAwesome */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('Facebook Login')} style={styles.socialIconContainer}>
            <FontAwesome name="facebook" style={[styles.socialIcon, { color: '#3b5998' }]} /> {/* Sử dụng FontAwesome */}
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Create An Account </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    width: 300,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    color: '#000',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  icon: {
    fontSize: 18,
    color: '#7a7a7a',
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: '#000',
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: COLORS.orange,
    fontSize: 12,
  },
  loginButton: {
    backgroundColor: COLORS.orange,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orText: {
    textAlign: 'center',
    color: '#7a7a7a',
    marginVertical: 15,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialIconContainer: {
    borderWidth: 1,
    borderColor: COLORS.orange,
    borderRadius: 100,
    padding: 10,
    marginHorizontal: 10,
    width:50,
  },
  socialIcon: {
    fontSize: 30,
   textAlign:"center"
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    color: '#7a7a7a',
  },
  signUpLink: {
    color: COLORS.orange,
    fontWeight: 'bold',
  },
});

export default SignIn;
