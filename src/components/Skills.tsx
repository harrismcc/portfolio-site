// Have to do some type-bashing because of the react-typist library
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useCallback, useEffect, useState } from "react"
import Typist from "react-typist"

interface TypistLoopProps {
  /** time the loop takes */
  interval?: number
  /** children to display */
  children: React.ReactNode
}

const TypistLoop: ({
  interval,
  children,
}: TypistLoopProps) => React.ReactNode[] = ({ interval = 1000, children }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [timer, setTimer] = useState()

  useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
      if (timer) clearTimeout(timer)
    }
  }, [])

  const showNext = useCallback(() => {
    if (!mounted) return
    setCurrentIndex((currentIndex + 1) % React.Children.count(children))
  }, [mounted, currentIndex, children])

  const onTypingDone = useCallback(() => {
    setTimer(setTimeout(showNext, interval) as any)
  }, [showNext, interval])

  return React.Children.map(
    children,
    (child, i) =>
      i === currentIndex &&
      React.cloneElement(child as React.ReactElement, {
        onTypingDone,
      })
  ) as any[]
}

export const Skills: React.FC = () => {
  const skills = [
    "TypeScript",
    "React",
    "SQL",
    "CSS",
    "GraphQL",
    "API Integrations",
    "Customer Communication",
    "Bug Triaging",
  ]

  const displayed = []

  return (
    <div>
      <div className="skills-header">
        <p>Skills</p>
      </div>
      <div className="skills-box">
        <p style={{ color: "#3E7B05" }}>harris@ubuntu</p>
        <p>:</p>
        <p style={{ color: "#2A5183" }}>~</p>
        <p>$ </p>

        <Typist startDelay={100} cursor={{ blink: true }}>
          {skills.join(", ")}
          {/* <Typist.Backspace count={text.length} delay={500} /> */}
        </Typist>
      </div>
    </div>
  )
}
