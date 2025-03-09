import '@testing-library/jest-native/extend-expect'

// setupTests.js
import { NativeModules } from 'react-native';

// Mock the NativeAnimatedModule directly
NativeModules.NativeAnimatedModule = {
  startOperationBatch: jest.fn(),
  finishOperationBatch: jest.fn(),
  createAnimatedNode: jest.fn(),
  updateAnimatedNodeConfig: jest.fn(),
  connectAnimatedNodes: jest.fn(),
  disconnectAnimatedNodes: jest.fn(),
  startAnimatingNode: jest.fn(),
  stopAnimation: jest.fn(),
  setAnimatedNodeValue: jest.fn(),
  setAnimatedNodeOffset: jest.fn(),
  flattenAnimatedNodeOffset: jest.fn(),
  extractAnimatedNodeOffset: jest.fn(),
  connectAnimatedNodeToView: jest.fn(),
  disconnectAnimatedNodeFromView: jest.fn(),
  restoreDefaultValues: jest.fn(),
  dropAnimatedNode: jest.fn(),
  addAnimatedEventToView: jest.fn(),
  removeAnimatedEventFromView: jest.fn(),
};

// Mock Animated module's timing function
jest.mock('react-native', () => {
  const reactNative = jest.requireActual('react-native');
  
  // Override Animated.timing
  reactNative.Animated.timing = (value, config) => {
    return {
      start: (callback) => {
        value.setValue(config.toValue);
        if (callback) callback({ finished: true });
      },
      stop: () => {},
    };
  };
  
  return reactNative;
});