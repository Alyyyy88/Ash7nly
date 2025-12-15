import { StyleSheet } from 'react-native';

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  blob: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.1,
  },
  blobTop: {
    width: 300,
    height: 300,
    backgroundColor: '#EF4444',
    top: -60,
    right: -60,
  },
  blobBottom: {
    width: 200,
    height: 200,
    backgroundColor: '#3B82F6',
    bottom: -40,
    left: -40,
  },
  content: {
    padding: 24,
    zIndex: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#EF4444',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
  },
  form: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A202C',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    height: 48,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1A202C',
  },
  button: {
    height: 48,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#64748B',
  },
  link: {
    color: '#EF4444',
    fontWeight: 'bold',
  },
});
