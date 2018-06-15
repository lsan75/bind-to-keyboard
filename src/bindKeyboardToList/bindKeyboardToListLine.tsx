import * as React from 'react'

interface ILineProps {
  identifier: string
  className?: string
}

export class BindKeyboardToListLine extends React.Component<ILineProps> {

  constructor(props: ILineProps) {
    super(props)
  }

  public render() {
    const { children, className, identifier } = this.props
    return <div
      data-value={identifier}
      className={className}
      tabIndex={0}
    >
      {children}
    </div>
  }
}