import React, { Component } from 'react';
import { call } from '../helpers/api';
import Icon from './Icon.js';
import './FilterList.css';

class FilterList extends Component {

  static defaultProps = {
    selected: []
  }

  state = {
      options: []
  }

  componentDidMount() {
    call('/factions')
      .then(options => this.setState({ options }))
      .catch(err => console.log(err));
  }

  filterBySide = (option) => {
    if (!this.props.side) {
      return true;
    }
    return option.side === this.props.side;
  }

  isSelected = (faction) => {
    return this.props.selected.includes(faction.code);
  }

  change = faction => () => {
    let selected = this.props.selected;
    if (this.props.selected.includes(faction.code)) {
       selected = this.props.selected.filter(item => item !== faction.code)
    } else {
      selected = this.props.selected.concat(faction.code);
    }

    this.props.onChange(selected);
  }

  render() {
    return (
      <div id="factions" className="filter-list">
        <h4 className="filter-list-title">Factions</h4>
        {this.state.options.filter(this.filterBySide).map((faction) => (
        <div key={faction.code} className="checkbox">
          <label htmlFor={'faction-filter-' + faction.code}>
            <input type="checkbox" id={'faction-filter-' + faction.code} name={faction.code} value={faction.code} checked={this.isSelected(faction)} onChange={this.change(faction)} />
            &nbsp; <Icon code={faction.code}/> {faction.name}
          </label>
        </div>
      ))}</div>
    );
  }
}

export default FilterList;
