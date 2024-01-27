let count = 0;
const URL = 'https://crudcrud.com/api/fcc786227bc04493a95b8d56961eb73f'
function handleClick(event){
    event.preventDefault();
    const details = {
        name:event.target.userName.value,
        price:event.target.price.value,
        quantity:event.target.quantity.value
    }

axios.post(`${URL}/details`,details).then((res) => {
    console.log(res.data)
    display(res.data)

}).catch((err) => {
    console.log(err)
});

document.getElementById('userName').value =""
document.getElementById('price').value = ""
document.getElementById('quantity').value = ""
       count++
       document.getElementById('countDisplay').innerText = "Total: " + count;
       
}
function display(details){
const userList = document.getElementById('userList')
listItem = document.createElement('li')
listItem.appendChild(document.createTextNode(`${details.name} Rs:${details.price} ${details.quantity}Kg`))
userList.appendChild(listItem)

const input = document.createElement('input')
input.appendChild(document.createTextNode(''))
input.type ="number"
input.id = 'buy'
listItem.appendChild(input)


const buyBtn = document.createElement('button')
buyBtn.appendChild(document.createTextNode('Buy'))
listItem.appendChild(buyBtn)

const deleteBtn = document.createElement('button')
deleteBtn.appendChild(document.createTextNode('Delete'))
listItem.appendChild(deleteBtn)

deleteBtn.addEventListener('click', (event)=>{
const userId = details._id
deleteUser(userId)
listItem.remove()
count--
document.getElementById('countDisplay').innerText = "Total: " + count;
})

buyBtn.addEventListener('click',(event)=>{
    const userId = details._id
    editUser(userId)
})

}

function getData(){
    axios.get(`${URL}/details`).then((res)=>{
        console.log(res.data)
        const existingUser = res.data
        existingUser.forEach(display)
    })
}

function deleteUser(userId,listItem){
    axios.delete(`${URL}/details/${userId}`)
    .then(() => {
        if (listItem) {
            listItem.remove();
        } else {
            console.log("List item is undefined or null.");
        }
    })
    .catch((err) => {
        console.log(err);
    });
}

function editUser(userId) {
    axios.get(`${URL}/details/${userId}`)
        .then((res) => {
            let existingUser = res.data;
            const buyQuantity = parseInt(document.getElementById('buy').value); 
            
            console.log("existingUser.quantity:", existingUser.quantity);
            console.log("buyQuantity:", buyQuantity);
            
            if (isNaN(existingUser.quantity) || isNaN(buyQuantity)) {
                console.log("Invalid quantity values. Cannot perform calculation.");
                return; 
            }
            
            const updatedQuantity = parseInt(existingUser.quantity) - buyQuantity;
            
            
            document.getElementById('quantity').innerText = updatedQuantity; 
        })
        .catch((err) => {
            console.log(err);
        });
}


window.addEventListener('load', getData)
