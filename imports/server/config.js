function configs(param) {
  const IPS = [
    "255.255.255.255",
    "192.168.1.4",
    "192.168.1.7",
    "0.0.0.0",
    "127.0.0.1",
  ];
  configs = {
    transitionDuration: 500,
    transitionTreshold: 200,
    fixturesPerUniverse: 150,
    channelsPerFixture: 3,
    universes: 4,
    debugMode: false,
    options: {
      host: IPS[4],
      port: 6454,
    },
  };
  return configs[param];
}
export { configs };
