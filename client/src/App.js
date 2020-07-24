import React, { Component } from 'react';
import CardList from './components/CardList';
import ControlPanel from './components/ControlPanel';
import SideButton from './components/SideButton';
import FilterList from './components/FilterList';
import SmallPrint from './components/SmallPrint';
import './App.css';

class App extends Component {
  state = {
      side: "runner",
      factions_runner: [],
      factions_corp: [],
      types_runner: [],
      types_corp: []
  };

  setSide = (side) => {
    this.setState({ side });
  }

  getSide = () => {
    return this.state.side;
  }

  setFactions = (factions, side = null) => {
    const currentSide = side || this.getSide();
    this.setState({ [`factions_${currentSide}`]: factions });
  }

  getFactions = (side = null) => {
    const currentSide = side || this.getSide();
    return this.state[`factions_${currentSide}`];
  }

  setTypes = (types, side = null) => {
    const currentSide = side || this.getSide();
    this.setState({ [`types_${currentSide}`]: types });
  }

  getTypes = (side = null) => {
    const currentSide = side || this.getSide();
    return this.state[`types_${currentSide}`];
  }

  render() {
    return (
      <div className="App">
        <ControlPanel>
          <div id="sides">
            <SideButton title='Runner' side="runner" selected={this.getSide() === 'runner'} onSelect={this.setSide} />
            <SideButton title='Corp' side="corp" selected={this.getSide() === 'corp'} onSelect={this.setSide} />
          </div>
          <FilterList title="Factions" endpoint="factions" side={this.getSide()} selected={this.getFactions()} onChange={this.setFactions} />
          <FilterList title="Types" endpoint="types" side={this.getSide()} selected={this.getTypes()} onChange={this.setTypes} />
          <SmallPrint/>
        </ControlPanel>
        <CardList side={this.getSide()} factions={this.getFactions()} types={this.getTypes()}/>
      </div>
    );
  }
}

export default App;
