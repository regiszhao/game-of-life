
function arrsAreEqual(arr1, arr2) {
    if (arr1.length != arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) {
            return false;
        }
    }
    return true;
}

function removeFromArr(arr, elem) {
    let index;
    for (let i = 0; i < arr.length; i++) {
        console.log('comparing');
        console.log(arr[i], elem);
        console.log(arrsAreEqual(arr[i], elem));
        if (arrsAreEqual(arr[i], elem)) {
            index = i;
            break;
        }
        if (i == arr.length-1) {
            return 'ELEMENT IS NOT HERE BRO';
        }
    } 
    arr.splice(index, 1);
    return arr 
}

// arr = [[2,1], [3,1], [4,1]];
// elem = [4,1];
// newarr = removeFromArr(arr, elem);
// console.log(newarr);