interface Student {
    firstName: string;
    lastName: string;
    age: number;
    location: string;
}

const st1: Student = {
    firstName: 'Michelle',
    lastName: 'Mumbi',
    age: 21,
    location: 'Naivasha',
}

const st2: Student = {
    firstName: 'Pauline',
    lastName: 'Nekesa',
    age: 24,
    location: 'Nairobi',
}

const studentList: Student[] = [st1, st2];

const table = document.createElement('table');

studentList.forEach((student) => {
    const row = table.insertRow();
    const fNCell = row.insertCell(0);
    const lCell = row.insertCell(1);

    fNCell.textContent = student.firstName;
    lCell.textContent = student.location;
});

document.body.appendChild(table);
