import React, { Component } from 'react'
import style from  './index.module.scss'

// console.log(style)

export default class Child extends Component {
  render() {
    return (
      <div>
            <p className={style.item}>
                <span className={style.title}>撒大大大</span>
            </p>
            <p className={style.item}>child-2222</p>
      </div>
    )
  }
}
