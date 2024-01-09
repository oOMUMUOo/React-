import React from 'react'
import { Button } from 'antd'
import axios from 'axios'

export default function Home() {

  const getData = () => {
    // 查
    // axios.get('/posts').then(res => {
    //   console.log(res.data)
    // })

    // 增
    // axios.post('/posts', {
    //   title:'444',
    //   author: '4444'
    // }).then(res => {
    //   console.log(res)
    // })

    // 更新 put
    // axios.put('/posts/1', {
    //   title: 'yiyioyi7yuiuiyiuyuiyui9',
    // })
    // 会替换原来的对象，author属性就直接没了

    // 更新 patch
    // axios.patch('/posts/1', {
    //   title: "1111修改"
    // })
    // 只修改你传递的属性值，其余不变

    // 删
    // axios.delete('/posts/1')

    // _embed  向下关联， ID与comments中postId相同的关联上
    // axios.get('/posts?_embed=comments').then((res) => {
    //   console.log(res.data)
    // })

    // _expand 
    axios.get('/comments?_expand=post').then(res => {
      // console.log(res.data)
    })
  }
  return (
    <div>
        <Button type='primary' onClick={getData}>按钮</Button>
    </div>
  )
}
