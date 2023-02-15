import React, { FunctionComponent, useMemo, useState } from 'react'
import { useCountdownControl } from '../useCountdownControl'
import './global.css'

export const Example: FunctionComponent = () => {
	const { start, pause, resume, stop, time, isRunning } = useCountdownControl()
	const [input, setInput] = useState('60')
	const niceTime = useMemo(() => {
		const p = (number: number) => number.toString().padStart(2, '0')
		return `${p(time.days)}:${p(time.hours)}:${p(time.minutes)}:${p(
			time.seconds,
		)}`
	}, [time])

	return (
		<>
			<h1>Countdown control</h1>
			<time>{niceTime}</time>
			<form
				onSubmit={(event) => {
					event.preventDefault()
					start(parseInt(input, 10))
				}}
			>
				<label>
					Seconds to set:{' '}
					<input
						type="number"
						min="0"
						name="seconds"
						value={input}
						onChange={(event) => {
							setInput(event.target.value)
						}}
					/>
				</label>
				<button type="submit">Start</button>
			</form>
			<button
				type="button"
				onClick={() => {
					if (isRunning) {
						pause()
					} else {
						resume()
					}
				}}
				disabled={time.secondsTotal === 0}
			>
				{isRunning ? 'Pause' : 'Resume'}
			</button>
			<button
				type="button"
				onClick={() => {
					stop()
				}}
				disabled={time.secondsTotal === 0}
			>
				Stop
			</button>
		</>
	)
}
