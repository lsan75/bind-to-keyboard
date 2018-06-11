import * as React from 'react'
import './App.css'
import { BindKeyboardToList } from './bindKeyboardToList/bindKeyboardToList'

interface IState {
  itemSelected: number | null
}

class App extends React.Component<{}, IState> {

  private array: number[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ]

  constructor() {
    super({})
    this.state = { itemSelected: null }
  }

  public render() {

    return (
      <div>
        <BindKeyboardToList list={this.array} select={this.handleSelect}>
          {this.array.map((item: number, ix: number) => {
            const className = `AppLine ${ this.state.itemSelected === ix ? 'selected' : ''}`
            return (
              <div key={ix} className={className}>{item}</div>
            )
          })}
        </BindKeyboardToList>
      </div>
    )

  }

  private handleSelect = (itemSelected: number): void => {
    this.setState({ itemSelected })
  }
}

export default App;
