let items = [];
const SORTING_MODE = {
        ALL: 'A',
        COMPLETED: 'C',
        IN_PROGRESS: 'InP'
}
let current_sort = SORTING_MODE.ALL;

const uid = function(){
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function addItem() {
        let item = {
                id: uid(),
                value: document.getElementById("txtArea").value,
                checked: false
        }
        items.push(item);
        document.getElementById("txtArea").value = "";
        render()
}

function removeItemByIndex(index) {
        items.splice(0, index);
        render();
}

function removeItemById(id) {
        items = items.filter(item => item.id !== id);
        render();
}

function checkClicked(id) {
        items.find(el => el.id === id).checked = !items.find(el => el.id === id).checked;
        render();
}

function render() {
        const listHTML = document.getElementById("list");
        let htmlText = "";
        for (let j = 0; j < items.length; j++) {
                const ID = items[j].id;
                const val = items[j].value;
                const isChecked = items[j].checked;
                switch (current_sort) {
                        case SORTING_MODE.COMPLETED:
                                if (!isChecked) continue;
                                break;
                        case SORTING_MODE.IN_PROGRESS:
                                if (isChecked) continue;
                                break;
                }
                let chkd = "";
                if (isChecked) chkd = "checked=\'checked\'";
                htmlText += "<li><input type='checkbox' onchange='checkClicked(\"" + ID + "\")' " + chkd + " id='" + ID + "' name='" + ID + ">'/>&nbsp;" +
                    "<label for='" + ID + "'>" + val + "</label>" +
                    "<button style=\"float: right;\n" +
                    "background-color: white;\" onclick=\"removeItemById(\'" + ID + "\')\">&#10006;</button></li>"
        }
        listHTML.innerHTML = htmlText;
        renderSorts();
}

function changeSort(sortChar) {
        current_sort = sortChar;
        renderSorts();
        render();
}

function renderSorts() {
        const sort_all = document.getElementById("sort_all");
        const sort_completed = document.getElementById("sort_completed");
        const sort_inProgress = document.getElementById("sort_inProgress");

        const all_tasks = items.length;
        sort_all.textContent = `All(${all_tasks})`;
        const completed_tasks = items.filter(el => el.checked).length;
        sort_completed.textContent = "Completed(" + completed_tasks + ")";
        const inProgress_tasks = all_tasks - completed_tasks;
        sort_inProgress.textContent = "In progress(" + inProgress_tasks + ")";

        sort_all.classList.remove("sortLabelButtonPressed");
        sort_completed.classList.remove("sortLabelButtonPressed");
        sort_inProgress.classList.remove("sortLabelButtonPressed");

        switch (current_sort) {
                case SORTING_MODE.ALL:
                        sort_all.classList.add("sortLabelButtonPressed");
                        break;
                case SORTING_MODE.COMPLETED:
                        sort_completed.classList.add("sortLabelButtonPressed");
                        break;
                case SORTING_MODE.IN_PROGRESS:
                        sort_inProgress.classList.add("sortLabelButtonPressed");
                        break;
        }
}

render();