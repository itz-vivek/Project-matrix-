let n;

function createMatrixInput() {
    n = parseInt(document.getElementById('matrix-size').value) || 4;

    const container = document.getElementById('matrix-container');
    container.innerHTML = '';

    const table = document.createElement('table');
    for (let i = 0; i < n; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < n; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `a${i}${j}`;
            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    container.appendChild(table);
}

function convertToUpperTriangular() {
    const matrix = [];
    let steps = '';


    for (let i = 0; i < n; i++) {
        matrix[i] = [];
        for (let j = 0; j < n; j++) {
            matrix[i][j] = parseFloat(document.getElementById(`a${i}${j}`).value) || 0;
        }
    }

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (matrix[j][i] !== 0) {
                const factor = matrix[j][i] / matrix[i][i];
                steps += `Eliminating row ${j + 1}, using row ${i + 1}:\n`;
                for (let k = i; k < n; k++) {
                    matrix[j][k] -= factor * matrix[i][k];
                }
                steps += formatMatrix(matrix) + '\n';
            }
        }
    }

    
    document.getElementById('steps').textContent = steps;
    document.getElementById('result').textContent = formatMatrix(matrix);
}


function formatMatrix(matrix) {
    return matrix.map(row => row.map(x => x.toFixed(2)).join(' | ')).join('\n');
}


function resetMatrix() {
    document.getElementById('matrix-size').value = 4; 
    createMatrixInput();
    document.getElementById('steps').textContent = '';
    document.getElementById('result').textContent = ''; 
}

createMatrixInput();
