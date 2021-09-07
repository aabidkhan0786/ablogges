import { db } from "../firebase"
import Link from "next/link"
import { useEffect, useState } from 'react';


export default function Home({ allBlogs, align }) {
  const [blogs, setBlogs] = useState(allBlogs);
  const [end, setEnd] = useState(false);
  const [loading, setLoading] = useState(false);


  const loadMore = async () => {
    setLoading(true);
    const lastBlog = blogs[blogs.length - 1]
    const result = await db.collection('ablogs').orderBy("createdAt", "desc").startAfter(new Date(lastBlog.createdAt)).limit(3).get()
    const newBlogs = result.docs.map(b => {
      return {
        ...b.data(),
        id: b.id,
        createdAt: b.data().createdAt.toMillis()
      }
    })
    setBlogs(blogs.concat(newBlogs));
    setLoading(false);
    if (newBlogs.length < 3) {
      setEnd(true)
    }
  }
  return (
    <>
      <div className="row create_blog">
        {
          blogs.map(blog => (
            <div className={align ? "col-lg-8 col-10 my-4 rounded shadow-lg p-3  ": "col-lg-5 col-10 my-3  shadow-lg mx-4  p-3 bg-body rounded"}>
              <div className="card">
                <h4 className="card-title text-center text-capitalize text-warning ">{blog.createdBy ? blog.createdBy : "aBlogges User"}</h4>
                <img src={blog.imageUrl} className="card-img-bottom" alt="blog_img" loading="lazy" />
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text read_more">{blog.body}</p>
                  <h4 className="float-right">
                    <Link href={`/blogs/${blog.id}`} color="primary"><a className="text-warning px-2">Read More... <i className="fab fa-readme"></i></a></Link>
                  </h4>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className="row-fluid create_blog">
        <div className={align ? "col-12 col-lg-9 mx-auto mt-4 shadow-lg p-3  mb-5 bg-body rounded" : "col-12 col-lg-11 shadow-lg p-3 mb-5 bg-body rounded"}>
          {end ? <h2 className="text-center">You Have Reached End!</h2>
            :
            <center>
              {
                loading ? <button className="btn btn-md   btn-outline-primary" disabled>
                  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                  Loading Blogs...
                </button> :
                  <button className="btn btn-md  btn-outline-primary" onClick={() => loadMore()} >LOAD MORE BLOGS!</button>
              }
            </center>
          }
        </div>
      </div>
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

  return {
    props: { allBlogs },
  }
}