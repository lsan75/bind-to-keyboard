import * as React from 'react'
import './App.css'
import { BindKeyboardToList } from './bindKeyboardToList/bindKeyboardToList'
import { BindKeyboardToListLine } from './bindKeyboardToList/bindKeyboardToListLine'

import { List, ListRowRenderer } from 'react-virtualized/dist/es/List'

class App extends React.Component<{}> {

  private array: any[] = [
    { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 },
    { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 }
  ]

  public render() {

    const list = <List
      width={300}
      height={300}
      rowCount={this.array.length}
      rowHeight={50}
      rowRenderer={this.rowRenderer}
    />

    return (
      <BindKeyboardToList selectItem={this.selectItemNo} length={this.array.length}>
        {list}
      </BindKeyboardToList>
    )

  }

  private rowRenderer: ListRowRenderer = ({
    key,         // Unique key within array of rows
    index,       // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible,   // This row is visible within the List (eg it is not an overscanned row)
    style        // Style object to be applied to row (to position it)
  }) => {

    return <div style={style} key={key}>
      <BindKeyboardToListLine index={index} className={'AppLine'}>
        {this.array[index].id}
      </BindKeyboardToListLine>
    </div>
  }

  private selectItemNo = (item: number) => {
    window.console.log(this.array[item])
  }
}

export default App
