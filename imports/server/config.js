function configs(param) {
  configs = {
    transitionDuration:   500,
    transitionTreshold:   200,
    fixturesPerUniverse:  150,
    channelsPerFixture:     3,
    universes:              4,
  };

  return configs[param];
}

export { configs };
