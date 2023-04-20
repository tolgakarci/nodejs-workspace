const posts = [
  { id: 1, name: 'Post 1', content: 'Content 1' },
  { id: 2, name: 'Post 2', content: 'Content 2' },
  { id: 3, name: 'Post 3', content: 'Content 3' },
]

const listPost = () => {
  posts.map((post) => {
    console.log(post.name)
  })
}

const addPost = (newPost) => {
  const promise1 = new Promise((resolve, rejected) => {
    posts.push(newPost)
    resolve('Success')
    rejected('Warning !')
  })
  return promise1
}

addPost({ id: 4, name: 'Post 4', content: 'Content 4' })
  .then((res) => {
    console.log(res)
    listPost()
  })
  .catch((err) => {
    console.log(err)
  })

//async-await
// async function showPost() {
//   try {
//     await addPost({ id: 4, name: 'Post 4', content: 'Content 4' })
//     listPost()
//   } catch (err) {
//     console.log(err)
//   }
// }
// showPost()
