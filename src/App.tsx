import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Tab } from './Tab';
import { ConfigContent } from './ConfigContent';
import { Config } from './Config';
import { ResultContent } from './ResultContent';

enum TabType {
  Config,
  Result,
}

function App() {
  const [selectedTab, selectTab] = useState(TabType.Config);
  const [config, setConfig] = useState<Config | null>(null);
  const [textareaContent, setTextareaContent] = useState('');

  const handleApply = (newConf: Config) => {
    setConfig(newConf);
    selectTab(TabType.Result);
  };

  return (
    <div className="App">
      <div className="Container">
        <div className="Tabs">
          <Tab name="Config" selected={selectedTab === TabType.Config} onClick={() => selectTab(TabType.Config)} />
          <Tab name="Result" selected={selectedTab === TabType.Result} onClick={() => selectTab(TabType.Result)} />
        </div>
        {selectedTab === TabType.Config && (
            <ConfigContent onApply={handleApply} value={textareaContent} onChange={setTextareaContent} />
          )}
          {selectedTab === TabType.Result && (
            <ResultContent config={config} onSubmit={console.log} />
          )}
      </div>
    </div>
  );
}

export default App;
