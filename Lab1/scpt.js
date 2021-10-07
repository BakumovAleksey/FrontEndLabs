let items = []

const uid = function(){
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function addItem() {
        item = {
                id: uid(),
                value: document.getElementById("txtArea").value
        }
        items.push(item);
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

function render() {
        const listHTML = document.getElementById("list");
        let htmlText = "";
        for (let j = 0; j < items.length; j++) {
                const ID = items[j].id;
                const val = items[j].value;
                htmlText += "<li><input type=\"checkbox\" id=\"" + ID + "\" name=\"" + ID + ">\"/>&nbsp;" +
                    "<label htmlFor=\"" + ID + ">\">" + val + "</label>" +
                    "<button className=\"removeBtn\" onclick=\"removeItemById(\"" + ID + "\")\">&#10006;</button></li>"
        }
        console.log(htmlText)
        list.innerHTML = htmlText;
        /* pattern
        <li><input type="checkbox" id="<ID>>" name="<ID>>"/>&nbsp;
                <label htmlFor="<ID>>">To feed a potato</label>
                <button className="removeBtn" onclick="removeItemById(<ID>)>&#10006;</button></li> */
}