export default class extends React.Component {
  render() {
    return <div>
      <h1>Hola mundo!</h1>
      <img src="/static/granate.png" alt="granate"/>
      <p>Todos en el curso de Next.js</p>

      <style jsx>{`
      h1 {
        color: red;
      }
      p {
        color: green;
      }
      body {
        background: yellow;
      }
      `}</style>

      {/* <style jsx global>{`
      body {
        background: yellow;        
      }
      `}</style> */}
    </div> 
  }
}