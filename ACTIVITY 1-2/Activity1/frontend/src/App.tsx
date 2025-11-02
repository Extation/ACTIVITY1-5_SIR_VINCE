import React from 'react';
import TaskList from './components/TaskList';

const styles = {
  app: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  } as React.CSSProperties,
};

function App() {
  return (
    <div style={styles.app}>
      <TaskList />
    </div>
  );
}

export default App;
