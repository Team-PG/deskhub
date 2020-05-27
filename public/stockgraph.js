new TradingView.widget(
  {
    'width': 280,
    'height': 210,
    'symbol': '<%= resultSuper.exchangeShortName%>:<%=resultSuper.symbol%>',
    'interval': 'D',
    'timezone': 'Etc/UTC',
    'theme': 'light',
    'style': '1',
    'locale': 'en',
    'toolbar_bg': '#f1f3f6',
    'enable_publishing': false,
    'allow_symbol_change': true,
    'container_id': 'tradingview_c8cd5'
  }
);

