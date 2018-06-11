import * as React from 'react'

interface IProps {
  list: any[]
  select: (item: number) => void
}
interface IState {
  currentItem: number
}

enum KEYS {
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
  ENTER = 'Enter'
}

export class BindKeyboardToList extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = { currentItem: -1 }
  }

  public componentDidMount() {
    window.addEventListener('keydown', this.handleOnKeyDown)
  }

  public componentWillUnmount() {
    window.removeEventListener('keydown', this.handleOnKeyDown)
  }

  public render() {
    const { children } = this.props
    return (
      <div style={{position: 'relative'}}>
        {children}
      </div>
    )
  }

  private handleOnKeyDown = (e: KeyboardEvent) => {

    if (e.key === KEYS.DOWN) {
      let position = this.state.currentItem === -1 ? 0 : this.state.currentItem + 1
      position = position === this.props.list.length ? 0 : position
      this.setState({ currentItem: position })
    }

    if (e.key === KEYS.UP) {
      let position = this.state.currentItem === -1 ? this.props.list.length - 1 : this.state.currentItem - 1
      position = position < 0 ? this.props.list.length - 1 : position
      this.setState({ currentItem: position })
    }

    const pos = this.state.currentItem === 0 ? 0 : (this.state.currentItem * 64) - 64
    window.scrollTo(0, pos)
    this.props.select(this.state.currentItem)
  }
}
