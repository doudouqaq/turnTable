import Head from 'next/head'
import Router from 'next/router'

Router.events.on('routeChangeStart', (url) => {
  var storage = window.sessionStorage;
  // console.log(storage)
  // if (storage.getItem("isLogin") != "true" && url !== '/') {
  if (storage.getItem("isLogin") != "true") {
    Router.push({
      pathname: '/'
    })
  }
})

export default ({ children }) => (
  <div>
    <style global jsx>{`
    html{
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }
    body{
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      background: url('/static/background.jpg');
      background-size:100% 100%;
      background-repeat:no-repeat;
    }
    #__next{
      width: 100%;
      height: 100%;
    }
    #__next>div{
      width: 100%;
      height: 100%;
    }
    `} </style>
    <Head>
      <title>转盘抽奖</title>
    </Head>
    {children}
  </div>

)
