import { useEffect, useRef, useState } from "react"

const Wave = ({ containerRef, scale, ...props }) => {
    const [pixels, setPixels] = useState([])
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)
    const [xUnits, setXUnits] = useState(Math.ceil(window.innerWidth / scale))
    const [yUnits, setYUnits] = useState(Math.ceil(window.innerHeight / scale))

    const canvasRef = useRef()
    const pixelsRef = useRef()
    const xUnitsRef = useRef()
    const yUnitsRef = useRef()

    const handleResize = (e) => {
        const box = containerRef.current.getBoundingClientRect()
        canvasRef.current.width = box.width
        canvasRef.current.height = box.height
        setWidth(box.width)
        setHeight(box.height)
        setXUnits(Math.ceil(box.width / scale))
        xUnitsRef.current = Math.ceil(box.width / scale)
        setYUnits(Math.ceil(box.height / scale))
        yUnitsRef.current = Math.ceil(box.height / scale)
    }

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        initialize()
        const id = setInterval(draw, 50)
        return () => clearInterval(id)
    }, [width, height, xUnits, yUnits])

    useEffect(() => {
        xUnitsRef.current = xUnits
    }, [xUnits])

    useEffect(() => {
        yUnitsRef.current = yUnits
    }, [yUnits])

    useEffect(() => {
        pixelsRef.current = pixels
    }, [pixels])

    const initialize = () => {
        if (!canvasRef.current) return
        let context = canvasRef.current.getContext("2d")
        context.clearRect(0, 0, width, height)
        context.fillStyle =  "#FFFFFF";
        context.fillRect(scale, scale, 1, 1);
        let temp = new Array(yUnitsRef.current).fill(0)
        temp.forEach((curr, i) => temp[i] = new Array(xUnitsRef.current).fill(0))
        temp[0][0] = 1
        setPixels(temp)
        pixelsRef.current = temp
    }

    const draw = () => {
        if (!canvasRef.current) return
        let frame = newFrame()
        let context = canvasRef.current.getContext("2d")
        context.clearRect(0, 0, width, height)
        frame.forEach((row, i) => {
            row.forEach((col, j) => {
                if (frame[i][j] > 0) {
                    context.fillStyle =  `rgba(255,255,255, ${1 - frame[i][j] / 20})`;
                    context.fillRect((j + 1) * scale, (i + 1) * scale, 1, 1);
                }
            })
        })
    }

    const getNeighbors = (i, j) => {
        const neighbors = []
        if (i < pixelsRef.current.length - 1 && pixelsRef.current[i + 1][j]) neighbors.push('south')
        if (i > 0 && pixelsRef.current[i - 1][j]) neighbors.push('north')  
        if (j < pixelsRef.current[i].length - 1 && pixelsRef.current[i][j + 1]) neighbors.push('east')
        if (j > 0 && pixelsRef.current[i][j - 1]) neighbors.push('west')  
        return neighbors
    }

    const newFrame = () => {
        if (!pixelsRef.current) return
        let pixels = [...pixelsRef.current]
        pixelsRef.current.forEach((row, i) => {
            row.forEach((col, j) => {
                if (pixelsRef.current[i][j] > 20) pixels[i][j] = 0
                else if (pixelsRef.current[i][j] == 0) return
                else pixels[i][j] += 1

                const neighbors = getNeighbors(i, j)
                let directions = ['north', 'east', 'south', 'west']
                directions = directions.filter((direction) => !neighbors.find((temp) => temp === direction))
                directions.forEach((direction) => {
                    let chance = Math.random()
                    if (direction == 'north' && chance > 0.9 && i > 0) pixels[i - 1][j] = 1 
                    if (direction == 'south' && chance > 0.6 && i < pixelsRef.current.length - 1) pixels[i + 1][j] = 1 
                    if (direction == 'east' && chance > 0.9 && j < pixelsRef.current[i].length - 1) pixels[i][j + 1] = 1 
                    if (direction == 'west' && chance > 0.1 && j > 0) pixels[i][j - 1] = 1 
                })
            })
        })
        
        setPixels(pixels)
        return pixels
    }

    return <canvas ref={canvasRef}/>
}

export default Wave