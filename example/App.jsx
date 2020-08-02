import React, {Component} from 'react';
import Input from './components/Input';

class App extends Component {
  render() {
    return (
      <div>
        <Input rules={{required: true}}/>
        <Input rules={{ required: true, max: 4 }}/>
        <Input rules={['required', 'max:4', 'between:2,5', 'even']}/>
      </div>
    );
  }
}

export default App;
