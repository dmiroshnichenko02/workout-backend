export const addPrevValues = (log, prevLog = null) => {
	return log.times.map((time, index) => ({
		...time,
		prevWeight: prevLog?.times[index].weight || 0,
		prevRepeat: prevLog?.times[index].repeat || 0
	}))
}
