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
	const handleTimeChange = useCallback((time: Time) => {
		setTime(time)
	}, [])
	const countdown = useMemo(() => countdownControl(handleTimeChange), [])
	const start = useCallback(() => {
		countdown.start(time.secondsTotal)
	}, [countdown.start, time.secondsTotal])
	const pause = useCallback(() => {
		countdown.stop()
	}, [countdown.start, time.secondsTotal])
	const stop = useCallback(() => {
		countdown.stop()
		setTime(zero)
	}, [countdown.stop])

	return useMemo(
		() => ({
			start,
			pause,
			stop,
			time,
		}),
		[start, pause, stop, time],
	)
}
