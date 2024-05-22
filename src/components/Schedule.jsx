import { useEffect, useState } from "react"
import { teachers } from "../utils/constants"



const Schedule = () => {
    
    const [pass, setPass] = useState(false)
    const [password, setPassword] = useState('')
    const [selectedTeacher, setSelectedTeacher] = useState(teachers[0])
    const [data, setData] = useState(selectedTeacher.schedule)

    useEffect(() => {
        setData(selectedTeacher.schedule)
    },[selectedTeacher])

    useEffect(() => {
        if(password==='horarios2024') setPass(true)
    },[password])
          


    const handleClassClick = (day, time) => {
        console.log(teachers)
        const updatedSchedule = data.map(item => {
            if (item.day === day) {
                return {
                    ...item,
                    hours: item.hours.map(hour => {
                        if (hour.time === time) {
                            if(hour.class==='Fuera de horario' || hour.class==='Otra Actividad') {
                                return {
                                    ...hour,
                                    class: 'En Clase',
                                    classColor: 'bg-red-600 text-white font-bold'
                                };
                            }
                            return {
                                ...hour,
                                class: 'Fuera de horario',
                                classColor: 'bg-white'
                            };
                        }
                        return hour;
                    })
                };
            }
            return item;
        });
        setData(updatedSchedule);
        const teacherIndex = teachers.findIndex(t => t.name === selectedTeacher.name);
        teachers[teacherIndex].schedule = updatedSchedule;
        localStorage.setItem('teachers', JSON.stringify(teachers))
    };

    const handleClassDoubleClick = (day, time) => {
        const updatedSchedule = data.map(item => {
            if (item.day === day) {
                return {
                    ...item,
                    hours: item.hours.map(hour => {
                        if (hour.time === time) {
                            if(hour.class==='Fuera de horario' || hour.class==='En Clase') {
                                return {
                                    ...hour,
                                    class: 'Otra Actividad',
                                    classColor: 'bg-teal-600 text-white font-bold'
                                };
                            }
                            return {
                                ...hour,
                                class: 'Fuera de horario',
                                classColor: 'bg-white'
                            };
                        }
                        return hour;
                    })
                };
            }
            return item;
        });
        setData(updatedSchedule);
        const teacherIndex = teachers.findIndex(t => t.name === selectedTeacher.name);
        teachers[teacherIndex].schedule = updatedSchedule;
        localStorage.setItem('teachers', JSON.stringify(teachers))
    };


    const handleMouseDown = (event) => {
        event.preventDefault();
      };

    return (
        <>
            {
                !pass ? 
                    (<div>
                        <form className="flex justify-center items-center">
                        <label className="text-2xl font-bold">Password</label>
                        <input 
                            className="m-10 p-4 border border-gray-200"
                            type="password"
                            value={password}
                            placeholder=" Ingrese el password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </form>
                    </div>)
                    :
                    <div className="flex flex-col container mx-auto py-8">
                    <h1 className="flex justify-center items-center text-2xl font-bold mb-4">Horario de Clases</h1>
                    <div className="mb-4">
                        <label htmlFor="teacher-select" className="mr-2">Selecciona un profesor:</label>
                        <select
                            id="teacher-select"
                            value={selectedTeacher.name}
                            onChange={(e) => setSelectedTeacher(teachers.find(t => t.name === e.target.value))}
                            className="px-2 py-1 border rounded-md"
                        >
                            {teachers.map((item) => (
                                <option key={item.id} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <table className="border-collapse">
                        <thead>
                            <tr>
                                <th className="border w-36 px-4 py-2">Hora</th>
                                <th className="border px-4 py-2">Lunes</th>
                                <th className="border px-4 py-2">Martes</th>
                                <th className="border px-4 py-2">Miércoles</th>
                                <th className="border px-4 py-2">Jueves</th>
                                <th className="border px-4 py-2">Viernes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data[0].hours.map((hour, hourIndex) => (
                                <tr key={hourIndex}>
                                    <td className="border px-4 py-2 w-36 bg-amber-200">{hour.time}</td>
                                    {data.map((day, dayIndex) => (
                                        <td
                                            key={dayIndex}
                                            className={`border px-4 py-2 cursor-pointer ${day.hours[hourIndex].classColor}`}
                                            onMouseDown={handleMouseDown}
                                            onClick={() => handleClassClick(day.day, day.hours[hourIndex].time)}
                                            onDoubleClick={() => handleClassDoubleClick(day.day, day.hours[hourIndex].time)}
                                        >
                                            {day.hours[hourIndex].class}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
            

        </>
    );
}

export default Schedule