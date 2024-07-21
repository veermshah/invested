import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { WebView } from "react-native-webview";
import { useGlobalSearchParams } from "expo-router";

const TradingViewWidget = () => {
    const { ticker } = useGlobalSearchParams();
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body, html {
          margin: 0;
          padding: 0;
          overflow: hidden;
          width: 100%;
          height: 100%;
        }
        .tradingview-widget-container {
          position: absolute; /* Ensure absolute positioning */
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: 0;
          padding: 0;
          border: none;
        }
      </style>
      <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"></script>
    </head>
    <body>
    <!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container">
  <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js" async>
  {
  "width": "333",
  "height": "300",
  "symbol": "NASDAQ:${ticker}",
  "interval": "W",
  "timezone": "Etc/UTC",
  "theme": "dark",
  "style": "5",
  "locale": "en",
  "backgroundColor": "rgba(22, 22, 28, 0)",

  "hide_top_toolbar": true,
  "hide_legend": true,
  "allow_symbol_change": false,
  "save_image": false,
  "calendar": false,
  "hide_volume": true,
  "support_host": "https://www.tradingview.com"
}
  </script>
</div>
<!-- TradingView Widget END -->
    </body>
    </html>
  `;

    return (
        <WebView
            originWhitelist={["*"]}
            source={{ html: htmlContent }}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
        />
    );
};

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    width: 333,
    height: 300,
    backgroundColor: 'transparent',
  },
});

export default TradingViewWidget;
