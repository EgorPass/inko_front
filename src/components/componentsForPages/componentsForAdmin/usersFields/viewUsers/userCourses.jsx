import { useMemo  } from "react"
import { CourseListMenu } from "../../../courseListMenu";

export const UserCourses = ({ courses, subjects, userCourses }) => {
	
	const coursesArr = courses.filter(({ id }) => userCourses.includes(id))
	
	const classes = useMemo( () => ( {
		supLists: "mainUserContainer__supLists",
		supListItem: "mainUserContainer__supListItem",
		supListTitle: "mainUserContainer__supListTitle",
		subLists: "mainUserContainer__subLists",
		subListItem: "mainUserContainer__subListItem",
		subListTitle: "mainUserContainer__subListTitle",
	}), [])
	
	const filter = ({ id }) => {
		const res = coursesArr.filter((it) => it.subjectId === id)
		if (res.length > 0) return true;
			return false
	}
	
	return (
		<CourseListMenu
			classes = { classes }
			courses = { coursesArr }
			subjects = { subjects }
			filter = { filter }
		/>
	)
}
