import { useEffect, useState } from "react"
import { teachers } from "../utils/constants"
import { useParams, useNavigate } from "react-router-dom"
import { teachersSave } from "../utils/seed"
import jsPDF from 'jspdf';

const generatePDF = () => {
    const doc = new jsPDF(
    //     {
    //     orientation: 'landscape',
    //     format: 'a4', // Set the format to A4
    //   }
    );

  // Get the HTML content of your React component
  const html = document.getElementById('horario').innerHTML;

  doc.setFontSize(18);
  //doc.text('Horario', 20, 20);
  doc.addPage();
  doc.setFontSize(12);
  doc.html(html, {
    callback: () => {
      // Save the PDF
      doc.save('Horario.pdf');
    },
    x: 15,
    y: 0,
    width: 180,
    windowWidth: 650,
    margin: 5
  });
  };

const Individual = () => {
    const [selectedTeacher, setSelectedTeacher] = useState(teachers[0])
    const [data, setData] = useState(selectedTeacher.schedule)

    const {id} = useParams()
    const navigate = useNavigate();
    
    useEffect(() => {

        if(id>12) {navigate('/', { replace: true })}

        const currentTeacher = teachersSave.filter(el => el.id == id.toString())
        setSelectedTeacher(currentTeacher[0])
    },[id])
    


    useEffect(() => {
        setData(selectedTeacher.schedule)
    },[selectedTeacher])
          

    const handleMouseDown = (event) => {
        event.preventDefault();
      };

    return (
        <>
            <div id="horario" className="flex flex-col container mx-auto py-8">
                <h1 className="flex justify-center items-center text-2xl font-bold mb-4">Horario de Clases: {selectedTeacher.name}</h1>
                
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
                
            </div>
            <div className="flex justify-center items-center">
                <button 
                    onClick={generatePDF}
                    className="bg-amber-400 p-4 rounded-md text-green-600 font-bold mb-4"
                >Descárgalo en PDF</button>
            </div>
        </>
    );
}

export default Individual