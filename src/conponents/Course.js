import Header from "./Header";
import Part from "./Part";
import Total from "./Total";

const Course = ({courses}) => {

  const getSum = (parts) => {
     // prev 最后的结果 cur 当前对象 0 代表从什么时候开始加
      return parts.reduce((prev, cur ) => {
        console.log(prev, cur)
        return cur.exercises + prev
      }, 0)
  }

  return(
    <>
      {
        courses.map((course) => {
          return (
            <div key={course.id}>
              <Header name={course.name} />
              <Part parts={course.parts} />
              <Total total={getSum(course.parts)} />
            </div>
          )
        })
      }
    </>
  )
}

export default Course