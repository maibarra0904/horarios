import { useEffect, useState } from "react"
import { plan } from "../utils/constants"
import { teachersSave } from "../utils/seed"
import { countOccurrences, createCombinedSchedule } from "../utils/functions"
import { Link } from "react-router-dom"

const Home = () => {

    const [teachersLocal, setTeachersLocal] = useState([])
    const [coincidencias, setCoincidencias] = useState(null)
    const [selectedPlan, setSelectedPlan] = useState(plan[0])
    const [data, setData] = useState(selectedPlan?.schedule)
    const [presidente, setPresidente] = useState('')
    const [principal, setPrincipal] = useState('')
    const [suplente, setSuplente] = useState('')

    useEffect(() => {

        const combineSchedule = createCombinedSchedule(teachersLocal)
        const ocurrences = countOccurrences(combineSchedule)
        setCoincidencias(ocurrences)
        setData(combineSchedule)
        setSelectedPlan(plan[0])
    }, [teachersLocal])



    const handleClassClick1 = (e) => {

        e.preventDefault()
        setPresidente(e.target.value)

        if (teachersLocal.find(el => el.name == e.target.value)) {

            return
        } else {
            const teachersUpdate = [...teachersLocal]

            console.log(teachersUpdate, presidente)
            console.log(teachersSave)

            teachersUpdate[0] = teachersSave.find(el => el.name == e.target.value)
            console.log(teachersUpdate)
            setTeachersLocal(teachersUpdate)
        }

    };

    const handleClassClick2 = (e) => {

        e.preventDefault()
        setPrincipal(e.target.value)

        if (teachersLocal.find(el => el.name == e.target.value)) {

            return
        } else {
            const teachersUpdate = [...teachersLocal]

            teachersUpdate[1] = teachersSave.find(el => el.name == e.target.value)
            console.log(teachersUpdate)
            setTeachersLocal(teachersUpdate)
        }

    };

    const handleClassClick3 = (e) => {

        e.preventDefault()
        setSuplente(e.target.value)

        if (teachersLocal.find(el => el.name == e.target.value)) {

            return
        } else {
            const teachersUpdate = [...teachersLocal]

            teachersUpdate[2] = teachersSave.find(el => el.name == e.target.value)
            console.log(teachersUpdate)
            setTeachersLocal(teachersUpdate)
        }

    };



    const handleMouseDown = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <div className=" flex flex-col container mx-auto py-8">
                <h1 className="flex justify-center items-center text-2xl font-bold mb-4">Verificación de Horarios para Sustentaciones</h1>
                <div className="mb-4 flex gap-10">
                    <div className="flex flex-col">
                        <label htmlFor="teacher-select" className="mr-2">Selecciona al Presidente:</label>
                        <select
                            id="teacher-select"
                            value={presidente}
                            onChange={handleClassClick1}
                            className="px-2 py-1 border rounded-md"
                            defaultValue='seleccione'
                        >
                            <option key='seleccione' value='seleccione' className="text-gray-400">---Seleccione---</option>
                            {teachersSave.map((item) => (
                                <option key={item.id} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                        {teachersLocal[0] && <Link target="_blank" className="flex justify-center p-2 m-2 g-2 bg-green-500 rounded-md text-white" to={`/individual/${teachersLocal[0]?.id}`} >Ver Horario</Link>}
                    </div>

                    {
                        presidente !== '' && (
                            <>
                                <div className="flex flex-col">
                                    <label htmlFor="teacher-select" className="mr-2">Selecciona al Examinador Principal:</label>
                                    <select
                                        id="teacher-select"
                                        value={principal}
                                        onChange={handleClassClick2}
                                        className="px-2 py-1 border rounded-md"
                                        defaultValue='seleccione'
                                    >
                                        <option key='seleccione' value='seleccione' className="text-gray-400">---Seleccione---</option>
                                        {teachersSave.map((item) => (
                                            <option key={item.id} value={item.name}>{item.name}</option>
                                        ))}
                                    </select>
                                    {teachersLocal[1] && <Link target="_blank" className="flex justify-center p-2 m-2 g-2 bg-green-500 rounded-md text-white" to={`/individual/${teachersLocal[1]?.id}`} >Ver Horario</Link>}
                                </div>
                            </>
                        )
                    }

                    {
                        principal !== '' && (
                            <>
                                <div className="flex flex-col">
                                    <label htmlFor="teacher-select" className="mr-2">Selecciona al Examinador Suplente:</label>
                                    <select
                                        id="teacher-select"
                                        value={suplente}
                                        onChange={handleClassClick3}
                                        className="px-2 py-1 border rounded-md"
                                        defaultValue='seleccione'
                                    >
                                        <option key='seleccione' value='seleccione' className="text-gray-400">---Seleccione---</option>
                                        {teachersSave.map((item) => (
                                            <option key={item.id} value={item.name}>{item.name}</option>
                                        ))}
                                    </select>
                                    {teachersLocal[2] && <Link target="_blank" className="flex justify-center p-2 m-2 g-2 bg-green-500 rounded-md text-white" to={`/individual/${teachersLocal[2]?.id}`} >Ver Horario</Link>}
                                </div>
                            </>
                        )
                    }


                </div>
                {
                    coincidencias===0 && 
                    <div className="m-2 p-2 text-red-500 font-bold text-lg">
                        No hay coincidencias en horarios de otras actividades para los docentes seleccionados
                    </div>
                }
                <table className="border-collapse">
                    <thead>
                        <tr>
                            <th className="border w-36 px-4 py-2 bg-blue-200">Hora</th>
                            <th className="border px-4 py-2 bg-blue-200">Lunes</th>
                            <th className="border px-4 py-2 bg-blue-200">Martes</th>
                            <th className="border px-4 py-2 bg-blue-200">Miércoles</th>
                            <th className="border px-4 py-2 bg-blue-200">Jueves</th>
                            <th className="border px-4 py-2 bg-blue-200">Viernes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data[0].hours.map((hour, hourIndex) => (
                            <tr key={hourIndex}>
                                <td className="border px-4 py-2 w-36 bg-blue-200">{hour.time}</td>
                                {data.map((day, dayIndex) => (
                                    <td
                                        key={dayIndex}
                                        className={`border px-4 py-2 ${day.hours[hourIndex].classColor}`}
                                        onMouseDown={handleMouseDown}


                                    >
                                        {day.hours[hourIndex].class}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex mt-5 gap-4">
                    <label className="bg-amber-400 p-3 border border-gray-200">Coincidencia de Otras Actividades</label>
                    <label className="p-3 border border-gray-200">En clases y otras horas no disponibles</label>
                </div>
            </div>

        </>
    );
}

export default Home