import React, { useState, useEffect } from 'react'

const ScrambleText = ({ text, speed = 30, step = 3 }) => {
    const [displayed, setDisplayed] = useState('')
    const chars = '!<>-_\\/[]{}—=+*^?#________'

    useEffect(() => {
        let frame = 0
        let output = ''
        let interval

        const scramble = () => {
            output = ''
            for (let i = 0; i < text.length; i++) {
                if (i < frame / step) {
                    output += text[i]
                } else {
                    output += chars[Math.floor(Math.random() * chars.length)]
                }
            }
            setDisplayed(output)

            frame++
            if (frame > text.length * step) {
                clearInterval(interval)
                setDisplayed(text)
                setTimeout(() => {
                    frame = 0
                    interval = setInterval(scramble, speed)
                }, 7000)
            }
        }

        interval = setInterval(scramble, speed)
        return () => clearInterval(interval)
    }, [text, speed, step])

    return <span>{displayed}</span>
}

export default ScrambleText
