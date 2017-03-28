import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Router
       , Route
       , browserHistory
       , Link
       , IndexRedirect
       , IndexRoute } from 'react-router'

import axios from 'axios'

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.get('/api/puppies')
      .then(rsp => rsp.data)
      .then(puppies => this.setState({puppies}))

    axios.get('/api/kittens')
      .then(rsp => rsp.data)
      .then(kittens => this.setState({kittens}))
  }

  render () {
    const { puppies, kittens } = this.state; //how do we get this data
    if (!puppies || !kittens) return <h1>Loading...</h1>

    console.log(puppies)
    return (
      <div>
        <h3>Puppies!!!</h3>
        { puppies.map(puppy => {
            return (
              <Link to={`/puppies/${puppy}`} key={puppy}>{puppy}</Link> //key of puppy name
            );
        }) }

        <h3>Kittehs!!!</h3>
        { kittens.map(kitty => {
            return (
              <Link to={`/kittens/${kitty}`} key={kitty}>{kitty}</Link> //key of kitty name
            );
        }) }        
      </div>
      )
  }
}

const Hello = () => <h1>Hello world</h1>
// const Puppy = ({ params: {puppyName} }) => 

class Puppy extends React.Component {
  componentDidMount() {
    const name = this.props.params.puppyName
    axios.get(`/api/puppies/${name}`)
      .then(rsp => rsp.data)
      .then(puppy => this.setState({puppy}))
  }

  render() {
    if (!this.state) return <h1>Loading...</h1>
    const {puppy} = this.state
    return <div>
      <pre>{JSON.stringify(this.props, 0, 2)}</pre>
      <h1>{puppy.name}</h1>
      <img src={puppy.image} />
    </div>
  }
}


class Animal extends React.Component {
  componentDidMount() {
    const {name, kind} = this.props.params
    axios.get(`/api/${kind}/${name}`)
      .then(rsp => rsp.data)
      .then(animal => this.setState({animal}))
      .catch(console.error)
  }

  render() {
    if (!this.state) return <h1>Loading...</h1>
    const {animal} = this.state
    return <div>
      <pre>{JSON.stringify(this.props, 0, 2)}</pre>
      <h1>{animal.name}</h1>
      <img src={animal.image} />
    </div>
  }
}


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/">
      {/*<IndexRedirect to="/puppies-and-kittens" />*/}
      <IndexRoute component={App} />
      <Route path="/hello-world" component={Hello}/>
      <Route path="/:kind/:name" component={Animal} />
      <Route path="/puppies-and-kittens" component={App} />    
    </Route>
  </Router>,
  document.getElementById('app')
);