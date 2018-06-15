import * as React from 'react'

interface ILineProps {
  index: number
  className?: string
}

export class BindKeyboardToListLine extends React.Component<ILineProps> {

  constructor(props: ILineProps) {
    super(props)
  }

  public render() {
    const { children, className, index } = this.props
    return <div
      data-index={index}
      className={className}
      tabIndex={0}
    >
      {children}
    </div>
  }
}