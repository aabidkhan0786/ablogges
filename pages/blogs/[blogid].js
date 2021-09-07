import react from "react"
import { useState } from "react";
import { db } from "../../firebase"
import { useRouter } from "next/router"
import Link from "next/link"

export default function blogId({ blog, user, allComments }) {
  const [comment, setComment] = useState("");
  const [viewCom, SetViewCom] = useState(allComments)
  const router = useRouter();
  const [alerts, setAlerts] = useState(false);
  const [msg, setMsg] = useState('')

  const { blogid } = router.query
  const makeComment = async () => {
    if (comment === "") {
      setMsg("Please add a comment!")
      setAlerts(true)
    } else {
      await db.collection("ablogs").doc(blogid).collection('comments').add({
        text: comment,
        name: user.displayName
      })
      setComment("");
      setMsg("New comment added!")
      setAlerts(true)
    }
    const comQuery = await db.collection("ablogs").doc(blogid).collection('comments').get()
    SetViewCom(comQuery.docs.map(view => view.data()))
  }

  return (
    <>
      <div className="row-fluid create_blog">
        <div className="col-12 col-lg-8 mx-auto shadow-lg p-3 mb-5 bg-body rounded">
          <div className="card">
            <h2 className="card-title text-center text-warning text-capitalize"> {blog.createdBy}</h2>
            <div className="card-body">
              <h4 className="card-title text-capitalize">{blog.title}</h4>
              <h5 className="card-text px-2">{blog.body}</h5>
            </div>
            <img src={blog.imageUrl} className="card-img-bottom" alt="blog_img" />
            <h2 className="card-text text-center my-5  py-3">Created On -<small className="text-primary">{new Date(blog.createdAt).toDateString()}</small></h2>
          </div>
          <div className="my-3">
            <h2 className="text-center"><u>Add A Comment</u></h2>
            {
              user ?
                <>

                  {alerts && <>
                    <div className="alert alert-dismissible alert-warning">
                      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                      <strong> {msg}</strong>
                    </div>
                  </>}
                  <input className="make_comment border-primary my-4" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="add comment" />
                  <center>
                    <button className="btn  btn-outline-warning" onClick={() => makeComment()} >Comment</button>
                  </center>
                  <hr />
                  {
                    viewCom.map(com => (
                      <h4 className="px-2 my-2 text-primary text-capitalize">{com.name}: <span className="text-dark">{com.text}</span> </h4>
                    ))
                  }
                </> :
                <>
                  <h4 className="text-center text-capitalize my-2"><Link href="/login" color="primary"><a className="text-info">LogIn</a></Link> to make comment</h4>
                </>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps({ params: { blogid } }) {
  const res = await db.collection('ablogs').doc(blogid).get();
  const commentSnap = await db.collection("ablogs").doc(blogid).collection('comments').get()

  const allComments = commentSnap.docs.map(c => c.data())
  console.log(allComments);
  return {
    props: {
      blog: {
        ...res.data(),
        createdAt: res.data().createdAt.toMillis()
      },
      allComments
    },
  }
}