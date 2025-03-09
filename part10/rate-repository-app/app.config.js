import dotenv from 'dotenv';

dotenv.config();

export default {
	name: "rate-repository-app",
	slug: "rate-repository-app",
	version: "1.0.0",
	orientation: "portrait",
	scheme: "myapp",
	userInterfaceStyle: "automatic",
	newArchEnabled: true,
	ios: {
		supportsTablet: true,
	},
	android: {
		adaptiveIcon: {
			backgroundColor: "#ffffff",
		},
	},
	web: {
		bundler: "metro",
		output: "static",
	},
	plugins: [
		"expo-router",
		[
			"expo-splash-screen",
			{
				imageWidth: 200,
				resizeMode: "contain",
				backgroundColor: "#ffffff",
			},
		],
	],
	experiments: {
		typedRoutes: true,
	},
  extra: {
    env: process.env.ENV,
    REST_URL: process.env.REST_URL,
    APOLO_URI: process.env.APOLO_URI
  },
}
