import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('/api/values', {
      index: this.state.index
    });
    this.setState({ index: '' })
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({
      seenIndexes: seenIndexes.data,
    });
  }

  renderSeenIndexes = () => {
    const { seenIndexes } = this.state;

    return seenIndexes.map(({ number }) => number).join(', ');
  }

  renderValues = () => {
    const entries = [];
    const { values } = this.state;
    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }
    return entries
  }

  render() {
    const { index, seenIndexes, values } = this.state
    return (
      <div style={{ marginTop: '5vh' }}>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            value={index}
            onChange={e => this.setState({ index: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>

        <h3>Indexes i've seen:</h3>
        {
          seenIndexes && Array.isArray(seenIndexes) && this.renderSeenIndexes()
        }

        <h3>Calclated values:</h3>
        {values && typeof values === 'object' && this.renderValues()}
      </div>
    )
  }
}

export default Fib;
