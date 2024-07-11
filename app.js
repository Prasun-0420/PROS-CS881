document.addEventListener('DOMContentLoaded', () => {
    loadMedicines();
});

function loadMedicines() {
    fetch('medicines.json')
        .then(response => response.json())
        .then(data => {
            let table = document.getElementById('medicinesTable');
            data.forEach(medicine => {
                let row = table.insertRow();
                row.insertCell(0).innerText = medicine.name;
                row.insertCell(1).innerText = medicine.quantity;
                row.insertCell(2).innerText = medicine.price;
                let actionCell = row.insertCell(3);
                let deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.innerText = 'Delete';
                deleteBtn.onclick = () => deleteMedicine(medicine.name);
                actionCell.appendChild(deleteBtn);
            });
        });
}

function addMedicine() {
    let name = document.getElementById('medicineName').value;
    let quantity = document.getElementById('medicineQuantity').value;
    let price = document.getElementById('medicinePrice').value;

    if (name && quantity && price) {
        let table = document.getElementById('medicinesTable');
        let row = table.insertRow();
        row.insertCell(0).innerText = name;
        row.insertCell(1).innerText = quantity;
        row.insertCell(2).innerText = price;
        let actionCell = row.insertCell(3);
        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerText = 'Delete';
        deleteBtn.onclick = () => deleteMedicine(name);
        actionCell.appendChild(deleteBtn);

        saveMedicine({ name, quantity, price });

        document.getElementById('medicineName').value = '';
        document.getElementById('medicineQuantity').value = '';
        document.getElementById('medicinePrice').value = '';
    }
}

function saveMedicine(medicine) {
    fetch('medicines.json')
        .then(response => response.json())
        .then(data => {
            data.push(medicine);
            fetch('medicines.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        });
}

function deleteMedicine(name) {
    fetch('medicines.json')
        .then(response => response.json())
        .then(data => {
            let updatedData = data.filter(medicine => medicine.name !== name);
            fetch('medicines.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            }).then(() => {
                document.location.reload();
            });
        });
}
