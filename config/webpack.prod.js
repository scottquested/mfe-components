const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const prodConfig = {
	mode: "production",
	output: {
		filename: "[name].[contenthash].js",
		publicPath: "/components/",
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "mfe_components",
			filename: "remoteEntry.js",
			remotes: {},
			exposes: {
				"./Components": "./src/bootstrap",
			},
			shared: {
				...packageJson.dependencies,
				react: {
					singleton: true,
					requiredVersion: packageJson.dependencies.react,
				},
				"react-dom": {
					singleton: true,
					requiredVersion: packageJson.dependencies["react-dom"],
				},
			},
		}),
	],
};

module.exports = merge(commonConfig, prodConfig);
