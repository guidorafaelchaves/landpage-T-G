export default function AnimatedTitle({ children, as: Tag = 'h1', className = '' }) {
  const words = String(children).split(' ')
  return (
    <Tag className={`animated-title ${className}`} aria-label={children}>
      {words.map((word, wordIndex) => (
        <span className="title-word" aria-hidden="true" key={`${word}-${wordIndex}`}>
          {[...word].map((letter, letterIndex) => (
            <span className="title-char" style={{ '--char-index': wordIndex * 6 + letterIndex }} key={`${letter}-${letterIndex}`}>
              {letter}
            </span>
          ))}
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}
