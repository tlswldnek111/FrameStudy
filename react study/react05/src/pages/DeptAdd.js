import {useNavigate} from "react-router-dom";

function DeptAdd(props){
    const navigate=useNavigate();
    const insertSubmit=(e)=>{
        e.preventDefault();
        const param={};
        param.deptno=Number(e.target.deptno.value);
        param.dname=e.target.dname.value;
        param.loc=e.target.loc.value;
        console.log(param);
        fetch('http://localhost:8080/api/dept',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                //   'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify(param),
            //   body: 'deptno='+param.deptno+"&dname="+param.dname+"&loc="+param.loc,
        })
            .then(res=>(res.json()))
            .then(result=>{
                //~v5
                //this.props.history.push('/dept');
                //props.history.push('/dept');
                //v6~
                navigate('/dept', {state:
                {
                    num:param.deptno,
                    dname:param.dname
                },
                });
            });
    }
    return (
    <>
        <h1>DeptAdd</h1>
        <form className="form-horizontal" onSubmit={insertSubmit} >
        <div className="form-group">
            <label>deptno
                <input type="text" className="form-control" name="deptno" placeholder="deptno"/>
            </label>
        </div>
        <div className="form-group">
            <label>dname
                <input type="text" className="form-control" name="dname" placeholder="dname"/>
            </label>
        </div>
        <div className="form-group">
            <label>loc
                <input type="text" className="form-control" name="loc" placeholder="loc"/>
            </label>
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-primary">입력</button>
            <button type="submit" className="btn btn-default">취소</button>
            <button type="submit" className="btn btn-default">뒤로</button>
        </div>
        </form>
    </>
    );
}
// export default withRouter(DeptAdd);
export default DeptAdd;