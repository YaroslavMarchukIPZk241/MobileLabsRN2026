import React, { useRef } from 'react';
import { Animated, Text } from 'react-native';
import styled from 'styled-components/native';
import {
  Directions,
  FlingGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  PinchGestureHandler,
  State,
  TapGestureHandler
} from 'react-native-gesture-handler';
import { useGame } from '../context/GameContext';

export default function HomeScreen() {
  const { stats, addTap, addDoubleTap, addLongPress, addDrag, addSwipeLeft, addSwipeRight, addPinch } = useGame();

  const singleTapRef = useRef<TapGestureHandler>(null);
  const doubleTapRef = useRef<TapGestureHandler>(null);
  const panRef = useRef<PanGestureHandler>(null);
  const pinchRef = useRef<PinchGestureHandler>(null);

  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const currentScale = useRef(1);

const onPanGestureEvent = Animated.event(
  [{ nativeEvent: { translationX: pan.x, translationY: pan.y } }],
  { useNativeDriver: false }
);

const onPinchGestureEvent = Animated.event(
  [{ nativeEvent: { scale } }],
  { useNativeDriver: false }
);

  return (
    <Screen>
      <ScoreCard>
        <ScoreLabel>SCORE</ScoreLabel>
        <ScoreValue>{stats.score}</ScoreValue>
      </ScoreCard>

      <Hint>
        Натискай, утримуй 3 секунди, перетягуй, свайпай вправо/вліво або змінюй розмір об'єкта.
      </Hint>

      <Playground>
        <PanGestureHandler
          ref={panRef}
          simultaneousHandlers={pinchRef}
          onGestureEvent={onPanGestureEvent}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.oldState === State.ACTIVE) {
              pan.extractOffset();
              addDrag();
            }
          }}
        >
          <Animated.View style={{ transform: pan.getTranslateTransform() }}>
            <FlingGestureHandler
              direction={Directions.LEFT}
              onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.ACTIVE) addSwipeLeft();
              }}
            >
              <FlingGestureHandler
                direction={Directions.RIGHT}
                onHandlerStateChange={({ nativeEvent }) => {
                  if (nativeEvent.state === State.ACTIVE) addSwipeRight();
                }}
              >
                <PinchGestureHandler
                  ref={pinchRef}
                  simultaneousHandlers={panRef}
                  onGestureEvent={onPinchGestureEvent}
                  onHandlerStateChange={({ nativeEvent }) => {
                    if (nativeEvent.oldState === State.ACTIVE) {
                      currentScale.current = Math.max(0.7, Math.min(1.8, currentScale.current * nativeEvent.scale));
                      scale.setValue(currentScale.current);
                      addPinch();
                    }
                  }}
                >
                  <Animated.View style={{ transform: [{ scale }] }}>
                    <LongPressGestureHandler
                      minDurationMs={3000}
                      onHandlerStateChange={({ nativeEvent }) => {
                        if (nativeEvent.state === State.ACTIVE) addLongPress();
                      }}
                    >
                      <TapGestureHandler
                        ref={doubleTapRef}
                        numberOfTaps={2}
                        maxDelayMs={250}
                        onHandlerStateChange={({ nativeEvent }) => {
                          if (nativeEvent.state === State.ACTIVE) addDoubleTap();
                        }}
                      >
                        <TapGestureHandler
                          ref={singleTapRef}
                          waitFor={doubleTapRef}
                          numberOfTaps={1}
                          onHandlerStateChange={({ nativeEvent }) => {
                            if (nativeEvent.state === State.ACTIVE) addTap();
                          }}
                        >
                          <ClickObject>
                            <ObjectIcon>👆</ObjectIcon>
                            <ObjectText>TAP</ObjectText>
                          </ClickObject>
                        </TapGestureHandler>
                      </TapGestureHandler>
                    </LongPressGestureHandler>
                  </Animated.View>
                </PinchGestureHandler>
              </FlingGestureHandler>
            </FlingGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </Playground>

      <InfoCard>
        <InfoRow><Text>👆</Text><InfoText>Tap: +1 point</InfoText></InfoRow>
        <InfoRow><Text>✨</Text><InfoText>Double tap: +2 points</InfoText></InfoRow>
        <InfoRow><Text>🕒</Text><InfoText>Long press 3 seconds: +5 points</InfoText></InfoRow>
        <InfoRow><Text>↔️</Text><InfoText>Swipe: random points</InfoText></InfoRow>
        <InfoRow><Text>🤏</Text><InfoText>Pinch: +7 points</InfoText></InfoRow>
      </InfoCard>
    </Screen>
  );
}

const Screen = styled.ScrollView.attrs({ contentContainerStyle: { padding: 20, alignItems: 'center' } })`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const ScoreCard = styled.View`
  width: 150px;
  padding: 18px;
  border-radius: 18px;
  background-color: ${({ theme }) => theme.cardSoft};
  align-items: center;
  margin-top: 18px;
  margin-bottom: 14px;
`;

const ScoreLabel = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.muted};
  font-weight: 700;
`;

const ScoreValue = styled.Text`
  margin-top: 6px;
  font-size: 34px;
  color: ${({ theme }) => theme.primary};
  font-weight: 800;
`;

const Hint = styled.Text`
  color: ${({ theme }) => theme.muted};
  text-align: center;
  line-height: 21px;
  margin-bottom: 20px;
`;

const Playground = styled.View`
  height: 260px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ClickObject = styled.View`
  width: 128px;
  height: 128px;
  border-radius: 64px;
  background-color: ${({ theme }) => theme.primary};
  border-width: 6px;
  border-color: ${({ theme }) => theme.card};
  align-items: center;
  justify-content: center;
  elevation: 5;
  shadow-color: ${({ theme }) => theme.shadow};
  shadow-opacity: 0.18;
  shadow-radius: 10px;
  shadow-offset: 0px 6px;
`;

const ObjectIcon = styled.Text`
  font-size: 24px;
`;

const ObjectText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 900;
  letter-spacing: 1px;
`;

const InfoCard = styled.View`
  width: 100%;
  padding: 18px;
  border-radius: 18px;
  background-color: ${({ theme }) => theme.card};
  border-width: 1px;
  border-color: ${({ theme }) => theme.border};
`;

const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
`;

const InfoText = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
`;
