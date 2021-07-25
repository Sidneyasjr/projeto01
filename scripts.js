const Storage = {
	get() {
		return (
			JSON.parse(localStorage.getItem("dev.inhouse:todolist")) || []
		);
	},

	set(tasks) {
		localStorage.setItem(
			"dev.inhouse:todolist",
			JSON.stringify(tasks)
		);
	},
};

const Task = {
	all: Storage.get(),

	findId(id) {
		var found;
		Task.all.forEach(item => {
			if (item.id == id) {
				 found = item
			}
		});
		return found
	},

	add(task) {
		Task.all.push(task);
		App.reload()
	},

	checked(id) {
		if (Task.findId(id).checked == 0) {
			Task.findId(id).checked = 1
			App.reload()
		} else {
			Task.findId(id).checked = 0
			App.reload()
		}
	},

	remove(id) {
		var index = Task.all.indexOf(Task.findId(id))
		var r = confirm("Deseja Excluir o item da Lista?")
		if (r == true) {
			Task.all.splice(index, 1);
			App.reload()
		}
	}

}


const DOM = {
	tasksContainer: document.querySelector('#list'),

	addtask(task) {
		const li = document.createElement('li')
		li.classList.add("list-group-item")
		li.innerHTML = DOM.innerHTMLItems(task)

		DOM.tasksContainer.appendChild(li)
	},



	innerHTMLItems(task) {
		const CSSclass = task.checked == "0" ? "" : "checked"
		const ATTRchecked = task.checked == "0" ? "" : "checked"
		const html = `<input type="checkbox" ${ATTRchecked} onclick="Task.checked(${task.id})" value="${task.checked}">
                    	<span class="${CSSclass}">${task.description}</span>
						<i onclick="Task.remove(${task.id})" class="btn btn-sm text-danger bi bi-trash float-right"></i>`
		return html
	},


	clearTasks() {
		DOM.tasksContainer.innerHTML = ""
	}
}


const Form = {
	id: 0,
	description: document.querySelector("input#description"),
	checked: "0",


	getValues() {
		return {
			id: Form.id += 0.5,
			description: Form.description.value,
			checked: Form.checked,
		};
	},


	validateFields() {
		const { description } = Form.getValues();
		if (description.trim() === "") {
			throw new Error("Por favor digite uma tarefa");
		}
	},

	clearFields() {
		Form.description.value = ""
	},

	submit(event) {
		event.preventDefault()
		try {
			Form.validateFields()
			const task = Form.getValues()
			Task.add(task)
			Form.clearFields()
			App.reload()
		} catch (error) {
			alert(error.message)
		}
	}
}


Storage.get();

const App = {
	init() {
		Task.all.forEach(DOM.addtask)
		Storage.set(Task.all)
	},
	reload() {
		DOM.clearTasks()
		App.init()
	},
}

App.init()