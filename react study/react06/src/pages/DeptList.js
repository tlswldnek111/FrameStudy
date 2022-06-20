import React from 'react'

function DeptList() {
  const arr=[];
  arr.push({dname:'user1',loc:'test1'});
  arr.push({dname:'user2',loc:'test1'});
  arr.push({dname:'user3',loc:'test1'});
  arr.push({dname:'user4',loc:'test1'});

  return (
    <div>
      <h1>List Page</h1>
    <table className='table'>
      <thead>
          <tr>
              <th>deptno</th>
              <th>dname</th>
              <th>loc</th>
          </tr>
      </thead>
      <tbody>
          {arr.map((bean,idx)=>(
              <tr key={idx}>
                  <td>{idx}</td>
                  <td>{bean.dname}</td>
                  <td>{bean.loc}</td>
              </tr>
          ))}
      </tbody>


    </table>
    </div>

  )
}

export default DeptList