// main api url
let api_url = "https://crudcrud.com/api/38b2fbb29f764b17aaaffadf3365c8cd/appointment";

//show data in UI
function showDataInUI(details, id) {
    // creating table row
    let t_row = document.createElement("tr");

    // creating row data
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td");

    //fillig row data
    td1.append(document.createTextNode(details.name));
    td2.append(document.createTextNode(details.email));
    td3.append(document.createTextNode(details.date));
    td4.append(document.createTextNode(details.time));

    // create edit button
    let edit_btn = document.createElement("button");
    edit_btn.className = "btn btn-warning edit_btn";
    edit_btn.append(document.createTextNode("Edit"));

    // create delete button
    let dlt_btn = document.createElement("button");
    dlt_btn.className = "btn btn-danger dlt_btn";
    dlt_btn.append(document.createTextNode("Delete"));

    // append delete button and edit button in table data
    td5.append(edit_btn);
    td6.append(dlt_btn);

    // append id
    td7.append(document.createTextNode(id));
    td7.hidden = true;

    // append table data in table row
    t_row.append(td1, td2, td3, td4, td5, td6, td7);

    // append table row in main table
    document.getElementById("main_table").append(t_row);
}

// get data fron api to UI
window.addEventListener('DOMContentLoaded', () => {
    axios.get(api_url)
        .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                showDataInUI(res.data[i], res.data[i]._id);
            }
        })
        .catch(err => {
            console.log(err);
        });
})

// main button for submit data
document.getElementById('main_btn').addEventListener('click', (e) => {
    e.preventDefault();
    let date = new Date().getTime().toString();
    let obj = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
    }
    let option = {
        method: "post",
        data: obj
    }
    axios(api_url, option)
        .then(res => {
            showDataInUI(obj, res.data._id);
        })
        .catch(err => console.log(err));
})

// working of edit and delete button
document.getElementById("main_table").addEventListener('click', (e) => {

    // edit button working :-
    if (e.target.classList.contains("edit_btn") == true) {

        // hiding booking buttom 
        document.getElementById("main_btn").classList.remove("d-block");
        document.getElementById("main_btn").hidden = true;

        // showing edit button
        document.getElementById("edit_btn").classList.add("d-block");
        document.getElementById("edit_btn").hidden = false;

        // changing UI interface
        document.getElementById("details_div").className = "col-3 border border-5 border-warning p-3";
        document.getElementById("details_div").firstElementChild.innerHTML = "Edit Details";
        document.getElementById("details_div").firstElementChild.className = "text-center text-warning-emphasis text-decoration-underline"

        // copy data in form for editing
        document.getElementById('name').value = e.target.parentElement.parentElement.children[0].textContent;
        document.getElementById('email').value = e.target.parentElement.parentElement.children[1].textContent;
        document.getElementById('date').value = e.target.parentElement.parentElement.children[2].textContent;
        document.getElementById('time').value = e.target.parentElement.parentElement.children[3].textContent;

        // working edit_data button
        document.getElementById("edit_btn").addEventListener("click", (event) => {
            event.preventDefault();
            axios.put(api_url + "/" + e.target.parentElement.parentElement.children[6].textContent, {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
            }).then(res => {
                // hiding edit_data button
                document.getElementById("edit_btn").classList.remove("d-block");
                document.getElementById("edit_btn").hidden = true;

                // showing booking button
                document.getElementById("main_btn").classList.add("d-block");
                document.getElementById("main_btn").hidden = false;

                // changing UI interface
                document.getElementById("details_div").className = "col-3 border border-primary p-3";
                document.getElementById("details_div").firstElementChild.innerHTML = "Fill Details";
                document.getElementById("details_div").firstElementChild.className = "text-center text-primary text-decoration-none"

                // showing updated data in UI
                e.target.parentElement.parentElement.children[0].firstChild.textContent = document.getElementById('name').value;
                e.target.parentElement.parentElement.children[1].firstChild.textContent = document.getElementById('email').value;
                e.target.parentElement.parentElement.children[2].firstChild.textContent = document.getElementById('date').value;
                e.target.parentElement.parentElement.children[3].firstChild.textContent = document.getElementById('time').value;

            }).catch(err => {
                console.log(err);
            })
        })
    }

    // delete button added below :-

    // delete button working 
    else if (e.target.classList.contains("dlt_btn") == true) {
        axios.delete(api_url + "/" + e.target.parentElement.parentElement.children[6].textContent).then(res => {
            e.target.parentElement.parentElement.remove();
        })
            .catch(err => console.log(err));
    }
})