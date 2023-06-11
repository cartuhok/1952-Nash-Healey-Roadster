import React from 'react'
import './style.css'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const Details = () => {


  const codeApp = `export default function App() {
    const [carColor, setCarColor] = useState('greenpaint')
    const [seatColor, setSeatColor] = useState('tanleather')
    const [interiorColor, setInteriorColor] = useState('woodtrim')
    const [stitchingColor, setStitchingColor] = useState('tanleather')
  
    return (
      <Canvas>
        <Suspense fallback={null}>
          <Scene carColor={carColor} seatColor={seatColor} interiorColor={interiorColor} stitchingColor={stitchingColor} />
        </Suspense>
        <Rightbar setCarColor={setCarColor} setSeatColor={setSeatColor} setInteriorColor={setInteriorColor} setStitchingColor={setStitchingColor} />
        <Details />
      </Canvas>
    )
  }`

  const codeScene = `export default function Scene({ carColor, seatColor, interiorColor, stitchingColor }) {
    // setup Camera, Controls, etc...
    
    return (
      <NashHealeyC carColor={carColor} seatColor={seatColor} interiorColor={interiorColor} stitchingColor={stitchingColor} />
    )
  }`

  const codeRight = `   // A map that associates each color type with a handler function for updating it
  const colorChangeHandlers = {
    'Paint': 'setCarColor',
    'Interior': 'setInteriorColor',
    'Seating': 'setSeatColor',
    'Stitching': 'setStitchingColor',
  }

    const Rightbar = ({ setCarColor, setSeatColor, setInteriorColor, setStitchingColor }) => {
    // UI setup here...
    
      const handleColorClick = (tabName, colorName) => {
        // Some logic here...
        const handlerName = colorChangeHandlers[tabName]
        const handler = { setCarColor, setSeatColor, setInteriorColor, setStitchingColor }[handlerName]
        handler(colorName)
      }
      
      // Render color-picker UI...
  }`

  return (
    <div className="DeetsContainer">
      <div className="content-item row">
        <div className="text-content">
          <h2>The Process</h2>
          <p>This project is the product of approximately one year of learning Three.js and Blender. I spent the first half of the year learning Blender and the second half learning Three.js. In retrospect, that order was definitely the right decision. Learning about the nomenclature of the 3D environment (vertices, normals, texture mapping) as well as how to properly set up a 3D scene (camera, lights, subject) was definitely much easier in Blender, where I could make adjustments without code and see the results in real time. I believe that if I had started with Three.js without being introduced to at least the basics in Blender, it would have made things more challenging.</p>
        </div>
        <img src="./process.png" alt="The Process" />
      </div>
      <div className="content-item row-reverse">
        <div className="text-content">
          <h2>Optimization</h2>
          <p>I followed a <a href="https://www.udemy.com/course/blender-3_0-vintage-car-creation/" target="_blank">Udemy course</a> to model the Roadster. It was enjoyable and challenging, and the result speaks for itself. However, the model was not intended to be imported into a game or web experience. Towards the end of the course, I was approaching 2 million triangles, and optimizations needed to be made. I started by adding the decimate modifier to each individual object in Blender. I was able to reduce the total triangle count from 1.8+ million to under 280k without compromising the visual integrity of the model. I then grouped the objects that would share the same textures, reducing the number of calls from 89 to 17. I also used matcap textures that I made in Blender, further increasing optimization by eliminating the need for extensive lighting calculations.</p>
        </div>
        <img src="./matcaps.png" alt="Header 2" />
      </div>
      <div className="bottom">
        <div className="code-container">
          <h2>The Code</h2>
          <p>The core of the application is housed within the App component. I used React's state management here, elevating state by setting global states for various aspects of the car, including paint, interior, seats, and stitching colors. This ensured the state is centralized but also accessible to all child components that need it.</p>
             <SyntaxHighlighter className="codeBlock" language="jsx" style={docco} wrapLines={true} customStyle={{textAlign: 'left', whiteSpace: 'wrap', wrapLines: 'true'}}>
                  {codeApp}
            </SyntaxHighlighter>
          <p>Inside the Scene component, I utilized Three.js/R3F and Drei's Html and OrbitControls helpers to create the 3D environment. The NashHealey component, also present within Scene, is responsible for generating the car model. I generated that component by exporting the model as a Draco compressed GLTF file from Blender. I then used Poimandres' GLTF -{'>'} React Three Fiber to generate a JSX file. The Scene component takes color states as props and applies these colors to the respective parts of the car:</p>
          <SyntaxHighlighter className="codeBlock" language="jsx" style={docco} wrapLines={true} customStyle={{textAlign: 'left', whiteSpace: 'wrap', wrapLines: 'true'}}>
                  {codeScene}
            </SyntaxHighlighter>
          <p>The Rightbar component serves as the control panel for color selection. When a user makes a selection, Rightbar calls the corresponding state update function, causing the 3D car model to reflect the changes instantly:</p>
          <SyntaxHighlighter className="codeBlock" language="jsx" style={docco} wrapLines={true} customStyle={{textAlign: 'left', whiteSpace: 'wrap', wrapLines: 'true'}}>
                  {codeRight}
            </SyntaxHighlighter>
        </div>
      </div>
      <div className="contact">
        <h2>Links</h2>

        <div className="socials">

        <a href="https://carterrink.com/" target='_blank'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 3.2c0-.663-.537-1.2-1.2-1.2h-17.6c-.663 0-1.2.537-1.2 1.2v11.8h20v-11.8zm-2 9.8h-16v-9h16v9zm2 3h-20c-.197.372-2 4.582-2 4.998 0 .522.418 1.002 1.002 1.002h21.996c.584 0 1.002-.48 1.002-1.002 0-.416-1.803-4.626-2-4.998zm-12.229 5l.467-1h3.523l.467 1h-4.457z"/></svg></a>

        <a href="https://twitter.com/carter_rink" target='_blank'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>

        <a href="https://www.instagram.com/carter_rink/" target='_blank'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>

        <a href="https://github.com/cartuhok" target='_blank'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>

        <a href="https://www.linkedin.com/in/carterr/" target='_blank'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>

        </div>

      </div>
    </div>
  )
}

export default Details