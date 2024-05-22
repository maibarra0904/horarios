
export const hours = [
    { time: '7:00-8:00', class: 'Fuera de horario', classColor: 'bg-white' },
    { time: '8:00-9:00', class: 'Fuera de horario', classColor: 'bg-white' },
    { time: '9:00-10:00', class: 'Fuera de horario', classColor: 'bg-white' },
    { time: '10:00-11:00', class: 'Fuera de horario', classColor: 'bg-white' },
    { time: '11:00-12:00', class: 'Fuera de horario', classColor: 'bg-white' },
    { time: '12:00-13:00', class: 'Fuera de horario', classColor: 'bg-white' },
    { time: '13:00-14:00', class: 'Fuera de horario', classColor: 'bg-white' },
    { time: '14:00-15:00', class: 'Fuera de horario', classColor: 'bg-white' },
    { time: '15:00-16:00', class: 'Fuera de horario', classColor: 'bg-white' },
    { time: '16:00-17:00', class: 'Fuera de horario', classColor: 'bg-white' },
    { time: '17:00-18:00', class: 'Fuera de horario', classColor: 'bg-white' },
    { time: '18:00-19:00', class: 'Fuera de horario', classColor: 'bg-white' },
    { time: '19:00-20:00', class: 'Fuera de horario', classColor: 'bg-white' },
    { time: '20:00-21:00', class: 'Fuera de horario', classColor: 'bg-white' }
]

export const schedule = [
    {
        day: 'Lunes',
        hours
    },
    {
        day: 'Martes',
        hours
    },
    {
        day: 'Miercoles',
        hours
    },
    {
        day: 'Jueves',
        hours
    },
    {
        day: 'Viernes',
        hours
    },
]

export const teachers = JSON.parse(localStorage.getItem('teachers')) || [
    {
        id: 1,
        name: 'Angel Arce',
        schedule
    },
    {
        id: 2,
        name: 'Darwin Pow Chong Long',
        schedule
    },
    {
        id: 3,
        name: 'Enrique Ferruzola',
        schedule
    },
    {
        id: 4,
        name: 'Jorge Lopez',
        schedule
    } 
    ,
    {
        id: 5,
        name: 'Laura Ortega',
        schedule
    },
    {
        id: 6,
        name: 'Mario Cardenas',
        schedule
    },
    {
        id: 7,
        name: 'Mario Ibarra',
        schedule
    },
    {
        id: 8,
        name: 'Nuvia Beltran',
        schedule
    },
    {
        id: 9,
        name: 'Oscar Bermeo',
        schedule
    },
    {
        id: 10,
        name: 'Roberto Cabezas',
        schedule
    },
    {
        id: 11,
        name: 'William Bazan',
        schedule
    },
    {
        id: 12,
        name: 'Wilson Molina',
        schedule
    }
]

export const plan = JSON.parse(localStorage.getItem('plan')) || [
    {
        id: 1,
        name: 'Plan',
        schedule
    }
]
