/**
 * Usage :
 * - provide elements inside <BindKeyboardToList />
 * - set a tabIndex to each element
 * - provide the className identifier of elements to be bound to keyboard events
 * - selectItemNo binds a function to be executed on Enter and returns the line number selected
 */

import * as React from 'react'

interface IProps {
  selectItemNo: (item: number) => void
  lineClass: string
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
    const { lineClass } = this.props
    const children: NodeListOf<HTMLElement> | null = this.parent && this.parent.querySelectorAll(lineClass)

    if (!children) { return }

    if (e.key === KEYS.DOWN) {
      const position = currentPosition === children.length - 1 ? children.length - 1 : currentPosition + 1
      this.changePosition(position)
    }

    if (e.key === KEYS.UP) {
      const position = currentPosition === 0 ? 0 : currentPosition - 1
      this.changePosition(position)
    }

    if (e.key === KEYS.ENTER && currentPosition !== -1) {
      this.props.selectItemNo(currentPosition)
      this.resetPosition()
    }
  }

  private changePosition = (currentPosition: number) => {
    const { lineClass } = this.props
    this.setState({ currentPosition }, () => {
      if (this.parent) {
        const item: HTMLElement = this.parent.querySelectorAll(lineClass)[currentPosition] as HTMLElement
        item.focus()
      }
    })
  }

  private resetPosition = () => {
    const { lineClass } = this.props
    const formerPosition = this.state.currentPosition
    this.setState({ currentPosition: -1 }, () => {
      if (this.parent && formerPosition > -1) {
        const item: HTMLElement = this.parent.querySelectorAll(lineClass)[formerPosition] as HTMLElement
        item.blur()
      }
    })
  }
}
