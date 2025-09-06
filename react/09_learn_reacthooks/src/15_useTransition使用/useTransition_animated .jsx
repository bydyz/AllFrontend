import { useTransition, animated } from 'react-spring';

const App = ({ show }) => {
  const transitions = useTransition(show, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <div>
      {transitions.map(({ item, key, props }) =>
        item ? (
          <animated.div key={key} style={props}>
            Content appears
          </animated.div>
        ) : (
          <animated.div key={key} style={props}>
            Content disappears
          </animated.div>
        )
      )}
    </div>
  );
};

export default App
