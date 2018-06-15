import * as React from 'react'

interface IProps {
  selectItem: (item: number) => void
  resetList?: () => void
  length: number
  className?: string
}

interface IState {
  currentPosition: number
}

enum KEYS {
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
  ENTER = 'Enter'
}

export class BindKeyboardToList extends React.Component<IProps, IState> {

  private parent: HTMLElement | null

  constructor(props: IProps) {
    super(props)
    this.state = { currentPosition: -1 }
  }

  public componentDidMount() {
    window.addEventListener('keydown', this.handleOnKeyDown)
    window.addEventListener('mousemove', this.resetPosition)
    window.addEventListener('click', this.onEnter)
  }

  public componentWillUnmount() {
    window.removeEventListener('keydown', this.handleOnKeyDown)
    window.removeEventListener('mousemove', this.resetPosition)
    window.removeEventListener('click', this.onEnter)
  }

  public render() {
    const { children, className } = this.props
    return (
      <div className={className} ref={el => this.parent = el}>
        {children}
      </div>
    )
  }

  private handleOnKeyDown = (e: KeyboardEvent) => {

    // avoid scrolling on keydown
    e.preventDefault()

    const { currentPosition } = this.state
    const { length, resetList } = this.props

    if (!length) { return }

    if (e.key === KEYS.DOWN) {
      if (currentPosition === -1 && resetList) { resetList() }
      const position = currentPosition === length - 1 ? length - 1 : currentPosition + 1
      this.changePosition(position)
    }

    if (e.key === KEYS.UP) {
      if (currentPosition === -1) { return }
      const position = currentPosition === 0 ? 0 : currentPosition - 1
      this.changePosition(position)
    }

    if (e.key === KEYS.ENTER && currentPosition !== -1) {
      this.onEnter()
    }
  }

  private onEnter = () => {
    const { currentPosition } = this.state
    if (currentPosition === -1) { return }

    this.resetPosition()
    this.props.selectItem(currentPosition)
  }

  private changePosition = (currentPosition: number) => {
    this.setState({ currentPosition }, () => {
      if (this.parent) {
        const item: HTMLElement = this.parent.querySelector(`[data-index="${currentPosition}"]`) as HTMLElement
        item.focus()
      }
    })
  }

  private resetPosition = () => {
    const { currentPosition } = this.state
    if (currentPosition === -1) { return }

    const formerPosition = currentPosition
    this.setState({ currentPosition: -1 }, () => {
      if (this.parent) {
        const item: HTMLElement = this.parent.querySelector(`[data-index="${formerPosition}"]`) as HTMLElement
        item.blur()
      }
    })
  }
}
