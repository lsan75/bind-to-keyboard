/**
 * Usage :
 * - provide elements inside <BindKeyboardToList />
 * - set a tabIndex to each element
 * - provide a data-value unique id of elements to be bound to keyboard events
 * - data-value must be set on a native HTMLElement
 * - selectItem function binds a function to be executed on Enter and returns the line number selected
 */

import * as React from 'react'

interface IProps {
  selectItem: (item: number) => void
  length: number
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
  }

  public componentWillUnmount() {
    window.removeEventListener('keydown', this.handleOnKeyDown)
    window.removeEventListener('mousemove', this.resetPosition)
  }

  public render() {
    const { children } = this.props
    return (
      <div className="AppContent" ref={el => this.parent = el}>
        {children}
      </div>
    )
  }

  private handleOnKeyDown = (e: KeyboardEvent) => {

    // prevent parent scrolling
    e.preventDefault()

    const { currentPosition } = this.state
    const { length } = this.props

    if (!length) { return }

    if (e.key === KEYS.DOWN) {
      const position = currentPosition === length - 1 ? length - 1 : currentPosition + 1
      this.changePosition(position)
    }

    if (e.key === KEYS.UP) {
      if (currentPosition === -1) { return }
      const position = currentPosition === 0 ? 0 : currentPosition - 1
      this.changePosition(position)
    }

    if (e.key === KEYS.ENTER && currentPosition !== -1) {
      this.props.selectItem(currentPosition)
      this.resetPosition()
    }
  }

  private changePosition = (currentPosition: number) => {
    this.setState({ currentPosition }, () => {
      if (this.parent) {
        const item: HTMLElement = this.parent.querySelector(`[data-value="${currentPosition}"]`) as HTMLElement
        item.focus()
      }
    })
  }

  private resetPosition = () => {
    const formerPosition = this.state.currentPosition
    this.setState({ currentPosition: -1 }, () => {
      if (this.parent && formerPosition > -1) {
        const item: HTMLElement = this.parent.querySelector(`[data-value="${formerPosition}"]`) as HTMLElement
        item.blur()
      }
    })
  }
}
