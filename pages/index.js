import { db } from "../firebase"
import Link from "next/link"
import { useEffect, useState } from 'react';


export default function Home({ allBlogs }) {
  const [blogs,setBlogs] = useState(allBlogs);
  const [end,setEnd] = useState(false);
  const [loading,setLoading] = useState(false);



  const loadMore =async ()=>{
    setLoading(true);
    const lastBlog = blogs[blogs.length-1]
    const result =await db.collection('ablogs').orderBy("createdAt", "desc").startAfter(new Date(lastBlog.createdAt)).limit(3).get()
    const newBlogs = result.docs.map(b=>{
      return {
        ...b.data(),
        id: b.id,
        createdAt: b.data().createdAt.toMillis()
      }
    })
    setBlogs(blogs.concat(newBlogs));
    setLoading(false);
    if(newBlogs.length < 3){
      setEnd(true)
    }
  }
  return (
    <>
      {/* <div className="row g-0">
      <div className="col-12 col-md-8 mx-auto my-5"> */}
      {
        blogs.map(blog => (
          <div className="row-fluid create_blog">
            <div className="col-12 col-lg-8 mx-auto shadow-lg p-3 mb-5 bg-body rounded">
              <div className="card">
                  <h4 className="card-title text-center text-capitalize text-warning my-2">{blog.createdBy ? blog.createdBy : "aBlogges User"}</h4>
                <img src={blog.imageUrl} className="card-img-bottom" alt="blog_img" />
                <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text read_more"> {blog.body}</p>
                    <h4 className="float-right">
                      <Link href={`/blogs/${blog.id}`} color="primary"><a className="text-warning px-2">Read More... <i className="fab fa-readme"></i></a></Link>
                      </h4>
                  {/* <p className="card-text float-right"><small className="text-muted">Last updated 3 mins ago</small></p> */}
                </div>
              </div>
            </div>
          </div>
        ))
      }
       <div className="row-fluid create_blog">
            <div className="col-12 col-lg-8 mx-auto shadow-lg p-3 mb-5 bg-body rounded  ">
             
             {end ? <h2 className="text-center">You Have Reached End!</h2>
             :
             <center>
               {
                 loading ? <button className="btn btn-md   btn-outline-primary"  disabled>
                 <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                 Loading Blogs...
               </button>:
                <button className="btn btn-md  btn-outline-primary" onClick={()=>loadMore()} >LOAD MORE BLOGS!</button>         
               }
             </center>
             }
              </div>
            </div>
      {/* </div>
    </div> */}

    </>);
}


export async function getServerSideProps(context) {
  const querySnap = await db.collection("ablogs").orderBy("createdAt", "desc").limit(3).get()
  const allBlogs = querySnap.docs.map(blogs => {
    return {
      ...blogs.data(),
      id: blogs.id,
      createdAt: blogs.data().createdAt.toMillis()
    }
  }
  )
  console.log(allBlogs);
  return {
    props: { allBlogs },
  }
}