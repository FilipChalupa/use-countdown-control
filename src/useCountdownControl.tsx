import {
	countdownControl,
	secondsToTime,
	Time,
	timeToSeconds,
	TimeWithTotal,
} from 'countdown-control'
import { useCallback, useMemo, useState } from 'react'

const zero: TimeWithTotal = {
	days: 0,
	hours: 0,
	minutes: 0,
	seconds: 0,
	secondsTotal: 0,
}

export const useCountdownControl = (initialTime?: number | Partial<Time>) => {
	const [time, setTime] = useState<TimeWithTotal>(() => {
		if (initialTime === undefined) {
			return zero
		}
		const secondsTotal =
			typeof initialTime === 'number' ? initialTime : timeToSeconds(initialTime)
		return {
			...secondsToTime(secondsTotal),
			secondsTotal,
		}
	})
	const [isRunning, setIsRunning] = useState(false)
	const handleTimeChange = useCallback((time: TimeWithTotal) => {
		setTime(time)
		setIsRunning(time.secondsTotal !== 0)
	}, [])
	const countdown = useMemo(
		() => countdownControl(handleTimeChange),
		[handleTimeChange],
	)
	const resume = useCallback(() => {
		countdown.start(time.secondsTotal)
	}, [countdown, time.secondsTotal])
	const pause = useCallback(() => {
		countdown.stop()
		setIsRunning(false)
	}, [countdown])
	const stop = useCallback(() => {
		countdown.stop()
		setIsRunning(false)
		setTime(zero)
	}, [countdown])

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
