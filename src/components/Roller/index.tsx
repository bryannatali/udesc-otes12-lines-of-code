import './styles.css'

type RollerProps = {
  className?: string
}

export function Roller({ className }: RollerProps) {
  return (
    <div className={`roller-container ${className || undefined}`}>
      <div className="roller-item" />
      <div className="roller-item" />
      <div className="roller-item" />
      <div className="roller-item" />
      <div className="roller-item" />
      <div className="roller-item" />
      <div className="roller-item" />
      <div className="roller-item" />
      <div className="roller-item" />
      <div className="roller-item" />
      <div className="roller-item" />
      <div className="roller-item" />
    </div>
  )
}