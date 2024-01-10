import './App.css';
import { Parent } from './parent';
import { ParentWithContext } from './parent-with-context';
import { ParentWithJotai } from './parent-with-jotai';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>
        <span>State</span>
        <Parent />
      </div>
      <div>
        <span>Context</span>
        <ParentWithContext />
      </div>
      <div>
        <span>Jotai</span>
        <ParentWithJotai />
      </div>
    </div>
  );
}

export default App;
