import { schedule } from "./constants";

export const createCombinedSchedule = (teachers) => {
    const combinedSchedule = [];
  
    // Crear el horario combinado con todos los días y horas
    for (let i = 0; i < schedule.length; i++) {
      const day = schedule[i];
      const combinedDay = { day: day.day, hours: [] };
  
      for (let j = 0; j < day.hours.length; j++) {
        const hour = day.hours[j];
        const combinedHour = { ...hour };
  
        // Verificar si la hora coincide en "Otra Actividad" entre los 3 profesores
        const isCommonActivity = teachers.every(teacher => {
          const teacherDay = teacher.schedule[i];
          const teacherHour = teacherDay.hours[j];
          return teacherHour.class === 'Otra Actividad';
        });
  
        if (isCommonActivity) {
          combinedHour.classColor = 'bg-yellow-500';
          combinedHour.class = ''
        }
        combinedHour.class = ''
        combinedDay.hours.push(combinedHour);
      }
  
      combinedSchedule.push(combinedDay);
    }
    
    
    return combinedSchedule;
  }

export const countOccurrences = (schedule) => {
  let ocurrences = 0;
  
  for (const day of schedule) {
    for (const hourData of day.hours) {
      if (hourData.classColor === "bg-yellow-500") {
        ocurrences++;
      }
    }
}
  
  return ocurrences;
}