import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Truck } from 'lucide-react-native';
import { Link, useRouter } from 'expo-router';
import { useLogin } from '@/hooks/auth';
import { LoginStyles } from './Styles/loginStyles';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const { mutate: LoginMutate } = useLogin();

  const handleLogin = () => {
    console.log('Login attempted with:', email, password);

    LoginMutate({ email, password });
  };

  return (
    <SafeAreaView style={LoginStyles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Decorative Blobs */}
      <View style={[LoginStyles.blob, LoginStyles.blobTop]} />
      <View style={[LoginStyles.blob, LoginStyles.blobBottom]} />

      <View style={LoginStyles.content}>
        {/* Logo Section */}
        <View style={LoginStyles.header}>
          <View style={LoginStyles.logoContainer}>
            <Truck size={32} color="#FFFFFF" strokeWidth={2.5} />
          </View>
          <Text style={LoginStyles.title}>Welcome Back</Text>
          <Text style={LoginStyles.subtitle}>Sign in to start accepting deliveries</Text>
        </View>

        {/* Form Section */}
        <View style={LoginStyles.form}>
          <View style={LoginStyles.inputContainer}>
            <Text style={LoginStyles.label}>Email</Text>
            <TextInput
              style={LoginStyles.input}
              placeholder="driver@shiptrack.com"
              placeholderTextColor="#94A3B8"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={LoginStyles.inputContainer}>
            <Text style={LoginStyles.label}>Password</Text>
            <TextInput
              style={LoginStyles.input}
              placeholder="••••••••"
              placeholderTextColor="#94A3B8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={LoginStyles.button} onPress={handleLogin}>
            <Text style={LoginStyles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={LoginStyles.footer}>
          <Text style={LoginStyles.footerText}>
            Forgot password? <Text style={LoginStyles.link}>Reset here</Text>
          </Text>
          <Link href="/(auth)/register">
            <Text style={LoginStyles.footerText}>
              Don't have an account? <Text style={LoginStyles.link}>Register</Text>
            </Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
