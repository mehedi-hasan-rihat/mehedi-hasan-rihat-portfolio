interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function AnimatedText({ 
  text, 
  className = "", 
  delay = 0,
  staggerDelay = 0.03 
}: AnimatedTextProps) {
  return (
    <span className={className}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block animate-fade-in"
          style={{
            animationDelay: `${delay + index * staggerDelay}s`,
            animationFillMode: "backwards",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
