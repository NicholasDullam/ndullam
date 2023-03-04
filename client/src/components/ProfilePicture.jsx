import { useState, useEffect, useRef } from 'react'
const colors = ['black', 'red', 'green', 'blue']

const ProfilePicture = (props) => {
    const [color, setColor] = useState(colors[0])
    const canvasRef = useRef()
    const prevCoordinatesRef = useRef({ x: 0, y: 0 })
    const coordinatesRef = useRef({ x: 0, y: 0 })
    const drawingRef = useRef(false)

    useEffect(() => {
        if (canvasRef.current) {
            initialFill()
        }
    }, [])
    
    const initialFill = () => {
        const context = canvasRef.current.getContext('2d')
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }

    const draw = () => {
        console.log(prevCoordinatesRef.current, coordinatesRef.current)
        const context = canvasRef.current.getContext('2d')
        console.log(context)
        context.beginPath();
        context.moveTo(prevCoordinatesRef.current.x, prevCoordinatesRef.current.y);
        context.lineTo(coordinatesRef.current.x, coordinatesRef.current.y);
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.stroke();
        context.closePath();
    }

    const getCoordinates = (e) => {
        prevCoordinatesRef.current = { ...coordinatesRef.current}
        const rect = canvasRef.current.getBoundingClientRect()
        coordinatesRef.current.x = e.clientX - rect.left
        coordinatesRef.current.y = e.clientY - rect.top
    }

    const handleMouseDown = (e) => {
        const context = canvasRef.current.getContext('2d')
        getCoordinates(e)
        drawingRef.current = true
        context.beginPath()
        context.fillStyle = color
        context.fillRect(coordinatesRef.current.x, coordinatesRef.current.y, 2, 2)
        context.closePath()
    }

    const handleMouseMove = (e) => {
        if (drawingRef.current) {
            getCoordinates(e)
            draw()
        }
    }

    const handleMouseUp = (e) => {
        drawingRef.current = false
    }

    const handleMouseOut = (e) => {
        drawingRef.current = false
    }

    const handleSave = (e) => {
        props.handleSave(canvasRef.current.toDataURL())
    }

    return <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}}>
        <p style={{ marginBottom: '20px' }}> Draw your avatar </p>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                {
                    colors.map((col) => {
                        return <div onClick={() => setColor(col)} style={{ height: '20px', width: '20px', backgroundColor: col, borderRadius: '50%', border: col === color ? '2px solid white' : '5px solid white', transition: 'border 300ms ease' }}/>
                    })
                }
            </div>
            <canvas ref={canvasRef} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseOut={handleMouseOut} onMouseMove={handleMouseMove} height={140} width={140} style={{ borderRadius: '50%', marginRight: '30px' }}/>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
            <p onClick={initialFill} style={{ marginBottom: '20px', backgroundColor: 'white', color: 'black', padding: '6px 9px', borderRadius: '25px', fontSize: '12px', cursor: 'pointer' }}> Clear </p>
            <p onClick={handleSave} style={{ marginBottom: '20px', backgroundColor: 'white', color: 'black', padding: '6px 9px', borderRadius: '25px', fontSize: '12px', cursor: 'pointer' }}> Save </p>
        </div>
    </div>
}

export default ProfilePicture