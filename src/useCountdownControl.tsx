import { countdownControl, Time } from 'countdown-control'
import { useCallback, useMemo, useState } from 'react'

const zero: Time = {
	days: 0,
	hours: 0,
	minutes: 0,
	seconds: 0,
	secondsTotal: 0,
}

export const useCountdownControl = () => {
	const [time, setTime] = useState<Time>(zero)
	const [isRunning, setIsRunning] = useState(false)
	const handleTimeChange = useCallback((time: Time) => {
		setTime(time)
		setIsRunning(time.secondsTotal !== 0)
	}, [])
	const countdown = useMemo(() => countdownControl(handleTimeChange), [])
	const resume = useCallback(() => {
		countdown.start(time.secondsTotal)
	}, [countdown.start, time.secondsTotal])
	const pause = useCallback(() => {
		countdown.stop()
		setIsRunning(false)
	}, [countdown.start, time.secondsTotal])
	const stop = useCallback(() => {
		countdown.stop()
		setIsRunning(false)
		setTime(zero)
	}, [countdown.stop])

	return useMemo(
		() => ({
			start: countdown.start,
			pause,
			resume,
			stop,
			time,
			isRunning,
		}),
		[countdown.start, pause, resume, stop, time, isRunning],
	)
}
