import * as React from 'react'
import './App.css'
import { BindKeyboardToList } from './bindKeyboardToList/bindKeyboardToList'

class App extends React.Component<{}> {

  private array: number[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ]

  public render() {

    return (
      <BindKeyboardToList selectItemNo={this.selectItemNo} lineClass={'.AppLine'}>
        {this.array.map((item: number, ix: number) => {
          return (
            <div key={ix} tabIndex={ix + 1} className="AppLine">{item}</div>
          )
        })}
      </BindKeyboardToList>
    )

  }

  private selectItemNo = (item: number) => {
    window.console.log(this.array[item])
  }
}

export default App;
