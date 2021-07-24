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

	add(task) {
		Task.all.push(task);
		App.reload()
	},

	// checked(index) {

	// },

	remove(index) {
		Task.all.splice(index, 1);
		App.reload()
	}

}



const DOM = {
	tasksContainer: document.querySelector('#lista'),

	addtask(task, index) {
		const li = document.createElement('li')
		li.classList.add("list-group-item")
		li.innerHTML = DOM.innerHTMLItems(task)

		DOM.tasksContainer.appendChild(li)
	},
	innerHTMLItems(task, index) {
		console.log(index)
		const CSSclass = task.checked == "0" ? "" : "checked"
		const html = `<input type="checkbox" value="${task.checked}">
                    	<span class="${CSSclass}">${task.description}</span>
						<i onclick="Task.remove(${index})" class="btn btn-sm text-danger bi bi-trash float-right"></i>`
		return html
	},

	clearTasks() {
		DOM.tasksContainer.innerHTML = ""
	}
}


const Form = {
	description: document.querySelector("input#description"),
	checked: "0",
	getValues() {
		return {
			description: Form.description.value,
			checked: Form.checked,
		};
	},

	validateFields() {
		const { description } = Form.getValues();
		if (description.trim() === "") {
			throw new Error("Por favor digite um item");
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